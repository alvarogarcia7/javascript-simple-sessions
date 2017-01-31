'use strict';

module.exports = {
  score
};

function score(rolls) {
  return toRolls(rolls).reduce((acc, currentRoll) => {
    if (currentRoll['modifier']) {
      return addTo(currentRoll.modifier().score(), acc);
    } else {
      return addTo(currentRoll.score(), acc);
    }
  }, 0);
}

function noop() {
  return {
    score: function () {
      return 0;
    }
  };
}

function simpleRoll(rollRepresentation) {
  return {
    score: function () {
      return Number(rollRepresentation);
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
  for (let i=0; i<rollsRepresentation.length;) {
    const [roll, increment] = aNewRoll(rollsRepresentation, rollsRepresentation[i], i);
    rolls.push(roll);
    i += increment;
  }

  for (let i=0; i<rolls.length-1; i++) {
    rolls[i].next = rolls[i+1];
  }
  rolls[rolls.length-1].next = undefined;

  return rolls;
}
function aNewRoll(rolls, char, currentIndex) {
  let currentRoll = noop();
  let increment = 1;
  if (isNaN(Number(char))) {
    if (char === '/') {
      currentRoll = spare(rolls, currentIndex);
    } else if (char === 'X') {
      currentRoll = strike(rolls, currentIndex);
      increment = 2;
    }
  } else {
    currentRoll = simpleRoll(char);
  }
  return [currentRoll, increment];
}

function addTo(roll, accumulated) {
  return roll + accumulated;
}
