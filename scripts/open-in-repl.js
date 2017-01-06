/* global jQuery */

(function ($) {
    'use strict';

    var presets = [ "es2015", "stage-0", "react" ];

    var selector = '.language-js,.language-javascript';
    var clipboardIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" width="12" viewBox="0 0 64 64"><path fill="currentColor" d="M32 64C14.4 64 0 49.6 0 32S14.4 0 32 0s32 14.4 32 32-14.4 32-32 32zm0-58.7C17.3 5.3 5.3 17.3 5.3 32s12 26.7 26.7 26.7 26.7-12 26.7-26.7S46.7 5.3 32 5.3z"/><path fill="currentColor" d="M42.1 31.1l-15.9-9.4c-1.2-.7-2.1-.2-2.1 1.2v18.3c0 1.4 1 1.9 2.1 1.2L42.1 33s.6-.4.6-.9c0-.6-.6-1-.6-1z"/></svg>';

    var button = $(
      '<button class="hidden-xs btn btn-link btn-icon btn-open-in-repl" aria-label="Try in REPL">'
      + '<div class="btn-icon__body">'
      + clipboardIcon
      + '<strong class="btn-icon__label small">Try</strong>'
      + '</div>'
      + '</button>'
    );

    button.on('click', function() {
      var $code = $(this).parent().find('code');

      var url = '/repl/#'
              + '?babili=false'
              + '&evaluate=false'
              + "&lineWrap=true"
              + "&presets=" + encodeURIComponent(presets.join(','))
              + "&code=" + encodeURIComponent($code.text());

      window.open(url);
    });

    $(selector).prepend(button);
})(jQuery);

