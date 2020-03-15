'use strict';

(function () {
  var PIN_TIP_HEIGHT = 16;
  var roomsMessages = {
    '1': 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя',
    '2': 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей',
    '3': 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей; для 3 гостей',
    '100': 'Для указанного количества комнат можно выбрать количество мест: не для гостей'
  };

  var mainPin = document.querySelector('.map__pin--main');
  var blank = document.querySelector('.ad-form');
  var roomsSelect = blank.elements.rooms;
  var capacitySelect = blank.elements.capacity;
  var mainFormFieldsets = blank.querySelectorAll('fieldset');
  var filterFormElements = document.querySelectorAll('.map__filters > select');
  var filterFieldset = document.querySelector('.map__filters > fieldset');

  var mainPinX;
  var mainPinY;
  var offersData;

  function setDisabled(someNode) {
    someNode.setAttribute('disabled', true);
  }

  function setDisabledAll(collection) {
    collection.forEach(function (el) {
      setDisabled(el);
    });
  }

  function offDisabled(someNode) {
    someNode.disabled = false;
  }

  function offDisabledAll(collection) {
    collection.forEach(function (el) {
      offDisabled(el);
    });
  }

  setDisabledAll(mainFormFieldsets);
  setDisabledAll(filterFormElements);
  setDisabled(filterFieldset);

  function getActive() {
    window.data.map.classList.remove('map--faded');
    blank.classList.remove('ad-form--disabled');
    offDisabledAll(mainFormFieldsets);
    offDisabledAll(filterFormElements);
    offDisabled(filterFieldset);
    window.load(function (offers) {
      offersData = offers;
      window.data.map.querySelector('.map__pins').appendChild(window.pin.generatePins(offersData));
      window.map.loadPins(offersData);
    });
    setAddress();
  }

  function onActiveClick(evt) {
    if (!evt.button) {
      getActive();
    }
  }

  function onActivePress(evt) {
    if (evt.code === window.util.ENTER_KEYCODE) {
      getActive();
    }
  }

  function getMainPinCoordinates() {
    var mainPinCoords = mainPin.getBoundingClientRect();
    mainPinX = mainPinCoords.x + pageXOffset;
    mainPinY = mainPinCoords.y + pageYOffset;
  }

  function setAddress() {
    getMainPinCoordinates();

    var MAIN_PIN_WIDTH = mainPin.querySelector('img').offsetWidth;
    var MAIN_PIN_HEIGHT = mainPin.querySelector('img').offsetHeight;

    var mainPinXCenter = MAIN_PIN_WIDTH / 2;
    var mainPinYCenter = MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT;
    var ADDRESS_X = mainPinX + mainPinXCenter;
    var ADDRESS_Y = mainPinY + mainPinYCenter;

    blank.elements.address.value = ADDRESS_X + ', ' + ADDRESS_Y;
  }

  function compareRoomsWithGuests() {
    var msg = '';
    var roomsNumber = parseInt(roomsSelect.value, 10);
    var guestsNumber = parseInt(capacitySelect.value, 10);

    switch (roomsNumber) {
      case 1:
        if (guestsNumber !== 1) {
          msg = roomsMessages['1'];
        }
        break;
      case 2:
        if (guestsNumber !== 1 && guestsNumber !== 2) {
          msg = roomsMessages['2'];
        }
        break;
      case 3:
        if (guestsNumber !== 1 && guestsNumber !== 2 && guestsNumber !== 3) {
          msg = roomsMessages['3'];
        }
        break;
      case 100:
        if (guestsNumber !== 0) {
          msg = roomsMessages['100'];
        }
        break;
    }

    capacitySelect.setCustomValidity(msg);
  }

  function onSelectChange() {
    compareRoomsWithGuests();
  }

  mainPin.addEventListener('mousedown', onActiveClick);
  mainPin.addEventListener('keydown', onActivePress);
  roomsSelect.addEventListener('change', onSelectChange);
  capacitySelect.addEventListener('change', onSelectChange);
  setAddress();

  window.form = {
    blank: blank,
    offersData: offersData
  };
})();
