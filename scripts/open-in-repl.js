/* global jQuery */

(function ($) {
    'use strict';

    var jsPresets = [ "es2015", "stage-0", "react" ];
    var envOptions = ['useBuiltIns', 'modules', 'include', 'exclude'];

    var serialize = function (key, value) {
      return "&" + key + "=" + encodeURIComponent(value);
    };

    var searchElementsWithPresets = function (selector) {
      return $(selector).filter(function(i, el) {
        var $el = $(el);
        var jsonContent = $el.find('code').text();
        return jsonContent.indexOf('presets') >= 0;
      });
    };

    var normalizePresets = function (presets) {
      if (!presets) return {};

      return presets.reduce(function(normalized, preset) {
        var name = preset;
        var options = {};

        if (Array.isArray(name)) {
          name = preset[0];
          options = preset[1];
        }

        if (name === 'env') {
          normalized.presets.push(name);
          var targets = options.targets;
          if (targets) {
            for (var key in targets) {
              if (targets.hasOwnProperty(key) && key !== 'browsers') {
                normalized.targets.push(key + '-' + targets[key]);
              }
            }
            for (key in options) {
              if (envOptions.includes(key)) {
                normalized[key] = options[key];
              }
            }
            targets.browsers && normalized.browsers.push(targets.browsers);
          }
        } else {
          normalized.presets.push(name);
        }
        return normalized;
      }, {presets: [], browsers: [], targets: []});
    };

    var jsonToConfig = function(code) {
      var parsed = JSON.parse(code.trim());
      var presets = parsed.presets;
      if (!presets) {
        var env = parsed.env;
        if (env) {
          if (env.development) {
            presets = env.development.presets;
          } else if (env.development) {
            presets = env.production.presets;
          }
        } else {
          presets = [];
        }
      }
      var normalized = normalizePresets(presets);
      return normalized;
    };

    var jsSelector = '.language-js,.language-javascript';
    var jsonSelector = '.language-json';
    // var jsonSelector = '.language-json';
    var clipboardIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" width="12" viewBox="0 0 64 64"><path fill="currentColor" d="M32 64C14.4 64 0 49.6 0 32S14.4 0 32 0s32 14.4 32 32-14.4 32-32 32zm0-58.7C17.3 5.3 5.3 17.3 5.3 32s12 26.7 26.7 26.7 26.7-12 26.7-26.7S46.7 5.3 32 5.3z"/><path fill="currentColor" d="M42.1 31.1l-15.9-9.4c-1.2-.7-2.1-.2-2.1 1.2v18.3c0 1.4 1 1.9 2.1 1.2L42.1 33s.6-.4.6-.9c0-.6-.6-1-.6-1z"/></svg>';

    var button = $(
      '<button class="hidden-xs btn btn-link btn-icon btn-open-in-repl" aria-label="Try in REPL">'
      + '<div class="btn-icon__body">'
      + clipboardIcon
      + '<strong class="btn-icon__label small">Try</strong>'
      + '</div>'
      + '</button>'
    );
    // var jsonButton = jsButton.clone();


    button.on('click', function() {
      var code, options;
      var $block = $(this).parent();
      var isJSON = $block.hasClass('language-json');
      var codeText = $block.find('code').text();

      if (isJSON) {
        var parsed = jsonToConfig(codeText);
        parsed.presets = parsed.presets.join(',');
        options = parsed;
        code = '';
      } else {
        options = { presets: jsPresets.join() };
        code = codeText;
      }

      var url = '/repl/#'
              + '?babili=false'
              + '&evaluate=false'
              + "&lineWrap=true"

      for (var key in options) {
        url += serialize(key, options[key]);
      }

      url += "&code=" + encodeURIComponent(code);

      window.open(url);
    });

    var $elementsWithPresets = searchElementsWithPresets(jsonSelector);
    $(jsSelector).prepend(button);
    $elementsWithPresets.prepend(button);
})(jQuery);

