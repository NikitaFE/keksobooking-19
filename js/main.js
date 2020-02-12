'use strict';

var OFFERS_NUMBER = 8;
var OFFERS_DATA = {
  titles: ['Hostel Podolski Parus', 'On Lev Tolstoy Square', 'Отель Верховина', 'Хостел LEON Киев', 'low kick', 'irisHotels', 'Mini Hotel near Arena City', 'Fire Inn', 'Роял Сити Отель', 'SMART HOUSE hotel'],
  types: ['palace', 'flat', 'house', 'bungalo'],
  time: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  descriptions: [
    'Хостел Podolski Parus расположен в Подольском районе Киева, в 2,5 км от Андреевского спуска, в 3,5 км от Михайловского Златоверхого монастыря и в 4,2 км от Владимирского собора.',
    'Апартаменты «На площади Льва Толстого» расположены в Киеве, в 800 м от парка Шевченко и в 1,2 км от спортивного комплекса «Олимпийский». К услугам гостей кондиционер, балкон и бесплатный Wi-Fi.',
    'Отель расположен в Киеве, в 7 минутах езды от станции метро «Житомирская». К услугам гостей ресторан с террасой, бесплатный Wi-Fi, а также номера с кондиционером и телевизором с плоским экраном.',
    'Хостел «ЛЕОН Киев» расположен в Шевченковском районе Киева. К услугам гостей номера с кондиционером и спутниковым телевидением.',
    'Эти апартаменты с видом на реку расположены в Киеве, в 2,3 км от Международного выставочного центра и в 6 км от монумента «Родина-мать зовет!». К услугам гостей бесплатный Wi-Fi.',
    'Этот отель находится в 3 минутах ходьбы от станции метро «Вокзальная» и железнодорожного вокзала Киева. К услугам гостей бесплатный Wi-Fi и круглосуточная стойка регистрации.',
    'Мини-отель «У Ледового Сити» расположен в Киеве, в 350 м от Бессарабского рынка. До станций метро "Дворец спорта" и "Площадь Льва Толстого" можно дойти за 10 минут. Все номера оснащены телевизором.',
    'Комплекс Fire Inn расположен в Киеве, в 500 метрах от станции метро «Университет». Все номера оснащены телевизором и кондиционером.',
    'В отеле Royal City к услугам гостей элегантные номера с ЖК-телевизором и бесплатным Wi-Fi. Отель расположен в самом центре Киева, неподалеку от площади Победы.',
    'Отель SMART HOUSE расположен в Киеве, в 7 км от Государственного музея авиации и в 7 км от монастыря Святого Кирилла. К услугам гостей номера с кондиционером, видом на город и бесплатным Wi-Fi.'
  ],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};
var MULTIPLIER = 12;
var ADDRESS_X_MIN = 30;
var ADDRESS_Y_MIN = 15;
var PRICE_MIN = 50;
var ROOMS_MAX = 4;
var GUESTS_MAX = 8;
var FEATURES_MAX = 5;
var PHOTOS_MAX = 3;
var Y_MAX = 630;
var Y_MIN = 130;

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var pinImg = pinTemplate.querySelector('img');
var filtersContainer = map.querySelector('.map__filters-container');
var halfPinImgWidth = pinImg.getAttribute('width') / 2;

var offersArray;
var pins;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createSequenceArray(min, max) {
  var arr = [];

  for (var i = min; i <= max; i++) {
    arr.push(i);
  }

  return arr;
}

function createNoRepeatNumbers(min, max) {
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
}

function generateAvatar(n) {
  var avatars = [];
  var randomNumbers = createNoRepeatNumbers(1, n);

  for (var i = 0; i < randomNumbers.length; i++) {
    avatars.push('img/avatars/user0' + randomNumbers[i] + '.png');
  }

  return avatars;
}

function generateFeatures(n, objKey) {
  var arr = [];
  var random = createNoRepeatNumbers(0, n);

  for (var i = 0; i < n; i++) {

    arr.push(OFFERS_DATA[objKey][random[i]]);
  }

  return arr;
}

function generateAddress(multiplier, addressX, addressY) {
  return getRandom(1, multiplier) * addressX + ', ' + getRandom(1, multiplier) * addressY;
}

function generatePrice(multiplier, priceMin) {
  return getRandom(1, multiplier) * priceMin;
}

function generateOffer(avatar, i) {
  var obj = {
    'author': {
      avatar: avatar
    },
    'offer': {
      'title': OFFERS_DATA.titles[i],
      'address': generateAddress(MULTIPLIER, ADDRESS_X_MIN, ADDRESS_Y_MIN),
      'price': generatePrice(MULTIPLIER, PRICE_MIN),
      'type': OFFERS_DATA.types[getRandom(0, OFFERS_DATA.types.length)],
      'rooms': getRandom(1, ROOMS_MAX),
      'guests': getRandom(1, GUESTS_MAX),
      'checkin': OFFERS_DATA.time[getRandom(0, OFFERS_DATA.time.length)],
      'checkout': OFFERS_DATA.time[getRandom(0, OFFERS_DATA.time.length)],
      'features': generateFeatures(getRandom(1, FEATURES_MAX), 'features'),
      'description': OFFERS_DATA.descriptions[i],
      'photos': generateFeatures(getRandom(1, PHOTOS_MAX), 'photos')
    },
    'location': {
      x: getRandom(halfPinImgWidth, map.offsetWidth - halfPinImgWidth), //  Корректировка меток, чтобы изображения не выходили за край.
      y: getRandom(Y_MIN, Y_MAX)
    }
  };

  return obj;
}

function generateOffers(n) {
  var arr = [];
  var avatars = generateAvatar(n);
  var randomNumbers = createNoRepeatNumbers(1, n);

  for (var i = 0; i < n; i++) {
    arr.push(generateOffer(avatars[i], randomNumbers[i]));
  }

  offersArray = arr;
}

function generatePin(data) {
  var offerElement = pinTemplate.cloneNode(true);

  //  забыл про корректировку метки, исправил
  offerElement.style = 'left: ' + (data.location.x - halfPinImgWidth) + 'px; top: ' + (data.location.y - pinImg.getAttribute('height')) + 'px;';
  pinImg.src = data.author.avatar;
  pinImg.alt = data.offer.title;

  return offerElement;
}

function translateType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';

    default:
      return 'Ночлежка';
  }
}

//  Немного склонений мне в код.
function generateRoomsAndGuestsText(rooms, guests) {
  var text = '';

  if (rooms < 2) {
    text += rooms + ' комната для ';
  } else if (rooms < 5) {
    text += rooms + ' комнаты для ';
  } else {
    text += rooms + ' комнат для '; //  Если кто-то поменяет константу на большее значение.
  }

  if (guests < 2) {
    text += guests + ' гостя';
  } else {
    text += guests + ' гостей';
  }

  return text;
}

function generateTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до ' + checkout;
}

function translateFeatures(feature) {
  switch (feature) {
    case 'wifi':
      return 'Wi-Fi';
    case 'dishwasher':
      return 'Посудомойка';
    case 'parking':
      return 'Парковка';
    case 'washer':
      return 'Стиральная машина';
    case 'elevator':
      return 'Лифт';
    case 'conditioner':
      return 'Кондиционер';

    default:
      return 'Ничего';
  }
}

function generateFeatureNode(features) {
  var listElements = '';

  for (var i = 0; i < features.length; i++) {
    listElements += '<li class="popup__feature popup__feature--' + features[i] + '">' + translateFeatures(features[i]) + '</li>';
  }

  return listElements;
}

function generatePhotosNode(photos) {
  var divElements = '';

  for (var i = 0; i < photos.length; i++) {
    divElements += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }

  return divElements;
}

function generateCard(data) {
  var offerElement = cardTemplate.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = data.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = data.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = data.offer.price + 'U+20BD/ночь';
  offerElement.querySelector('.popup__type').textContent = translateType(data.offer.type);
  offerElement.querySelector('.popup__text--capacity').textContent = generateRoomsAndGuestsText(data.offer.rooms, data.offer.guests);
  offerElement.querySelector('.popup__text--time').textContent = generateTime(data.offer.checkin, data.offer.checkout);
  offerElement.querySelector('.popup__features').innerHTML = generateFeatureNode(data.offer.features);
  offerElement.querySelector('.popup__description').textContent = data.offer.description;
  offerElement.querySelector('.popup__photos').innerHTML = generatePhotosNode(data.offer.photos);
  offerElement.querySelector('.popup__avatar').src = data.author.avatar;

  return offerElement;
}

function fillFragment(fragment, arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(generatePin(arr[i]));
  }
}

function generatePins(data) {
  var fragment = document.createDocumentFragment();

  fillFragment(fragment, data);

  pins = fragment;
}

generateOffers(OFFERS_NUMBER);
generatePins(offersArray);
// map.querySelector('.map__pins').appendChild(pins);
// map.insertBefore(generateCard(offersArray[0]), filtersContainer);

/*  module4-task2  */

var ENTER_KEYCODE = 13;
var PIN_TIP_HEIGTH = 16;
var ROOMS_INFO = {
  amount: [1, 2, 3, 100],
  messages: [
    'Для указанного количества комнат можно выбрать количество мест: не для гостей',
    'Для указанного количества комнат можно выбрать количество мест: для 1 гостя',
    'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей',
    'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей; для 3 гостей'
  ]
}

var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');
var roomsSelect = mainForm.elements.rooms;
var capacitySelect = mainForm.elements.capacity;
var mainFormFieldsets = mainForm.querySelectorAll('fieldset');
var filterFormElements = document.querySelectorAll('.map__filters > select');
var filterFieldset = document.querySelector('.map__filters > fieldset');

var mainPinX;
var mainPinY;

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
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  offDisabledAll(mainFormFieldsets);
  offDisabledAll(filterFormElements);
  offDisabled(filterFieldset);
  setAddress();
}

function onActiveClick(evt) {
  if (!evt.button) {
    getActive();
  }
}

function onActivePress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
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
  var mainPinYCenter = MAIN_PIN_HEIGHT + PIN_TIP_HEIGTH;
  var ADDRESS_X = mainPinX + mainPinXCenter;
  var ADDRESS_Y = mainPinY + mainPinYCenter;

  mainForm.elements.address.value = ADDRESS_X + ', ' + ADDRESS_Y;
}

function compareRoomsWithGuests() {
  var msg = '';
  var roomsNumber = parseInt(roomsSelect.value, 10);
  var guestsNumber = parseInt(capacitySelect.value, 10);

  switch (roomsNumber) {
    case ROOMS_INFO.amount[0]:
      if (guestsNumber !== ROOMS_INFO.amount[0]) {
        msg = ROOMS_INFO.messages[1];
      }
      break;
    case ROOMS_INFO.amount[1]:
      if (guestsNumber !== ROOMS_INFO.amount[0] && guestsNumber !== ROOMS_INFO.amount[1]) {
        msg = ROOMS_INFO.messages[2];
      }
      break;
    case ROOMS_INFO.amount[2]:
      if (guestsNumber !== ROOMS_INFO.amount[0] && guestsNumber !== ROOMS_INFO.amount[1] && guestsNumber !== ROOMS_INFO.amount[2]) {
        msg = ROOMS_INFO.messages[3];
      }
      break;
    case ROOMS_INFO.amount[3]:
      if (guestsNumber !== 0) {
        msg = ROOMS_INFO.messages[0];
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

/*  module4-task2  */
