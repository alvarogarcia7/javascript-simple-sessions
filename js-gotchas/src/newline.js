'use strict';

module.exports = {
  usingNewline,
  notUsingNewline
};

/*eslint-disable */
function usingNewline() {
  return
  {
    age: 1
  };
}
/*eslint-enable */

function notUsingNewline() {
  return {
    age: 1
  };
}