'use strict';

module.exports = {
  usingNewline,
  notUsingNewline
};

function usingNewline() {
  return
  {
    age: 1
  };
}

function notUsingNewline() {
  return {
    age: 1
  };
}