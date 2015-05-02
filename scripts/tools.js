(function () {
  var $currentItem;
  var $currentNav;
  var $steps = $(".step");

  function reset() {
    if ($currentItem) $currentItem.hide();
    if ($currentNav) $currentNav.removeClass("active");
    $currentItem = $currentNav = null;
    $steps.removeAttr("style");
  }

  $(".btn-group .btn").click(function () {
    if ($currentNav && $currentNav[0] === this) {
      return reset();
    } else {
      reset();
    }

    $currentNav = $(this);
    $currentNav.addClass("active");

    var name = $currentNav.attr("data-name");
    location.hash = name;

    $currentItem = $("[data-name=" + name + "]:not(.btn)").show();
    $steps.show();
  });

  if (location.hash && location.hash !== "#") {
    $(".btn[data-name=" + location.hash.slice(1) + "]").click();
  }
})();
