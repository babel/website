(function(babel, $, _, ace, window) {

  // we load it async, and it's a UMD so it checks for module/exports
  // it would require automation or dialup internet for this to potentially affect a user
  var hackToAllowCommonVarWhileLoadingParse = false;

  /* Throw meaningful errors for getters of commonjs. */
  ["module", "exports", "require"].forEach(function(commonVar){
    Object.defineProperty(window, commonVar, { 
      get: function () {
        if (hackToAllowCommonVarWhileLoadingParse) return undefined;
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
   * Utils for working with parse.com for persistence
   */
  function ParseUtils () {}

  var __parseLoadingCallbacks = null;
  ParseUtils.prototype.load = function () {
    if (__parseLoadingCallbacks) return;
    __parseLoadingCallbacks = [];

    var url = '//www.parsecdn.com/js/parse-1.3.5.min.js';
    var script = document.createElement('script');
    script.src = url;

    hackToAllowCommonVarWhileLoadingParse = true;
    script.addEventListener('load', function () {
      Parse.initialize("ao4bnVLH8mmU1VUxDRFMzDDljabE0zJKhKJGQkZi", "1GnvnA6s9YgHVMUCyyQDxwJLkcnhRjhXvgnY6DGV");
      hackToAllowCommonVarWhileLoadingParse = false;

      __parseLoadingCallbacks.forEach(function (cb) {
        cb();
      });

      __parseLoadingCallbacks = 'DONE';
    });
    document.head.appendChild(script);
  };

  ParseUtils.prototype.addLoadCallback = function (cb) {
    __parseLoadingCallbacks.push(cb);
  };

  ParseUtils.prototype.afterLoad = function (cb) {
    var self = this;

    var callCb = function(){
      var ReplItem = Parse.Object.extend("ReplItem");
      cb.call(self, ReplItem);
    };

    if (__parseLoadingCallbacks === 'DONE') {
      setTimeout(callCb, 0);
    }
    else {
      self.load();
      self.addLoadCallback(callCb);
    }
  };

  ParseUtils.prototype.save = function (data, cb) {
    this.afterLoad(function(ReplItem){
      var obj = new ReplItem();

      obj.save(data).then(function (obj) {
        cb(null, obj.id);
      }, function (err) {
        cb(err);
      });
    });
  };

  ParseUtils.prototype.get = function (id, cb) {
    this.afterLoad(function(ReplItem){
      var query = new Parse.Query(ReplItem);
      query.get(id)
        .then(function (data) {
        // give us a plain object without anything parse specific, making
        // .get's output the same as .save's input
        var cleanData = data.toJSON();
        delete cleanData.objectId;
        delete cleanData.createdAt;
        delete cleanData.updatedAt;

        cb(null, cleanData);
      }, function (err) {
        cb(err);
      })
    });
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
    this.shortener = new ParseUtils();
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
    this.$shortenUrlButton = $('#button-shorten-url');
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

  REPL.prototype.evaluate = function (code)  {
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

    capturingConsole.clear = function () {
      buffer = [];
      flush();
    };

    capturingConsole.error = function () {
      error = true;
      capturingConsole.log.apply(capturingConsole, arguments);
    };

    capturingConsole.log = 
    capturingConsole.info = 
    capturingConsole.debug = function () {
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
  var initialQuery = UriUtils.parseQuery();
  if (initialQuery && initialQuery.short) {
    new ParseUtils().get(initialQuery.short, function (err, data) {
      if (err) {
        alert('Could not load an item with that id');
        window.location.hash = '';
        initRepl();
        return;
      }

      UriUtils.updateQuery(data);
      initRepl();
    });
  }
  else {
    initRepl();
  }

  var repl;
  function initRepl(){
    repl = new REPL();

    repl.input.on('change', _.debounce(onSourceChange, 500));
    repl.$toolBar.on('change', onSourceChange);
    repl.$shortenUrlButton.on('click', onRequestShorten);

    repl.compile();
  }

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

  function onRequestShorten () {
    var state = _.assign(repl.options, {
      code: repl.getSource()
    });

    repl.$shortenUrlButton.prop('disabled', true);
    repl.$shortenUrlButton.css({opacity: 0.2});

    repl.shortener.save(state, function (err, id){
      repl.$shortenUrlButton.prop('disabled', false);
      repl.$shortenUrlButton.css({opacity: 1});

      if (err) {
        console.error('It seems saving isn\'t working for you.  Please report it here: https://github.com/babel/babel.github.io/issues/new');
        console.error(err);
        alert('Could not shorten url, see developer console console.');
        return;
      }

      UriUtils.updateQuery({short: id});

      repl.$shortenUrlButton.css({color: '#70ff70'});
      setTimeout(function (){
        repl.$shortenUrlButton.css({color: ''});
      }, 1500);
    });
  }



}(babel, $, _, ace, window));
