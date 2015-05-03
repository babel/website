(function () {
  var $selector = $('.babel-tools-selector');
  var $default = $selector.find('option[value=""]');
  var $window = $(window);
  var scrollTop = $window.scrollTop();
  var $prev;

  $selector.on('change', function() {
    var name = $(this).val();
    if (!name) return;

    if ($default) {
      $default.remove();
      $default = false;
    }

    scrollTop = $window.scrollTop();
    location.hash = name;
    $window.scrollTop(scrollTop);
  });

  if (location.hash && location.hash !== '#') {
    $selector.val(location.hash.slice(1)).trigger('change');
    $window.scrollTop(scrollTop);
  }
})();
