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

function simpleThrow(firstThrow) {
  return {
    score: function () {
      return Number(firstThrow);
    },
  };
}

function strike(rolls, currentIndex) {
  let result = 10;

  return {
    score: function () {
      return result;
    },
    rollModifier: function () {
      if (this.next) {
        result = addTo(this.next.score(), result);
        if (this.next.next) {
          result = addTo(this.next.next.score(), result);
        }
      }
      return this;
    }
  };
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
  for (let i=0; i<rollsRepresentation.length;) {
    const [roll, increment] = aNewRoll(rollsRepresentation, rollsRepresentation[i], i);
    if (roll) {
      rolls.push(roll);
    }
    i += increment;
  }

  for(let i=0; i<rolls.length-1; i++) {
    rolls[i].next = rolls[i+1];
  }
  rolls[rolls.length -1].next = undefined;

  return rolls;
}

function aNewRoll(rolls, char, currentIndex) {
  let currentThrow = undefined;
  let increment = 1;
  if (isNaN(Number(char))) {
    if (char === '/') {
      currentThrow = spare(rolls, currentIndex);
    } else if (char === 'X') {
      currentThrow = strike(rolls, currentIndex);
      increment=2;
    }
  } else {
    currentThrow = simpleThrow(char);
  }
  return [currentThrow, increment];
}

function addTo(roll, accumulated) {
  return roll + accumulated;
}
