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
    },
    modifier: function () {
      return this;
    }
  };
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
