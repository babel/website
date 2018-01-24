if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('/service-worker.js').then(function () {
    var offlineIndicator = $('#offline-indicator');

    function toggleOfflineIndicator() {
      if (navigator.onLine)
        offlineIndicator.addClass('hidden');
      else
        offlineIndicator.removeClass('hidden');
    }

    window.addEventListener('online', toggleOfflineIndicator);

    window.addEventListener('offline', toggleOfflineIndicator);

    toggleOfflineIndicator();

  }, function () {
    console.log('CLIENT: service worker registration failure.');
  });
}
