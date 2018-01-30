(function () {
  var $currentItem;
  var $currentNav;
  var $steps = $(".step");
  var $stepHidden = $(".step-hidden");

  function reset() {
    if ($currentItem) $currentItem.hide();
    if ($currentNav) $currentNav.removeClass("active");
    $currentItem = $currentNav = null;
    $steps.removeAttr("style");
    $stepHidden.removeAttr("style");
  }

  $(".tools-group .tools-button").click(function () {
    if ($currentNav && $currentNav[0] === this) {
      return reset();
    } else {
      reset();
    }

    $currentNav = $(this);
    $currentNav.addClass("active");

    var name = $currentNav.attr("data-title");
    location.hash = name;

    $currentItem = $("[data-title=" + name + "]:not(.tools-button)").show();
    console.log($currentItem);
    $steps.show();
    $stepHidden.show();
  });

  if (location.hash && location.hash !== "#") {
    $(".tools-button[data-title=" + location.hash.slice(1) + "]").click();
  }
})();
