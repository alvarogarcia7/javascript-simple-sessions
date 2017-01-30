'use strict';

module.exports = {
  score
};

function score(rolls) {
  return rolls.split('').reduce((acc, char, currentIndex) => {
    const currentRoll = Number(char);
    if (isNaN(currentRoll)) {
      if (char === '/') {
        return acc + spare(rolls, currentIndex);
      }
      return acc;
    } else {
      return currentRoll + acc;
    }
  }, 0);
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
    return currentIndex < rolls.length;
  }
}
