(function($, _, ace, LZString, window) {
  'use strict';
  var UPDATE_DELAY = 500;

  var presets = [
    'es2015',
    'es2016',
    'es2017',
    'react',
    'stage-0',
    'stage-1',
    'stage-2',
    'stage-3'
  ];

  /* Throw meaningful errors for getters of commonjs. */
  var enableCommonJSError = true;
  ["module", "exports", "require"].forEach(function(commonVar){
    Object.defineProperty(window, commonVar, {
      configurable: true,
      get: function () {
        if (enableCommonJSError) {
          throw new Error(commonVar + " is not supported in the browser, you need a commonjs environment such as node.js/io.js, browserify/webpack etc");
        }
      }
    });
  });

  var loadingScripts = {};

  /*
   * Utils for working with the browser's URI (e.g. the query params)
   */
  function UriUtils () {}

  UriUtils.encode = function (value) {
    return window.encodeURIComponent(value);
  };

  UriUtils.decode = function (value) {
    try {
      return window.decodeURIComponent('' + value);
    } catch (err) {
      return value;
    }
  };

  UriUtils.parseQuery = function () {
    var query = window.location.hash.replace(/^\#\?/, '');

    if (!query) {
      return null;
    }

    return query.split('&').map(function(param) {
      var splitPoint = param.indexOf('=');

      return {
        key : param.substring(0, splitPoint),
        value : param.substring(splitPoint + 1)
      };
    }).reduce(function(params, param){
      if (param.key && param.value) {
        if (param.key.slice(-3) === '_lz') {
          params[param.key.slice(0, -3)] = UriUtils.decompress(param.value);
        } else {
          params[param.key] = UriUtils.decode(param.value);
        }
      }
      return params;
    }, {});
  };

  UriUtils.compress = function(string) {
    return LZString.compressToBase64(string)
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, ''); // Remove ending '='
  };

  UriUtils.decompress = function(string) {
    var safe = string
      .replace(/\-/g, '+') // Convert '-' to '+'
      .replace(/\_/g, '/'); // Convert '_' to '/'
    return LZString.decompressFromBase64(safe);
  };

  // `code` can get very long. A basic, fast LZW compression to base64
  // saves significant bytes, especially considering the explosion in size
  // when url-encoding common code characters (like ' ' to '%20')
  var compressable = ['code'];
  UriUtils.updateQuery = function (object) {
    var query = Object.keys(object)
    .filter(function(key) {
      // Prevents compressed keys from entering twice
      return key.slice(-3) !== '_lz';
    })
    .map(function(key){
      if (compressable.indexOf(key) !== -1) {
        key += '_lz';
        return key + '=' + UriUtils.compress(object.code);
      }
      return key + '=' + UriUtils.encode(object[key]);
    }).join('&');

    window.location.hash = '?' + query;
  };

  /*
   * Long term storage for persistence of state/etc
   */
  function StorageService () {
    try {
      this.store = window.localStorage;
    } catch (e) {
      console.warn('Could not access localStorage. Disabling state persistence.');
      this.store = null;
    }
  }

  StorageService.prototype.get = function (key) {
    try {
      return JSON.parse(this.store.getItem(key));
    } catch(e) {}
  };

  StorageService.prototype.set = function (key, value) {
    try {
      this.store.setItem(key, JSON.stringify(value));
    } catch(e) {}
  };

  /*
   * Decorating the ACE editor
   */
  function Editor(selector) {
    this.$el = $(selector);
    this.editor = ace.edit(this.$el[0]);
    this.session = this.editor.getSession();
    this.document = this.session.getDocument();

    this.editor.setTheme('ace/theme/tomorrow');
    this.editor.setShowPrintMargin(false);
    this.editor.commands.removeCommands(['gotoline', 'find']);
    this.$el.css({
      fontFamily: '"Operator Mono", "Fira Code", "Ubuntu Mono", "Droid Sans Mono", "Liberation Mono", "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace',
      lineHeight: 'inherit'
    });

    this.session.setMode('ace/mode/javascript');
    this.session.setUseSoftTabs(true);
    this.session.setTabSize(2);
    this.session.setUseWorker(false);

    this.editor.setOption('scrollPastEnd', 0.33);
  }

  /*
   * Options exposed for the REPL that will influence Babel's transpiling
   */
  function $checkboxValue($element) {
    return {
      get: function () {
        return $element.is(":checked");
      },
      set: function (value) {
        var setting = value !== 'false' && value !== false;
        $element.prop('checked', setting);
      },
      enumerable: true,
      configurable: false
    };
  }

  function $inputValue($element) {
    return {
      get: function () {
        return $element.val().trim();
      },
      set: function (value) {
        var setting = value !== 'undefined' && value !== 'false' && value;
        $element.val(setting);
      },
      enumerable: true,
      configurable: false
    };
  }

  /**
   * By default, Bootstrap closes dropdown menus whenever an item in them is
   * clicked. This function overrides that behaviour for the presets dropdown,
   * and ensures the checkbox is selected correctly.
   */
  function handlePresetClick($input, evt) {
    evt.preventDefault();
    evt.stopPropagation();

    // Needs to run in a timeout to properly handle clicks directly on the
    // checkbox.
    setTimeout(function() {
      $input.checked = !$input.checked;
      onPresetChange();
    }, 0);
  }

  function prevent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  /**
   * Options for selecting presets to use.
   */
  function getPresetOptions() {
    // Create the checkboxes for all available presets
    var $presetContainer = document.getElementById('babel-repl-preset-dropdown');
    var $presets = [];
    presets.forEach(function(presetName) {
      var $input = document.createElement('input');
      $input.type = 'checkbox';
      $input.name = 'preset';
      $input.value = presetName;
      $input.id = 'option-' + presetName;

      // This should really be a <label>, but it *needs* to be an <a> to get the
      // right styling. Thanks Bootstrap.
      var $label = document.createElement('a');
      $label.href = '#';
      $label.className = 'small';
      $label.tabIndex = -1;
      $label.addEventListener(
        'click',
        handlePresetClick.bind(null, $input),
        false
      );

      $label.appendChild($input);
      $label.appendChild(document.createTextNode(' ' + presetName));

      var $li = document.createElement('li');
      $li.appendChild($label);
      $presetContainer.appendChild($li);
      $presets.push($input);
    });

    return {
      get: function() {
        return $presets
          .filter(function($preset) { return $preset.checked; })
          .map(function($preset) { return $preset.value; })
          .join(',');
      },
      set: function(value) {
        value = value.split(',');
        $presets.forEach(function($preset) {
          $preset.checked = value.indexOf($preset.value) > -1;
        });
      },
      enumerable: true,
      configurable: true,
    };
  }

  /*
   * Babel options for transpilation as used by the REPL
   */
  function Options () {
    var $evaluate = $('#option-evaluate');
    var $lineWrap = $('#option-lineWrap');

    var options = {};
    Object.defineProperties(options, {
      evaluate: $checkboxValue($evaluate),
      lineWrap: $checkboxValue($lineWrap),
      presets: getPresetOptions()
    });

    // Merge in defaults
    var defaults = {
      evaluate: true,
      lineWrap: false,
      presets: 'es2015,stage-2,react',
    };

    _.assign(options, defaults);

    return options;
  }

  /*
   * Babel Web REPL
   */
  function REPL () {
    this.storage = new StorageService();
    var state = this.storage.get('b7ReplState') || {};
    _.assign(state, UriUtils.parseQuery());
    this.options = _.assign(new Options(), state);
    loadBabel(this.options);

    this.input = new Editor('.babel-repl-input .ace_editor').editor;
    this.input.setValue(UriUtils.decode(state.code || ''));

    this.output = new Editor('.babel-repl-output .ace_editor').editor;
    this.output.setReadOnly(true);
    this.output.setHighlightActiveLine(false);
    this.output.setHighlightGutterLine(false);

    this.$errorReporter = $('.babel-repl-errors');
    this.$consoleDebug = $('.babel-repl-console-debug');
    this.$consoleReporter = $('.babel-repl-console-output');
    this.$toolBar = $('.babel-repl-toolbar');
    this.$textareaWrapper = $('.dropdown-menu-container');
  }

  REPL.prototype.clearOutput = function () {
    this.$errorReporter.text('');
    this.$consoleDebug.text('');
    this.$consoleReporter.text('');
  };

  REPL.prototype.setOutput = function (output) {
    this.output.setValue(output, -1);
  };

  REPL.prototype.printError = function (message) {
    this.$errorReporter.text(message);
  };

  REPL.prototype.getSource = function () {
    return this.input.getValue();
  };

  REPL.prototype.compile = function () {
    var options = this.options;
    this.output.session.setUseWrapMode(options.lineWrap);

    var transformed;
    var code = this.getSource();
    this.clearOutput();

    if (!hasBabelLoaded()) {
      this.setOutput('// Babel is loading, please wait...');
      return;
    }

    var presets = options.presets.split(',');

    try {
      document.getElementById('babel-repl-version').innerHTML = Babel.version;
      transformed = Babel.transform(code, {
        presets: presets.filter(Boolean),
        filename: 'repl',
        babelrc: false,
      });
    } catch (err) {
      this.printError(err.message);
      throw err;
    }

    this.setOutput(transformed.code);

    if (options.evaluate) {
      this.evaluate(transformed.code);
    }
  };

  var capturingConsole;
  REPL.prototype.evaluate = function(code) {
    capturingConsole = Object.create(console);
    var $consoleReporter = this.$consoleReporter;
    var buffer = [];
    var error;
    var done = false;

    function flush() {
      $consoleReporter.text(buffer.join('\n'));
    }

    function write(data) {
      buffer.push(data);
      if (done) flush();
    }

    function capture() {
      if (this !== capturingConsole) { return; }

      var logs = _.map(arguments, function(log) {
        return window.prettyFormat(log);
      });

      write(logs.join(' '));
    }

    capturingConsole.clear = function() {
      buffer = [];
      flush();
      console.clear();
    };

    ['error', 'log', 'info', 'debug'].forEach(function(key) {
      capturingConsole[key] = function() {
        Function.prototype.apply.call(console[key], console, arguments);
        capture.apply(this, arguments);
      };
    });

    try {
      new Function('console', code)(capturingConsole);
    } catch (err) {
      error = err;
      buffer.push(err.message);
    }

    done = true;
    flush();
  };

  REPL.prototype.persistState = function (state) {
    UriUtils.updateQuery(state);
    this.storage.set('replState', state);
  };

  /*
   * Initialize the REPL
   */
  var repl = new REPL();

  function onPresetChange() {
    // Update the list of presets that are displayed on the dropdown list anchor
    var presetList = repl.options.presets.replace(/,/g, ', ');
    document.getElementById('babel-repl-selected-presets').innerHTML = presetList;
    onSourceChange();
  }

  function onToolbarChange() {
    var evaluate = repl.options.evaluate;
    var title = evaluate ? 'Disabled in evaluate mode' : '';
    onSourceChange();
  }

  function onSourceChange() {
    var error;
    try {
      repl.compile();
    } catch(err) {
      error = err;
    }
    var code = repl.getSource();
    var state = _.assign(repl.options, {
      code: code
    });
    repl.persistState(state);
    if (error) throw error;
  }

  repl.input.on('change', _.debounce(onSourceChange, UPDATE_DELAY));
  repl.$toolBar.on('change', onToolbarChange);
  repl.$textareaWrapper.on('click', function(e){e.stopPropagation();})


  /*
   * Make REPL editors resizable by width
   * Returns a function to disable feature
   */
  function initResizable(resizeSelector) {
    var $container = $('.babel-repl');
    var $leftPanel = $('.babel-repl-left-panel');
    var $rightPanel = $('.babel-repl-right-panel');
    var activeClass = 'babel-repl-resize-active';
    var offsetX;

    function onResize(e) {
      var curPos = e.pageX - offsetX;
      var leftWidth = curPos / $container.width() * 100;
      var rightWidth = 100 - leftWidth;
      if (leftWidth < 10 || leftWidth > 90) {
        return;
      }

      $leftPanel.outerWidth(leftWidth + '%');
      $rightPanel.outerWidth(rightWidth + '%');
    }

    function onResizeStart(e) {
      e.preventDefault();
      offsetX = e.offsetX;
      $(document).on('mousemove', onResize);
      $(document).on('mouseup', onResizeStop);
      $container.addClass(activeClass);
    }

    function onResizeStop(e) {
      $(document).off('mousemove', onResize);
      $(document).off('mouseup', onResizeStop);
      $container.removeClass(activeClass);
    }

    $(resizeSelector).on('mousedown', onResizeStart);

    return function() {
      $(resizeSelector).off('mousedown', onResizeStart);
    };
  }

  /**
   * Checks if a script (such as Babel-standalone or Babili-standalone) has been
   * loaded. If not, kicks off a load (if it hasn't already started) and returns
   * false. Returns true if the script is ready to use.
   */
  function lazyLoadScript(name, checkFn, url) {
    if (checkFn()) {
      return true;
    }
    if (loadingScripts[name]) {
      return false;
    }

    if (url) {
      // Babili-standalone is exported as a UMD script, and thus hits the CommonJS
      // error ("is not supported in the browser..."), temporarily disable it
      // while loading.
      enableCommonJSError = false;

      var script = document.createElement('script');
      script.async = true;
      script.src = url;
      script.onload = function() {
        enableCommonJSError = true;
        onSourceChange();
      };
      script.onerror = function() {
        alert('Could not load ' + name + ' :(');
      };
      document.head.appendChild(script);
      loadingScripts[name] = true;
    }
    return false;
  }

  function hasBabelLoaded() {
    return lazyLoadScript('Babel', () => !!window.Babel);
  }

  function loadBabel(options) {
    function doLoad(url) {
      lazyLoadScript('Babel', () => !!window.Babel, url);
    }

    // See if a CircleCI build number was passed in the path
    // Prod (with URL rewriting): /repl/build/12345/
    // Dev: /repl/#?build=12345
    var build = options.build;
    var buildFromPath = window.location.pathname.match(/\/build\/([0-9]+)\/?$/);
    if (buildFromPath) {
      build = buildFromPath[1];
    }
    if (build) {
      loadBuildArtifacts(options.circleci_repo, build, function(url) {
        doLoad(url);
      });
      return;
    }

    // See if a released version of Babel was passed
    // Prod (with URL rewriting): /repl/version/1.2.3/
    // Dev: /repl/#?version=1.2.3
    var version = options.version;
    var versionFromPath = window.location.pathname.match(/\/version\/(.+)\/?$/);
    if (versionFromPath) {
      version = versionFromPath[1];
    }

    // No specific version passed, so just download the latest release.
    if (!version) {
      version = 'next'; // This should be changed to "latest" when Babel 7 is stable
    }

    doLoad('https://unpkg.com/babel-standalone@' + version + '/babel.js');
  }

  function loadBuildArtifacts(repo, build, cb) {
    // Loading a build from CircleCI (eg. for a pull request). We need to
    // first call CircleCI's API to get the URL to the artifact.
    var buildURL = 'https://circleci.com/api/v1.1/project/github/{repo}/{build}/artifacts'
      .replace('{repo}', repo || 'babel/babel')
      .replace('{build}', build);
    var xhr = new XMLHttpRequest();
    xhr.open('get', buildURL, true);
    xhr.onload = function() {
      var response = JSON.parse(xhr.responseText);
      if (response.message) {
        alert('Could not load Babel build #' + build + ': ' + response.message);
        return;
      }
      var artifacts = response.filter(x => /babel-standalone\/babel.js$/.test(x.path));
      if (!artifacts || artifacts.length === 0) {
        alert('Could not find valid babel-standalone artifact in build #' + build);
        return;
      }
      cb(artifacts[0].url);
    };
    xhr.onerror = function() {
      alert('Could not load Babel build #' + build + ' :(');
    }
    xhr.send();
  }

  initResizable('.babel-repl-resize');
  onPresetChange();
  onToolbarChange();
}($, _, ace, LZString, window));
