'use strict';

(function () {
  function generatePin(data, n) {
    var offerElement = window.data.pinTemplate.cloneNode(true);
    var offerElementImg = offerElement.querySelector('img');

    offerElement.setAttribute('data-id', n);
    offerElement.style = 'left: ' + (data.location.x - window.data.halfPinImgWidth) + 'px; top: ' + (data.location.y - offerElementImg.getAttribute('height')) + 'px;';
    offerElementImg.src = data.author.avatar;
    offerElementImg.alt = data.offer.title;

    return offerElement;
  }

  function fillFragment(fragment, arr) {
    for (var i = 0; i < 5; i++) {
      fragment.appendChild(generatePin(arr[i], i));
    }
  }

  var generatePins = function (data) {
    var fragment = document.createDocumentFragment();

    fillFragment(fragment, data);

    return fragment;
  };

  window.pin = {
    generatePins: generatePins
  };
})();
