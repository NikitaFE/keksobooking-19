'use strict';

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var OFFERS = 8;
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
var PHOTOS_MAX = 10;
var Y_MAX = 630;
var Y_MIN = 130;
var OFFERS_ARRAY = generateOffers(OFFERS);
var PINS = generatePins(OFFERS_ARRAY);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createSequenceArray(min, max) {
  var arr = [];
  var temp = min - 1;

  while (arr.length < max - temp) {
    arr.push(min);
    min++;
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

  for (var i = 0; i < n; i++) {

    arr.push(OFFERS_DATA[objKey][getRandom(0, OFFERS_DATA[objKey].length)]);
  }

  return arr;
}

function generateOffer(avatar, i) {
  var obj = {
    'author': {
      avatar: avatar
    },
    'offer': {
      'title': OFFERS_DATA.titles[i],
      'address': getRandom(1, MULTIPLIER) * ADDRESS_X_MIN + ', ' + getRandom(1, MULTIPLIER) * ADDRESS_Y_MIN,
      'price': getRandom(1, MULTIPLIER) * PRICE_MIN,
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
      x: getRandom(0, map.offsetWidth),
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

  return arr;
}

function generatePin(data) {
  var offerElement = pinTemplate.cloneNode(true);
  var pinImg = offerElement.querySelector('img');

  //  забыл про корректировку метки, исправил
  offerElement.style = 'left: ' + (data.location.x - pinImg.getAttribute('width') / 2) + 'px; top: ' + (data.location.y - pinImg.getAttribute('height')) + 'px;';
  pinImg.src = data.author.avatar;
  pinImg.alt = data.offer.title;

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

  return fragment;
}

map.classList.remove('map--faded');
map.querySelector('.map__pins').appendChild(PINS);
