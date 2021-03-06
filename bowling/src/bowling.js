'use strict';

module.exports = {
  score
};

function score(rolls) {
  return toRolls(rolls).reduce((acc, currentRoll) => {
    return addTo(currentRoll.modifier().score(), acc);
  }, 0);
}

function simpleRoll(rollRepresentation) {
  return {
    score: function () {
      return Number(rollRepresentation);
    },
    modifier: function () {
      return this;
    }
  };
}

function strike() {
  let result = 10;
  return {
    score: function () {
      return result;
    },
    modifier: function () {
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

  return {
    score: function () {
      return result;
    },
    modifier: function () {
      if (this.next) {
        result = addTo(this.next.score(), result);
      }
      return this;
    }
  };
}

function toRolls(rollsRepresentation) {
  const rolls = readRolls();
  return rolls;

  function readRolls() {
    const rolls = [];
    for (let i = 0; i < rollsRepresentation.length;) {
      const [roll, increment] = aNewRoll(rollsRepresentation, rollsRepresentation[ i ], i);
      if (roll) {
        rolls.push(roll);
      }
      i += increment;
    }

    return linkRolls(rolls);
  }

  function linkRolls(rolls) {
    for (let i = 0; i < rolls.length - 1; i++) {
      rolls[i].next = rolls[i + 1];
    }
    rolls[rolls.length - 1].next = undefined;

    return rolls;
  }
}
function aNewRoll(rolls, char, currentIndex) {
  let currentRoll = undefined;
  const increment = 1;
  if (isNaN(Number(char))) {
    if (char === '/') {
      currentRoll = spare(rolls, currentIndex);
    } else if (char === 'X') {
      currentRoll = strike();
    }
  } else {
    currentRoll = simpleRoll(char);
  }
  return [currentRoll, increment];
}

function addTo(roll, accumulated) {
  return roll + accumulated;
}
