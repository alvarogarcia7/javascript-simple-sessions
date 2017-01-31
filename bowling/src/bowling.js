'use strict';

module.exports = {
  score
};

function score(rolls) {
  return toRolls(rolls).reduce((acc, currentRoll) => {
    if(currentRoll['rollModifier']) {
      return addTo(currentRoll.rollModifier().score(), acc);
    } else {
      return addTo(currentRoll.score(), acc);
    }
  }, 0);
}

function simpleThrow(firstThrow, secondThrow) {
  return {
    score: function () {
      return Number(firstThrow) + Number(secondThrow);
    },
    rollModifier: function () {
      return this;
    }
  };
}

function strike(rolls, currentIndex) {
  let result = 10;
  if (areThere1MoreRollsAfterStrike()) {
    const nextRoll = rolls[currentIndex + 2];
    result = addTo(Number(nextRoll), result);
  }
  if (areThere2MoreRollsAfterStrike()) {
    const currentRoll = rolls[currentIndex + 3];
    if (!isNaN(currentRoll)) {
      result = addTo(Number(currentRoll), result);
    }
  }

  return {
    score: function () {
      return result;
    },
    rollModifier: function () {
      if (this.next) {
        result = addTo(this.next.score(), result);
      }
      return this;
    }
  };

  function areThere1MoreRollsAfterStrike() {
    return (currentIndex + 2) < rolls.length;
  }

  function areThere2MoreRollsAfterStrike() {
    return (currentIndex + 3) < rolls.length;
  }
}

function spare(rolls, currentIndex) {
  const previousRoll = rolls[currentIndex - 1];
  let result = 10 - Number(previousRoll);
  if (areThereMoreRolls()) {
    const nextRoll = rolls[currentIndex + 1];
    result = addTo(Number(nextRoll), result);
  }

  return {
    score: function () {
      return result;
    }
  };

  function areThereMoreRolls() {
    return currentIndex < (rolls.length -1);
  }
}

function toRolls(rollsRepresentation) {
  const rolls = [];
  let previousThrow = undefined;
  for (let i=0; i<rollsRepresentation.length;) {
    const [throww, increment] = aNewThrow(rollsRepresentation, rollsRepresentation[i], i);
    if (throww) {
      if(!previousThrow){
        previousThrow = throww;
      } else {
        rolls.push(roll(previousThrow, throww));
        previousThrow = undefined;
      }
    }
    i += increment;
  }

  for(let i=0; i<rolls.length-1; i++) {
    rolls[i].next = rolls[i+1];
  }

  return rolls;
}

function roll(firstThrow, secondThrow) {
  return {
    score: function() {
      addTo(firstThrow.score(), secondThrow.score());
    }
  }
}

function aNewThrow(rolls, char, currentIndex) {
  let currentThrow = undefined;
  let increment = 1;
  if (isNaN(Number(char))) {
    if (char === '/') {
      currentThrow = spare(rolls, currentIndex);
    } else if (char === 'X') {
      currentThrow = strike(rolls, currentIndex);
    }
  } else {
    currentThrow = simpleThrow(char);
  }
  return [currentThrow, increment];
}

function addTo(roll, accumulated) {
  return roll + accumulated;
}
