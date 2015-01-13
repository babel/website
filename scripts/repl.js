(function() {

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

  var input = new Editor('.to5-repl-input .ace_editor');
  var output = new Editor('.to5-repl-output .ace_editor');

  output.editor.setReadOnly(true);
  output.editor.setHighlightActiveLine(false);
  output.editor.setHighlightGutterLine(false);

  var getQuery = function() {
    var query = window.location.hash.replace(/^\#\?/, '');
    return _.transform(query ? query.split('&') : null, function(result, val) {
      val = val.split('=');
      result[val[0]] = decodeURIComponent('' + val[1]);
    }, {});
  };

  var setQuery = function(params) {
    var result = _(getQuery()).assign(params).map(function(val, key) {
      return key + '=' + encodeURIComponent(val);
    }).join('&');
    window.location.hash = '?' + result;
  };

  var $optionExperimental = $('#option-experimental');
  var $optionPlayground = $('#option-playground');
  var $optionEvaluate = $('#option-evaluate');

  var getOptions = function() {
    return {
      experimental: $optionExperimental.is(':checked'),
      playground: $optionPlayground.is(':checked'),
      evaluate: $optionEvaluate.is(':checked')
    };
  };

  var setOptions = function(options) {
    $optionExperimental.prop('checked', query.experimental !== 'false');
    $optionPlayground.prop('checked', query.playground !== 'false');
    $optionEvaluate.prop('checked', query.evaluate !== 'false');
  };

  var $errorReporter = $('.to5-repl-errors');
  var $consoleReporter = $('.to5-repl-console');
  var capturingConsole;

  var evaluate = function(code) {
    var buffer = [];
    var error;
    var done = false;

    function write(data) {
      buffer.push(data);
      if (done) flush();
    }

    function flush() {
      $consoleReporter.text(buffer.join('\n'));
    }

    capturingConsole = Object.create(console);
    capturingConsole.log = function() {
      if (this !== capturingConsole) { return; }

      console.log.apply(console, arguments);
      var result = _.transform(arguments, function(result, val, i) {
        if (typeof val === 'string') {
          result[i] = val;
        } else if (val instanceof Function) {
          result[i] = val.toString();
        } else {
          result[i] = JSON.stringify(val);
        }
      }, []).join(' ');

      write(result);
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

  var compile = _.debounce(function() {
    var options = getOptions();
    var code = options.code = input.editor.getValue();
    var transformed;

    setQuery(options);

    $errorReporter.text('');
    $consoleReporter.text('');

    try {
      transformed = to5.transform(code, {
        experimental: options.experimental,
        playground: options.playground,
        filename: 'repl'
      });
    } catch (err) {
      $errorReporter.text(err.message);
      throw err;
    }

    output.editor.setValue(transformed.code, -1);

    if (options.evaluate) {
      evaluate(transformed.code);
    }
  }, 500);

  input.editor.on('change', compile);
  $optionExperimental.on('change', compile);
  $optionPlayground.on('change', compile);
  $optionEvaluate.on('change', compile);

  var query = getQuery();

  setOptions(query);
  input.editor.setValue(decodeURIComponent(query.code || ''));

}());
