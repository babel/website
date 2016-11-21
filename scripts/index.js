$(document).ready(function() {
  $('.babel-slider').slick({
    lazyLoad: 'ondemand',
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
});

if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('/service-worker.js').then(function() {
    var offlineIndicator = $("#offline-indicator");

    window.addEventListener('online',  function() {
      offlineIndicator.addClass("hidden");
    });

    window.addEventListener('offline',  function() {
      offlineIndicator.removeClass("hidden");
    });

    if (!navigator.onLine) {
      offlineIndicator.removeClass("hidden");
    }

  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
}
