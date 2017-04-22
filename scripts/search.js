/* global jQuery */

(function ($) {
    'use strict';
    var $selector = '#babel-search-input';
    var $searchInput = $($selector);

    // config is https://github.com/algolia/docsearch-configs/blob/master/configs/babeljs.json
    var _0xac38 = ["\x64\x34\x32\x39\x30\x36\x62\x30\x34\x33\x63\x35\x34\x32\x32\x65\x61\x30\x37\x62\x34\x34\x66\x64\x34\x39\x63\x34\x30\x61\x30\x64", "\x62\x61\x62\x65\x6C\x6A\x73"];
    var $search = docsearch({
      apiKey: _0xac38[0],
      indexName: _0xac38[1],
      inputSelector: $selector,
      debug: false
    });
    // Init autocomplete
    $(function () {
        // Toggle and focus the search bar when clicking on the magnifying glass on
        // small devices. This is achieved through a label and corresponding
        // checkbox.
        // This could have been done in complete HTML except that it does not work
        // on iOS (focus can only be triggered from user interaction), so we need to
        // replicate the behavior using javascript.
        var $toggleCheckbox = $('#babel-toggle-search');
        var $toggleLabels = $('.babel-toggle-search-open');
        $toggleLabels.on('click', function (e) {
            e.preventDefault();
            $toggleCheckbox.click();
            $searchInput.focus();
        });

        // Hide the search when pressing Escape
        $(document).on('keydown', function(event) {
            if (event.keyCode !== 27) {
                return;
            }
            $toggleCheckbox.prop('checked', false);
        });

    });
})(jQuery);
