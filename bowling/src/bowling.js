'use strict';

module.exports = {
  score
};

function score(rolls) {
  return toRolls(rolls).reduce((acc, char, currentIndex) => {
    const currentRoll = Number(char);
    if (isNaN(currentRoll)) {
      if (char === '/') {
        return addTo(spare(rolls, currentIndex).score(), acc);
      } else if (char === 'X') {
        return addTo(strike(rolls, currentIndex).score(), acc);
      } else {
        return addTo(noop().score(), acc);
      }
    } else {
      return addTo(simpleRoll(currentRoll).score(), acc);
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

function simpleRoll(roll) {
  return {
    score: function () {
      return roll;
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
