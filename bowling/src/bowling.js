'use strict';

module.exports = {
  score
};

function score(rolls) {
  return rolls.split('').reduce((acc, char, currentIndex) => {
    const currentRoll = Number(char);
    if (!isNaN(currentRoll)) {
      return currentRoll + acc;
    } else {
      if (char==='/') {
        return acc + spare(rolls, currentIndex);
      }
      return acc;
    }}, 0);
}

function spare (rolls, currentIndex) {
  var result = 10 - Number(rolls[currentIndex - 1]);
  if(currentIndex < rolls.length){
    result += Number(rolls[currentIndex + 1]);
  }
  return result;
}
