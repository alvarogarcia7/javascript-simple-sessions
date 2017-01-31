'use strict';

module.exports = {
  score
};

function score(rolls) {
  return toRolls(rolls).reduce((acc, char, currentIndex) => {
    let currentRoll = noop();
    currentRoll = aNewRoll(char, currentRoll, currentIndex);
    return addTo(currentRoll.score(), acc);
  }, 0);

  function aNewRoll(char, currentRoll, currentIndex) {
    if (isNaN(Number(char))) {
      if (char === '/') {
        currentRoll = spare(rolls, currentIndex);
      } else if (char === 'X') {
        currentRoll = strike(rolls, currentIndex);
      }
    } else {
      currentRoll = simpleRoll(char);
    }
    return currentRoll;
  }
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

function toRolls(rolls) {
  return rolls.split('');
}

function addTo(roll, accumulated) {
  return roll + accumulated;
}
