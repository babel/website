if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('/service-worker.js').then(function() {
    var offlineIndicator = $('#offline-indicator');

    window.addEventListener('online',  function() {
      offlineIndicator.addClass('hidden');
    });

    window.addEventListener('offline',  function() {
      offlineIndicator.removeClass('hidden');
    });

    if (!navigator.onLine) {
      offlineIndicator.removeClass('hidden');
    }

  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
}
