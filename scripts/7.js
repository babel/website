(function(babel, $, _, ace, LZString, window) {
  'use strict';
  var UPDATE_DELAY = 500;

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

  function $selectValue($element) {
    return {
      get: function () {
        return $element.val();
      },
      set: function (value) {
        var setting = value;
        $element.val(setting);
      },
      enumerable: true,
      configurable: false
    };
  }

  // function prevent(evt) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  // }

  /*
   * Babel options for transpilation as used by the REPL
   */
  function Options () {
    var $evaluate = $('#option-evaluate');
    var $browsers = $('#option-browsers');
    var $useBuiltIns = $('#option-builtIns');
    var $lineWrap = $('#option-lineWrap');

    var options = {};
    Object.defineProperties(options, {
      evaluate: $checkboxValue($evaluate),
      lineWrap: $checkboxValue($lineWrap),
      useBuiltIns: $selectValue($useBuiltIns),
      browsers: $inputValue($browsers)
    });

    // Merge in defaults
    var defaults = {
      evaluate: true,
      useBuiltIns: false,
      browsers: [],
      lineWrap: false,
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
    this.$browsers = $('#option-browsers');
    this.$useBuiltIns = $('#option-builtIns');

    document.getElementById('babel-repl-version').innerHTML = babel.version;
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
    const builtInsValue = options.useBuiltIns === 'false' ? false : options.useBuiltIns;

    var envOptions = {
      useBuiltIns: builtInsValue,
      targets: {
        browsers: options.browsers
      }
    };

    try {
      transformed = babel.transform(code, {
        presets: [
          [babelPresetEnv, envOptions],
          babelPresetStage0
        ],
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

  function onToolbarChange() {
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
  repl.$useBuiltIns.on('change', _.debounce(onSourceChange, UPDATE_DELAY));
  repl.$browsers.on('keyup', _.debounce(onSourceChange, UPDATE_DELAY));

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

  initResizable('.babel-repl-resize');
  onToolbarChange();
}(babelCore, $, _, ace, LZString, window));
