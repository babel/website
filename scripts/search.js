/* global jQuery */

(function ($) {
    'use strict';
    var $selector = '#babel-search-input';
    var $searchInput = $($selector);

    var $search = docsearch({
        apiKey: 'd42906b043c5422ea07b44fd49c40a0d',
        indexName: 'babeljs',
        inputSelector: $selector,
        debug: false // Set debug to true if you want to inspect the dropdown
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