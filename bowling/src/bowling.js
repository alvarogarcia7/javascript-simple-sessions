'use strict';

module.exports = {
  score
};

function score(rolls) {
  return rolls.split('').reduce((acc, char) => {
    const currentRoll = Number(char);
    if (!isNaN(currentRoll)) {
      return currentRoll + acc;
    } else {
      return acc;
    }}, 0);
}
