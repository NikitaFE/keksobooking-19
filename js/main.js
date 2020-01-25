'use strict';

var MAP = document.querySelector('.map');
var PIN_TEMPLATE = document.querySelector('#pin')
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



function getRandom(n) {
  return Math.floor(Math.random() * n);
}

function getRandomWithoutZero(n) {
  var random = getRandom(n);

  if(!n) {
    return 'Ошибка: количество не может быть меньше еденицы';
  }

  while (!random) {
    random = getRandom(n);
  }

  return random;
}

function generateArrayRandomNumber(min, max) {
  var totalNumbers = max - min + 1;
  var arrayTotalNumbers = [];
  var arrayRandomNumbers = [];
  var tempRandomNumber;

  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }

  while (arrayTotalNumbers.length) {
    tempRandomNumber = getRandom(arrayTotalNumbers.length - 1);
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }

  return arrayRandomNumbers;
}

function generateAvatar(n) {
  var avatars = [];
  var randomNumbers = generateArrayRandomNumber(1, n);

  for (var i = 0; i < randomNumbers.length; i++) {
    avatars.push('img/avatars/user0' + randomNumbers[i]);
  }
  return avatars;
}

function generateFeatures(n, objKey) {
  var arr = [];

  for (var i = 0; i < n; i++) {

    arr.push(OFFERS_DATA[objKey][getRandom(OFFERS_DATA[objKey].length)]);
  }

  return arr;
}

function generateOfferLocation(min, max, n) {
  var arr = [];
  var randomNumbers = generateArrayRandomNumber(min, max);

  for (var i = 0; i < n; i++) {
    arr.push(randomNumbers[i]);
  }
  return arr;
}

function generateOffer(avatar, i, x, y) {
  var obj = {
    author: {
      avatar
    },
    offer: {
      title: OFFERS_DATA.titles[i],
      address: getRandomWithoutZero(12) * 30 + ', ' + getRandomWithoutZero(12) * 15,
      price: getRandomWithoutZero(12) * 50,
      type: OFFERS_DATA.types[getRandom(OFFERS_DATA.types.length)],
      rooms: getRandomWithoutZero(4),
      guests: getRandomWithoutZero(8),
      checkin: OFFERS_DATA.time[getRandom(OFFERS_DATA.time.length)],
      checkout: OFFERS_DATA.time[getRandom(OFFERS_DATA.time.length)],
      features: generateFeatures(getRandomWithoutZero(5), 'features'),
      description: OFFERS_DATA.descriptions[i],
      photos: generateFeatures(getRandomWithoutZero(10), 'photos')
    },
    location: {
      x,
      y
    }
  }

  return obj;
}

function generateOffers(n) {
  var arr = [];
  var avatars = generateAvatar(n);
  var randomNumbers = generateArrayRandomNumber(1, n);
  var offerX = generateOfferLocation(0, MAP.offsetWidth, n);
  var offerY = generateOfferLocation(130, 630, n);

  for (var i = 0; i < n; i++) {
    arr.push(generateOffer(avatars[i], randomNumbers[i], offerX[i], offerY[i]));
  }

  return arr;
}

function showMap() {
  MAP.classList.remove('map--faded');
  generateOffers(OFFERS);
}

showMap();

console.log( generateOffers(OFFERS));
console.log(PIN_TEMPLATE);
