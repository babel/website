var BABEL_MINI_REPL = (function() {
  var miniReplExamples = [
    '[1, 2, 3].map(n => n + 1);',
    'var [a, ,b] = [1,2,3];',
    'function f(x, y = 12) {\n  return x + y;\n}',
    'const x = {\n  ["i" + bar]: 5,\n};',
    'async function foo() {\n  await bar();\n}',
    'let yourTurn = "Type some code in here!"',
  ];

  var inEditor;
  var outEditor;

  var runDemo = true;

  var debouncedUpdate = _.debounce(function() {
    compileCode(inEditor, outEditor);
  }, 500);

  function setupEditor(id, readOnly) {
    var editor = ace.edit(id);

    editor.setOptions({
      // editor
      highlightActiveLine: false,
      readOnly: !!readOnly,

      // renderer
      fontSize: '1.5rem',
      highlightGutterLine: false,
      showGutter: false,
      showLineNumbers: false,
      theme: 'ace/theme/tomorrow_night',

      // session
      mode: 'ace/mode/javascript',
      tabSize: 2,
      useSoftTabs: true,
      useWorker: false,
      wrap: false,
    });

    editor.renderer.setPadding(24);
    editor.commands.removeCommands(['gotoline', 'find']);

    return editor;
  }

  function simulateKeys(inEditor, outEditor, texts) {
    var textIndex = 0;
    var charIndex = 0;
    var timeout;

    function simulateKey(changingText) {
      var delay = changingText
        ? 6000
        : Math.round(Math.random() * 250) + 30;

      timeout = setTimeout(function() {
        if (!runDemo) {
          if (timeout) {
            clearTimeout(timeout);
          }
          return;
        }

        var text = texts[textIndex];

        charIndex++;

        inEditor.setValue(
          text.substring(0, charIndex),
          1
        );

        if (charIndex < text.length) {
          simulateKey();
        } else if (
          (charIndex === text.length) &&
          (textIndex < texts.length - 1)
        ) {
          textIndex++;
          charIndex = 0;
          simulateKey(true);
        } else {
          inEditor.selection.selectAll();
          inEditor.setReadOnly(false);
          clearTimeout(timeout);
        }
      }, delay);
    }

    simulateKey();
  }

  function compileCode(sourceEditor, targetEditor) {
    var transformed;

    try {
      transformed = Babel.transform(sourceEditor.getValue(), {
        presets: ['latest'],
        filename: 'repl',
        babelrc: false,
      });
    } catch (e) {
      transformed = {
        code: e.message,
      };
    }

    targetEditor.setValue(
      // Remove 'use strict' just for demonstration purposes
      transformed.code.replace(/[\'|\"]use strict[\'|\"];(\n\n)?/g, ''),
      -1
    );
  }

  return {
    start: function() {
      inEditor = setupEditor('hero-repl-in', true);

      outEditor = setupEditor('hero-repl-out', true);
      outEditor.renderer.$cursorLayer.element.style.display = "none"

      inEditor.on('change', function(e) {
        if (!inEditor.getValue()) {
          debouncedUpdate.cancel();
          outEditor.setValue('');
        }

        debouncedUpdate();
      });

      $('#hero-repl-in').on('click', function() {
        if (runDemo) {
          BABEL_MINI_REPL.stopDemo();
        }
      });

      setTimeout(function() {
        $('.hero-repl').addClass('hero-repl--visible');
        simulateKeys(inEditor, outEditor, miniReplExamples);
      }, 150);
    },

    stopDemo: function() {
      debouncedUpdate.cancel();
      runDemo = false;
      inEditor.setReadOnly(false);
      inEditor.setValue('');
      outEditor.setValue('');
    },
  };
})();

$(document).ready(function() {
  BABEL_MINI_REPL.start();

  $('.babel-slider').slick({
    lazyLoad: 'ondemand',
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
});
