'use strict';

(function () {
  var filtersContainer = window.data.map.querySelector('.map__filters-container');

  var priceOfRoomType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomType = window.form.blank.elements.type;
  var roomTimeIn = window.form.blank.elements.timein;
  var roomTimeOut = window.form.blank.elements.timeout;
  var offers;

  function onCardCloseClick() {
    window.data.map.querySelector('.popup').remove();
  }

  function onCardClosePress(evt) {
    var evtKeycode = evt.code;

    if (evtKeycode === window.util.ENTER_KEYCODE) {
      window.data.map.querySelector('.popup').remove();
    }
  }

  function onWindowEscPress(evt) {
    var evtKeycode = evt.keyCode;
    if (evtKeycode === window.util.ESC_KEYCODE) {
      window.data.map.querySelector('.popup').remove();
      document.removeEventListener('keydown', onWindowEscPress);
    }
  }

  function openCard(pinId) {
    var pinIdNumber = parseInt(pinId, 10);
    var card = window.card.generate(offers[pinIdNumber]);

    window.data.map.insertBefore(card, filtersContainer);
    card.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
    card.querySelector('.popup__close').addEventListener('keydown', onCardClosePress);
    document.addEventListener('keydown', onWindowEscPress);
  }

  function removeCard() {
    var openedCard = window.data.map.querySelector('.popup');

    if (openedCard) {
      openedCard.remove();
    }
  }

  function openCards(evt) {
    var pinId = evt.target.dataset.id;
    var parentId = evt.target.parentElement.dataset.id;

    if (pinId) {
      removeCard();
      openCard(pinId);
    } else if (parentId) {
      removeCard();
      openCard(parentId);
    }
  }

  function onPinClick(evt) {
    openCards(evt);
  }

  function onPinPress(evt) {
    var evtKeycode = evt.code;

    if (evtKeycode === window.util.ENTER_KEYCODE) {
      openCards(evt);
    }
  }

  function onTypeChange() {
    var roomPrice = window.form.blank.elements.price;

    switch (roomType.value) {
      case 'bungalo':
        roomPrice.setAttribute('min', priceOfRoomType.bungalo);
        break;
      case 'flat':
        roomPrice.setAttribute('min', priceOfRoomType.flat);
        break;
      case 'house':
        roomPrice.setAttribute('min', priceOfRoomType.house);
        break;
      case 'palace':
        roomPrice.setAttribute('min', priceOfRoomType.palace);
        break;

      default:
        break;
    }
  }

  function onTimeInChange() {
    var timeinValue = roomTimeIn.value;
    var timeoutValue = roomTimeOut.value;

    if (timeinValue !== timeoutValue) {
      roomTimeOut.value = timeinValue;
    }
  }

  function onTimeOutChange() {
    var timeinValue = roomTimeIn.value;
    var timeoutValue = roomTimeOut.value;

    if (timeoutValue !== timeinValue) {
      roomTimeIn.value = timeoutValue;
    }
  }

  var loadPins = function (offersData) {
    offers = offersData;
    window.data.map.querySelector('.map__pins').addEventListener('click', onPinClick);
    window.data.map.querySelector('.map__pins').addEventListener('keydown', onPinPress);
  };

  roomType.addEventListener('change', onTypeChange);
  roomTimeIn.addEventListener('change', onTimeInChange);
  roomTimeOut.addEventListener('change', onTimeOutChange);

  window.map = {
    loadPins: loadPins
  };
})();
