'use strict';

(function () {
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
  var pinImg = pinTemplate.querySelector('img');
  var halfPinImgWidth = pinImg.getAttribute('width') / 2;
  var offersArray;

  function generateAvatar(n) {
    var avatars = [];
    var randomNumbers = window.util.createNoRepeatNumbers(1, n);

    for (var i = 0; i < randomNumbers.length; i++) {
      avatars.push('img/avatars/user0' + randomNumbers[i] + '.png');
    }

    return avatars;
  }

  function generateFeatures(n, objKey) {
    var arr = [];
    var random = window.util.createNoRepeatNumbers(0, n);

    for (var i = 0; i < n; i++) {

      arr.push(OFFERS_DATA[objKey][random[i]]);
    }

    return arr;
  }

  function generateAddress(multiplier, addressX, addressY) {
    return window.util.getRandom(1, multiplier) * addressX + ', ' + window.util.getRandom(1, multiplier) * addressY;
  }

  function generatePrice(multiplier, priceMin) {
    return window.util.getRandom(1, multiplier) * priceMin;
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
        'type': OFFERS_DATA.types[window.util.getRandom(0, OFFERS_DATA.types.length)],
        'rooms': window.util.getRandom(1, ROOMS_MAX),
        'guests': window.util.getRandom(1, GUESTS_MAX),
        'checkin': OFFERS_DATA.time[window.util.getRandom(0, OFFERS_DATA.time.length)],
        'checkout': OFFERS_DATA.time[window.util.getRandom(0, OFFERS_DATA.time.length)],
        'features': generateFeatures(window.util.getRandom(1, FEATURES_MAX), 'features'),
        'description': OFFERS_DATA.descriptions[i],
        'photos': generateFeatures(window.util.getRandom(1, PHOTOS_MAX), 'photos')
      },
      'location': {
        x: window.util.getRandom(halfPinImgWidth, map.offsetWidth - halfPinImgWidth),
        y: window.util.getRandom(Y_MIN, Y_MAX)
      }
    };

    return obj;
  }

  function generateOffers(n) {
    var arr = [];
    var avatars = generateAvatar(n);
    var randomNumbers = window.util.createNoRepeatNumbers(1, n);

    for (var i = 0; i < n; i++) {
      arr.push(generateOffer(avatars[i], randomNumbers[i]));
    }

    return arr;
  }

  offersArray = generateOffers(OFFERS_NUMBER);

  window.data = {
    map: map,
    pinTemplate: pinTemplate,
    halfPinImgWidth: halfPinImgWidth,
    offersArray: offersArray
  };
})();
