'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var createSequenceArray = function (min, max) {
    var arr = [];

    for (var i = min; i <= max; i++) {
      arr.push(i);
    }

    return arr;
  };

  var createNoRepeatNumbers = function (min, max) {
    var arr = createSequenceArray(min, max);
    var j = 0;
    var temp = 0;

    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }

    return arr;
  };

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
    createSequenceArray: createSequenceArray,
    createNoRepeatNumbers: createNoRepeatNumbers
  };
})();
