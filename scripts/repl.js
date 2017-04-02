(function(babel, $, _, ace, window) {
  'use strict';
  var UPDATE_DELAY = 500;

  var presets = [
    'env',
    'es2015',
    'es2015-loose',
    'es2016',
    'es2017',
    'react',
    'stage-0',
    'stage-1',
    'stage-2',
    'stage-3'
  ];

  var targets = [
    // {name: "Chrome", min: 4, default: 58},
    // {name: "Opera", min: 10, default: 44},
    // {name: "Edge", min: 12, default: 15},
    // {name: "Firefox", min: 2, default: 53},
    // {name: "Safari", min: 3, default: 10},
    // {name: "IE", min: 6, default: 11},
    // {name: "iOS", min: 3, default: 10},
    {name: "Electron", min: 0.3, default: 1.5, step: 0.1},
    {name: "Node", label: "Node.js", min: '0.10', default: 7.4, step: 0.1}
  ];

  /* Register standalone version of env preset. */
  Babel.registerPreset('env', babelPresetEnv.default);

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
        return $element.val();
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

  function handleTargetClick($input, evt) {
    evt.preventDefault();
    evt.stopPropagation();

    // Needs to run in a timeout to properly handle clicks directly on the
    // checkbox.
    setTimeout(function() {
      $input.checked = !$input.checked;
      onTargetChange();
    }, 0);
  }

  function prevent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  function getEnvOptions(options) {
    var origTargets = options.targets,
    browsers = options.browsers,
    builtIns = !options.evaluate && options.builtIns;

    var arrayOfTargets = origTargets.split(',').filter(Boolean);
    var targets = arrayOfTargets.reduce(function(objectOfTargets, target){
      target = target.split('-');
      var name = target[0].toLowerCase();
      var version = parseFloat(target[1]);
      objectOfTargets[name] = version;
      return objectOfTargets;
    }, {});

    if (browsers) {
      targets.browsers = browsers;
    }

    return {
      useBuiltIns: builtIns,
      targets: targets
    };
  };

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

  function getTargetOptions() {
    // Create version + checkbox for all available targets
    var $targetsListCointainer = document.querySelector('#babel-repl-targets-dropdown .dropdown-menu-list');
    var $targets = [];

    targets.forEach(function(target) {
      var targetName = target.name,
      targetLabel = target.label || targetName,
      defaultVersion = target.default,
      minVersion = target.min,
      step = target.step || 1;

      var $checkbox = document.createElement('input');
      $checkbox.type = 'checkbox';
      $checkbox.name = 'target';
      $checkbox.value = targetName;
      $checkbox.id = 'option-' + targetName;

      var $input = document.createElement('input');
      $input.type = 'number';
      $input.min = minVersion;
      $input.value = defaultVersion;
      $input.step = step;
      $input.name = 'version';
      $input.id = 'option-target-' + targetName.toLowerCase();

      var $label = document.createElement('a');
      $label.href = '#';
      $label.className = 'small';
      $label.tabIndex = -1;

      var $span = document.createElement('span');
      $span.innerHTML = targetLabel;
      $label.appendChild($span);

      $label.addEventListener(
        'click',
        handleTargetClick.bind(null, $checkbox),
        false
      );

      $input.addEventListener(
        'click',
        prevent,
        false
      );

      $input.addEventListener(
        'change',
        _.debounce(onTargetChange, 500),
        false
      );

      $label.appendChild($checkbox);
      $label.appendChild($input);

      var $li = document.createElement('li');
      $li.appendChild($label);
      $targetsListCointainer.appendChild($li);
      $targets.push({$checkbox: $checkbox, $input: $input});
    });

    return {
      get: function() {
        return $targets
          .filter(function(target) { return target.$checkbox.checked && target.$input.value; })
          .map(function(target) { return target.$checkbox.value + '-' + target.$input.value; })
          .join(',');
      },
      set: function(valueStr) {
        var values = valueStr.split(',');
        values.forEach(function(value){
          value = value.split('-');
          $targets.forEach(function(target) {
            var name = value[0],
            version = value[1];

            target.$checkbox.checked = name && name.indexOf(target.$checkbox.value) > -1;
            target.$input.value = version && name.indexOf(target.$checkbox.value) > -1 ? version : target.$input.value;
          });
        })
      },
      enumerable: true,
      configurable: true,
    };
  }

  var isBabiliLoading = false;
  /**
   * Checks if Babili has been loaded. If not, kicks off a load (if it hasn't
   * already started) and returns false. Returns true if Babili is ready to use.
   */
  function hasBabiliLoaded() {
    if (window.Babili) {
      return true;
    }
    if (isBabiliLoading) {
      return false;
    }
    // Babili-standalone is exported as a UMD script, and thus hits the CommonJS
    // error ("is not supported in the browser..."), temporarily disable it
    // while loading.
    enableCommonJSError = false;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://unpkg.com/babili-standalone@0/babili.min.js';
    script.onload = function() {
      enableCommonJSError = true;
      onSourceChange();
    };
    document.head.appendChild(script);
    isBabiliLoading = true;
    return false;
  }

  /*
   * Babel options for transpilation as used by the REPL
   */
  function Options () {
    var $evaluate = $('#option-evaluate');
    var $lineWrap = $('#option-lineWrap');
    var $babili = $('#option-babili');
    var $browsers = $('#option-browsers');
    var $builtIns = $('#option-builtIns');

    var options = {};
    Object.defineProperties(options, {
      babili: $checkboxValue($babili),
      evaluate: $checkboxValue($evaluate),
      lineWrap: $checkboxValue($lineWrap),
      presets: getPresetOptions(),
      targets: getTargetOptions(),
      browsers: $inputValue($browsers),
      builtIns: $checkboxValue($builtIns)
    });

    // Merge in defaults
    var defaults = {
      babili: false,
      evaluate: true,
      lineWrap: false,
      presets: 'es2015,stage-2,react',
      browsers: ''
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
    this.$textareaWrapper = $('.dropdown-menu-container');
    this.$envBar = $('#option-browsers');

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
    var options = this.options;
    this.output.session.setUseWrapMode(options.lineWrap);

    var transformed;
    var code = this.getSource();
    this.clearOutput();

    if (options.babili && !hasBabiliLoaded()) {
      this.setOutput('// Babili is loading, please wait...');
      return;
    }

    var presets = options.presets.split(',');

    if (options.babili) {
      presets.push('babili');
    }

    if (presets.includes('env')) {
      presets = presets.map(function (preset) {
        if (preset === 'env') {
          var envOptions = getEnvOptions(options);
          return ["env", envOptions];
        }
        return preset;
      })
    }

    try {
      transformed = babel.transform(code, {
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
    var $envTargets = $('.babel-repl-targets-container');
    var $envBuiltIns = $('#option-builtIns-wrapper');

    var presetList = repl.options.presets.replace(/,/g, ', ');

    // Hide targets anchor unless env preset is selected.
    var envIncluded = repl.options.presets.includes('env');
    $envTargets.toggleClass('hidden', !envIncluded);
    $envBuiltIns.toggleClass('hidden', !envIncluded);

    document.getElementById('babel-repl-selected-presets').innerHTML = presetList;

    onSourceChange();
  }

  function onTargetChange() {
    // Update the list of targets that are displayed on the dropdown list anchor
    var browsersList = repl.options.browsers;
    var targetList = repl.options.targets.replace(/,/g, ', ');
    var targetsEl = document.getElementById('babel-repl-selected-targets');

    if (browsersList.length && targetList.length) {
      browsersList += ', ';
    }

    targetsEl.innerHTML = browsersList + targetList;

    onSourceChange();
  }

  function onToolbarChange() {
    var $envBuiltIns = $('#option-builtIns-wrapper');
    var $envBuiltInsInput = $envBuiltIns.find('input[type=checkbox]');
    var evaluate = repl.options.evaluate;
    var title = evaluate ? 'Disabled in evaluate mode' : '';

    $envBuiltIns.attr('title', title);
    if (evaluate) {
      $envBuiltInsInput.prop('checked', false);
    }
    $envBuiltInsInput.attr('disabled', evaluate);

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
  repl.$envBar.on('keyup', _.debounce(onTargetChange, UPDATE_DELAY));
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
  onPresetChange();
  onTargetChange();
  onToolbarChange();
}(Babel, $, _, ace, window));
