'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

  function generateRoomsAndGuestsText(rooms, guests) {
    var text = '';

    if (rooms < 2) {
      text += rooms + ' комната для ';
    } else if (rooms < 5) {
      text += rooms + ' комнаты для ';
    } else {
      text += rooms + ' комнат для ';
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

  var generate = function (data) {
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
  };

  window.card = {
    generate: generate
  };
})();
