$(function() {
  var $body = $('body');
  var $sidebar = $('.sidebar');

  $body.scrollspy({
    target: '.sidebar',
    offset: 50
  });

  $sidebar.affix({
    offset: {
      top: function () {
        var offsetTop = $sidebar.offset().top;
        var sidebarMargin = parseInt($sidebar.children(0).css('margin-top'), 10);
        var navbarOuterHeight = $('.navbar').height();

        return (this.top = offsetTop - navbarOuterHeight - sidebarMargin);
      },
      bottom: function () {
        return this.bottom = $('.footer').outerHeight(true);
      }
    }
  });
});
