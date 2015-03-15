(function(babel, $, _, ace, window) {

  /* Throw meaningful errors for getters of commonjs. */
  ["module", "exports", "require"].forEach(function(commonVar){
    Object.defineProperty(window, commonVar, {
      get: function () {
        throw new Error(commonVar + " is not supported in the browser, you need a commonjs environment such as node.js/io.js, browserify/webpack etc");
      }
    });
  });

  /**
   * Pretty Printing
   */

  function indentLines(str) {
    return str.split('\n').join('\n  ');
  }

  var printTypes = [{
    test: _.isArray,
    print: function(arr) {
      var result = '[';
      if (arr.length) {
        result += '\n';
        for (var i = 0; i < arr.length; i++) {
          result += '  ' + indentLines(print(arr[i]));
          if (i < arr.length - 1) {
            result += ',\n';
          }
        }
        result += '\n';
      }
      result += ']';
      return result;
    }
  }, {
    test: _.isFunction,
    print: function(fn) {
      return Function.prototype.toString.call(fn);
    }
  }, {
    test: _.isObject,
    print: function(obj) {
      var result = '{';
      var keys = _.keys(obj).concat(Object.getOwnPropertySymbols(obj));
      if (keys.length) {
        result += '\n';
        for (var i = 0; i < keys.length; i++) {
          var key = print(keys[i]);
          var val = indentLines(print(obj[keys[i]]));
          result += '  ' + key + ': ' + val;
          if (i < keys.length - 1) {
            result += ',\n';
          }
        }
        result += '\n';
      }
      return result + '}';
    }
  }, {
    test: _.isString,
    print: function(str) {
      return '"' + str + '"';
    }
  }, {
    test: function(val) {
      return val && val.toString && /^Symbol\(.*\)$/.test(val.toString());
    },
    print: function(sym) {
      return Symbol.prototype.toString.call(sym);
    }
  }, {
    test: function(val) {
      return (
        _.isNumber(val) ||
        _.isBoolean(val) ||
        _.isUndefined(val)
      );
    },
    print: function(lit) {
      return '' + lit;
    }
  }];

  var printCache = [];
  function print(val, indent) {
    if (_.isObject(val)) {
      if (_.indexOf(printCache, val) > -1) {
        return '[Circular]';
      }
      printCache.push(val);
    }

    var type = _.find(printTypes, function(type) {
      return type.test(val);
    });

    return type.print(val);
  }

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

  /*
   * Babel options for transpilation as used by the REPL
   */
  function Options () {
    var $experimental = $('#option-experimental');
    var $playground = $('#option-playground');
    var $evaluate = $('#option-evaluate');
    var $loose = $('#option-loose-mode');
    var $spec = $('#option-spec');

    var options = {};
    Object.defineProperties(options, {
      'experimental': $checkbox($experimental),
      'playground': $checkbox($playground),
      'evaluate': $checkbox($evaluate),
      'loose': $checkbox($loose),
      'spec': $checkbox($spec)
    });

    // Merge in defaults
    var defaults = {
      experimental : true,
      playground : false,
      loose : false,
      spec : false,
      evaluate : true
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

    var transformed;
    var code = this.getSource();
    this.clearOutput();

    try {
      transformed = babel.transform(code, {
        experimental: this.options.experimental,
        playground: this.options.playground,
        loose: this.options.loose && "all",
        optional: this.options.spec && ["spec.typeofSymbol", "es6.blockScopingTDZ"],
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

  REPL.prototype.evaluate = function(code) {
    var capturingConsole = Object.create(console);
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

    capturingConsole.log =
    capturingConsole.info =
    capturingConsole.debug = function() {
      if (this !== capturingConsole) { return; }

      console.log.apply(console, arguments);

      var logs = _.map(arguments, function(log) {
        return print(log);
      });

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



}(babel, $, _, ace, window));
