/* global jQuery */

(function ($) {
    'use strict';
    var $selector = '#babel-search-input';
    var $searchInput = $($selector);

    var KEYBOARD_ESCAPE = 27;
    var KEYBOARD_SLASH = 47;
    var KEYBOARD_QUESTION_MARK = 63;
    var KEYBOARD_S = 115;

    // config is https://github.com/algolia/docsearch-configs/blob/master/configs/babeljs.json
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

        // Open the search when pressing / or ? or s
        // Use 'keypress' events to handle key combos
        // (e.g. en: '?' = Shift + '/')
        $(document).keypress(function(event) {
            // omit functionality if another input-element is currently in
            // focus or the input key is not in the list of accepted keys
            if ($(document.activeElement).is(':input') ||
                (event.which !== KEYBOARD_SLASH &&
                 event.which !== KEYBOARD_QUESTION_MARK &&
                 event.which !== KEYBOARD_S)) {
                    return;
            }

            // don't type '/' or '?', if the search box is closed or it's not
            // focused (i.e. to regain focus, without typing the character)
            if (!$toggleCheckbox.prop('checked') ||
                !$searchInput.is(':focus')) {
                    event.preventDefault();
            }

            $toggleCheckbox.prop('checked', true);
            $searchInput.focus();
        });

        // Hide the search when pressing Escape
        $(document).keydown(function(event) {
            if (event.which !== KEYBOARD_ESCAPE) {
                return;
            }

            // clear search input and close the search box
            $searchInput.val('');
            $toggleCheckbox.prop('checked', false);

            // blur focus on the active element
            // NOTE: this will also blur the focus of any other currently
            //       active element
            $(document.activeElement).blur();
        });
    });
})(jQuery);
