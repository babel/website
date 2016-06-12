(function(babel, $, _, ace, window) {
  'use strict';

  var presets = ['es2015', 'es2015-loose', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3'];

  /* Throw meaningful errors for getters of commonjs. */
  ["module", "exports", "require"].forEach(function(commonVar){
    Object.defineProperty(window, commonVar, {
      configurable: true,
      get: function () {
        throw new Error(commonVar + " is not supported in the browser, you need a commonjs environment such as node.js/io.js, browserify/webpack etc");
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
        params[param.key] = UriUtils.decode(param.value);
      }
      return params;
    }, {});
  };

  UriUtils.updateQuery = function (object) {
    var query = Object.keys(object).map(function(key){
      return key + '=' + UriUtils.encode(object[key]);
    }).join('&');

    window.location.hash = '?' + query;
  };

  /*
   * Long term storage for persistence of state/etc
   */
  function StorageService () {
    this.store = window.localStorage;
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
      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
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
  function $checkbox($element){
    return {
      get: function () {
        return $element.is(":checked");
      } ,
      set: function (value) {
        var setting = value !== 'false' && value !== false;
        $element.prop('checked', setting);
      },
      enumerable: true,
      configurable: false
    };
  }

  /**
   * Options for selecting presets to use.
   */
  function getPresetOptions() {
    // Create the checkboxes for all available presets
    var $presetContainer = document.getElementById('babel-repl-presets');
    var $presets = [];
    presets.forEach(function(presetName) {
      var $group = document.createElement('div');
      $group.className = 'form-group';

      var $label = document.createElement('label');
      $label.htmlFor = 'option-' + presetName;
      $group.appendChild($label);

      var $input = document.createElement('input');
      $input.type = 'checkbox';
      $input.name = 'preset';
      $input.value = presetName;
      $input.id = 'option-' + presetName;
      $label.appendChild($input);
      $label.appendChild(document.createTextNode(' ' + presetName));

      $presetContainer.appendChild($group);
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
      evaluate: $checkbox($evaluate),
      lineWrap: $checkbox($lineWrap),
      presets: getPresetOptions(),
    });

    // Merge in defaults
    var defaults = {
      evaluate: true,
      lineWrap: false,
      presets: 'es2015,stage-2,react'
    };

    _.assign(options, defaults);

    return options;
  }

  /*
   * Babel Web REPL
   */
  function REPL () {
    this.storage = new StorageService();
    var state = this.storage.get('replState') || {};
    _.assign(state, UriUtils.parseQuery());

    this.options = _.assign(new Options(), state);

    this.input = new Editor('.babel-repl-input .ace_editor').editor;
    this.input.setValue(UriUtils.decode(state.code || ''));

    this.output = new Editor('.babel-repl-output .ace_editor').editor;
    this.output.setReadOnly(true);
    this.output.setHighlightActiveLine(false);
    this.output.setHighlightGutterLine(false);

    this.$errorReporter = $('.babel-repl-errors');
    this.$consoleReporter = $('.babel-repl-console');
    this.$toolBar = $('.babel-repl-toolbar');

    document.getElementById('babel-repl-version').innerHTML = babel.version;
  }

  REPL.prototype.clearOutput = function () {
    this.$errorReporter.text('');
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
    this.output.session.setUseWrapMode(this.options.lineWrap);

    var transformed;
    var code = this.getSource();
    this.clearOutput();

    try {
      transformed = babel.transform(code, {
        presets: this.options.presets.split(','),
        filename: 'repl'
      });
    } catch (err) {
      this.printError(err.message);
      throw err;
    }

    this.setOutput(transformed.code);

    if (this.options.evaluate) {
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

    capturingConsole.clear = function() {
      buffer = [];
      flush();
    };

    capturingConsole.error = function () {
      error = true;
      capturingConsole.log.apply(capturingConsole, arguments);
    };

    capturingConsole.log =
    capturingConsole.info =
    capturingConsole.debug = function() {
      if (this !== capturingConsole) { return; }

      var args = Array.prototype.slice.call(arguments);
      Function.prototype.apply.call(console.log, console, args);

      var logs = args.reduce(function (logs, log) {
        if (typeof log === 'string') {
          logs.push(log);
        } else if (log instanceof Function) {
          logs.push(log.toString());
        } else {
          logs.push(JSON.stringify(log));
        }
        return logs;
      }, []);

      write(logs.join(' '));
    };

    try {
      new Function('console', code)(capturingConsole);
    } catch (err) {
      error = err;
      buffer.push(err.message);
    }

    done = true;
    flush();

    if (error) throw error;
  };

  REPL.prototype.persistState = function (state) {
    UriUtils.updateQuery(state);
    this.storage.set('replState', state);
  };

  /*
   * Initialize the REPL
   */
  var repl = new REPL();

  function onSourceChange () {
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

  repl.input.on('change', _.debounce(onSourceChange, 500));
  repl.$toolBar.on('change', onSourceChange);

  repl.compile();
}(Babel, $, _, ace, window));
