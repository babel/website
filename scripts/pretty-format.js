// https://github.com/thejameskyle/pretty-format
(function() {

  var ESCAPED_CHARACTERS = /(\\|\"|\')/g;

  function printString(val) {
    return val.replace(ESCAPED_CHARACTERS, '\\$1');
  }

  var toString = Object.prototype.toString;
  var toISOString = Date.prototype.toISOString;
  var errorToString = Error.prototype.toString;
  var regExpToString = RegExp.prototype.toString;
  var symbolToString = Symbol.prototype.toString;

  var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
  var NEWLINE_REGEXP = /\n/ig;

  var getSymbols = Object.getOwnPropertySymbols || function (obj) {
    return [];
  };

  function isToStringedArrayType(toStringed) {
    return toStringed === '[object Array]' || toStringed === '[object ArrayBuffer]' || toStringed === '[object DataView]' || toStringed === '[object Float32Array]' || toStringed === '[object Float64Array]' || toStringed === '[object Int8Array]' || toStringed === '[object Int16Array]' || toStringed === '[object Int32Array]' || toStringed === '[object Uint8Array]' || toStringed === '[object Uint8ClampedArray]' || toStringed === '[object Uint16Array]' || toStringed === '[object Uint32Array]';
  }

  function printNumber(val) {
    if (val != +val) return 'NaN';
    var isNegativeZero = val === 0 && 1 / val < 0;
    return isNegativeZero ? '-0' : '' + val;
  }

  function printFunction(val) {
    if (val.name === '') {
      return '[Function anonymous]';
    } else {
      return '[Function ' + val.name + ']';
    }
  }

  function printSymbol(val) {
    return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  }

  function printError(val) {
    return '[' + errorToString.call(val) + ']';
  }

  function printBasicValue(val) {
    if (val === true || val === false) return '' + val;
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';

    var typeOf = typeof val;

    if (typeOf === 'number') return printNumber(val);
    if (typeOf === 'string') return '"' + printString(val) + '"';
    if (typeOf === 'function') return printFunction(val);
    if (typeOf === 'symbol') return printSymbol(val);

    var toStringed = toString.call(val);

    if (toStringed === '[object WeakMap]') return 'WeakMap {}';
    if (toStringed === '[object WeakSet]') return 'WeakSet {}';
    if (toStringed === '[object Function]' || toStringed === '[object GeneratorFunction]') return printFunction(val);
    if (toStringed === '[object Symbol]') return printSymbol(val);
    if (toStringed === '[object Date]') return toISOString.call(val);
    if (toStringed === '[object Error]') return printError(val);
    if (toStringed === '[object RegExp]') return regExpToString.call(val);
    if (toStringed === '[object Arguments]' && val.length === 0) return 'Arguments []';
    if (isToStringedArrayType(toStringed) && val.length === 0) return val.constructor.name + ' []';

    if (val instanceof Error) return printError(val);

    return false;
  }

  function printList(list, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    var body = '';

    if (list.length) {
      body += '\n';

      var innerIndent = prevIndent + indent;

      for (var i = 0; i < list.length; i++) {
        body += innerIndent + print(list[i], indent, innerIndent, refs, maxDepth, currentDepth, plugins);

        if (i < list.length - 1) {
          body += ',\n';
        }
      }

      body += '\n' + prevIndent;
    }

    return '[' + body + ']';
  }

  function printArguments(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    return 'Arguments ' + printList(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
  }

  function printArray(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    return val.constructor.name + ' ' + printList(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
  }

  function printMap(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    var result = 'Map {';
    var iterator = val.entries();
    var current = iterator.next();

    if (!current.done) {
      result += '\n';

      var innerIndent = prevIndent + indent;

      while (!current.done) {
        var key = print(current.value[0], indent, innerIndent, refs, maxDepth, currentDepth, plugins);
        var value = print(current.value[1], indent, innerIndent, refs, maxDepth, currentDepth, plugins);

        result += innerIndent + key + ' => ' + value;

        current = iterator.next();

        if (!current.done) {
          result += ',\n';
        }
      }

      result += '\n' + prevIndent;
    }

    return result + '}';
  }

  function printObject(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    var constructor = val.constructor ? val.constructor.name + ' ' : 'Object ';
    var result = constructor + '{';
    var keys = Object.keys(val).sort();
    var symbols = getSymbols(val);

    if (symbols.length) {
      keys = keys.filter(function (key) {
        return !(typeof key === 'symbol' || toString.call(key) === '[object Symbol]');
      }).concat(symbols);
    }

    if (keys.length) {
      result += '\n';

      var innerIndent = prevIndent + indent;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var name = print(key, indent, innerIndent, refs, maxDepth, currentDepth, plugins);
        var value = print(val[key], indent, innerIndent, refs, maxDepth, currentDepth, plugins);

        result += innerIndent + name + ': ' + value;

        if (i < keys.length - 1) {
          result += ',\n';
        }
      }

      result += '\n' + prevIndent;
    }

    return result + '}';
  }

  function printSet(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    var result = 'Set {';
    var iterator = val.entries();
    var current = iterator.next();

    if (!current.done) {
      result += '\n';

      var innerIndent = prevIndent + indent;

      while (!current.done) {
        result += innerIndent + print(current.value[1], indent, innerIndent, refs, maxDepth, currentDepth, plugins);

        current = iterator.next();

        if (!current.done) {
          result += ',\n';
        }
      }

      result += '\n' + prevIndent;
    }

    return result + '}';
  }

  function printComplexValue(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    refs = refs.slice();
    if (refs.indexOf(val) > -1) {
      return '[Circular]';
    } else {
      refs.push(val);
    }

    currentDepth++;

    var hitMaxDepth = currentDepth > maxDepth;

    if (!hitMaxDepth && val.toJSON && typeof val.toJSON === 'function') {
      return print(val.toJSON(), indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    }

    var toStringed = toString.call(val);
    if (toStringed === '[object Arguments]') {
      return hitMaxDepth ? '[Arguments]' : printArguments(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    } else if (isToStringedArrayType(toStringed)) {
      return hitMaxDepth ? '[Array]' : printArray(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    } else if (toStringed === '[object Map]') {
      return hitMaxDepth ? '[Map]' : printMap(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    } else if (toStringed === '[object Set]') {
      return hitMaxDepth ? '[Set]' : printSet(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    } else if (typeof val === 'object') {
      return hitMaxDepth ? '[Object]' : printObject(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    }
  }

  function printPlugin(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    var match = false;
    var plugin = void 0;

    for (var p = 0; p < plugins.length; p++) {
      plugin = plugins[p];

      if (plugin.test(val)) {
        match = true;
        break;
      }
    }

    if (!match) {
      return false;
    }

    function boundPrint(val) {
      return print(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    }

    function boundIndent(str) {
      var indentation = prevIndent + indent;
      return indentation + str.replace(NEWLINE_REGEXP, '\n' + indentation);
    }

    return plugin.print(val, boundPrint, boundIndent);
  }

  function print(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins) {
    var basic = printBasicValue(val);
    if (basic) return basic;

    var plugin = printPlugin(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
    if (plugin) return plugin;

    return printComplexValue(val, indent, prevIndent, refs, maxDepth, currentDepth, plugins);
  }

  var DEFAULTS = {
    indent: 2,
    maxDepth: Infinity,
    plugins: []
  };

  function validateOptions(opts) {
    Object.keys(opts).forEach(function (key) {
      if (!DEFAULTS.hasOwnProperty(key)) {
        throw new Error('prettyFormat: Invalid option: ' + key);
      }
    });
  }

  function normalizeOptions(opts) {
    var result = {};

    Object.keys(DEFAULTS).forEach(function (key) {
      return result[key] = opts.hasOwnProperty(key) ? opts[key] : DEFAULTS[key];
    });

    return result;
  }

  function createIndent(indent) {
    return new Array(indent + 1).join(' ');
  }

  function prettyFormat(val, opts) {
    if (!opts) {
      opts = DEFAULTS;
    } else {
      validateOptions(opts);
      opts = normalizeOptions(opts);
    }

    var indent = void 0;
    var refs = void 0;
    var prevIndent = '';
    var currentDepth = 0;

    if (opts && opts.plugins.length) {
      indent = createIndent(opts.indent);
      refs = [];
      var pluginsResult = printPlugin(val, indent, prevIndent, refs, opts.maxDepth, currentDepth, opts.plugins);
      if (pluginsResult) return pluginsResult;
    }

    var basicResult = printBasicValue(val);
    if (basicResult) return basicResult;

    if (!indent) indent = createIndent(opts.indent);
    if (!refs) refs = [];
    return printComplexValue(val, indent, prevIndent, refs, opts.maxDepth, currentDepth, opts.plugins);
  }

  window.prettyFormat = prettyFormat;
})();
