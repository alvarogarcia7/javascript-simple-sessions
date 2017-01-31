'use strict';

module.exports = {
  score
};

function score(rolls) {
  return toFrames(rolls).reduce((acc, char, currentIndex) => {
    const currentRoll = Number(char);
    if (isNaN(currentRoll)) {
      if (char === '/') {
        return acc + spare(rolls, currentIndex);
      }
      if (char === 'X') {
        return acc + strike(rolls, currentIndex);
      }
      return acc;
    } else {
      return currentRoll + acc;
    }
  }, 0);
}

function strike(rolls, currentIndex) {
  let result = 10;
  if (areThere1MoreRollsAfterStrike()) {
    const nextRoll = rolls[currentIndex + 2];
    result += Number(nextRoll);
  }
  if (areThere2MoreRollsAfterStrike()) {
    const currentRoll = rolls[currentIndex + 3];
    if (!isNaN(currentRoll)) {
      result += Number(currentRoll);
    }
  }
  return result;

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
    result += Number(nextRoll);
  }
  return result;

  function areThereMoreRolls() {
    return currentIndex < (rolls.length -1);
  }
}

function toFrames(rolls) {
  return rolls.split('');
}
