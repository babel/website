(function() {

  var Sidebar = Backbone.View.extend({
    el: '.sidebar',

    initialize: function() {
      this.render();
    },

    render: function() {
      var headings = this.collectHeadings();
      var template = this.renderHeadings(headings);

      this.$('.nav').html(template);

      this.$el.affix({
        offset: {
          top: _.memoize(_.bind(this.calculateTop, this)),
          bottom: _.memoize(_.bind(this.calculateBottom, this))
        }
      });

      return this;
    },

    collectHeadings: function() {
      var headings = [];
      var current;

      $('h2, h3').each(function(index, heading) {
        var value = {
          id: heading.id,
          text: heading.textContent,
          children: []
        };

        if (heading.tagName.toUpperCase() === 'H2') {
          headings.push(value);
          current = value;
        } else {
          current.children.push(value);
        }
      });

      return headings;
    },

    renderHeadings: function(headings) {
      var template = '';

      _.each(headings, function(heading) {
        template += '<li><a href="#' + heading.id + '">' + heading.text + '</a>';

        if (heading.children.length) {
          template += '<ul class="nav">';
          template += this.renderHeadings(heading.children);
          template += '</ul>';
        }

        template += '</li>';
      }, this);

      return template;
    },

    calculateTop: function() {
      var offsetTop = this.$el.offset().top;
      var navbarOuterHeight = $('.navbar').height();
      var sidebarMargin = parseInt(this.$el.children(0).css('margin-top'), 10);

      return offsetTop - navbarOuterHeight - sidebarMargin;
    },

    calculateBottom: function() {
      return $('.footer').outerHeight(true);
    }
  });

  var ScrollSpy = Backbone.View.extend({
    el: document.body,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.scrollspy({
        target: '.sidebar',
        offset: 50
      });
      return this;
    }
  });

  var Toolbar = Backbone.View.extend({
    initialize: function(options) {
      this.settings = new Backbone.Model(options.settings || {
        experimental : 'true',
        playground   : 'true'
      });
    },

    render: function() {
      this.ui = {
        experimental : this.$('#experimental'),
        playground   : this.$('#playground')
      };
      this.deserialize();
      return this;
    },

    events: {
      'change input': 'serialize'
    },

    deserialize: function() {
      this.ui.experimental.prop('checked', this.settings.get('experimental') === 'true');
      this.ui.playground.prop('checked', this.settings.get('playground') === 'true');
    },

    serialize: function() {
      this.settings.set('experimental', this.ui.experimental.prop('checked').toString());
      this.settings.set('playground', this.ui.playground.prop('checked').toString());
    }
  });

  var Editor = Backbone.View.extend({
    render: function() {
      this.editor = ace.edit(this.$el[0]);
      this.renderer = this.editor.renderer;
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

      return this;
    },

    setReadOnly: function() {
      this.editor.setReadOnly(true);
      this.editor.setHighlightActiveLine(false);
      this.editor.setHighlightGutterLine(false);
    },

    getHeight: function() {
      return this.renderer.lineHeight * this.document.getLength();
    }
  });

  var Index = Backbone.View.extend({
    el: document.body,

    initialize: function() {
      this.render();
    }
  });

  var Docs = Backbone.View.extend({
    el: document.body,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.sidebar = new Sidebar();
      this.scrollspy = new ScrollSpy();
      return this;
    }
  });

  var Repl = Backbone.View.extend({
    el: document.body,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.toolbar = new Toolbar({
        el: this.$('.repl-options'),
        settings: this._getHash()
      }).render();

      this.listenTo(this.toolbar.settings, 'change', function() {
        this._updateHash();
      });

      this.input = new Editor({
        el: this.$('.repl-input .editor')
      }).render();

      this.output = new Editor({
        el: this.$('.repl-output .editor')
      }).render();

      this.output.setReadOnly();

      this.input.on('change', this._updateCode);

      return this;
    },

    _getHash: function() {
      var hash = Backbone.history.getHash().replace(/^\?/, '').split('&');
      return _.transform(hash, function(accumulator, item) {
        var parts = item.split('=');
        accumulator[parts[0]] = decodeURIComponent(parts[1]);
      }, {});
    },

    _updateHash: function() {
      var query = _.map(this.toolbar.settings.attributes, function(value, name) {
        return name + '=' + value;
      });
      query.push('code=' + encodeURIComponent(this.input.editor.getValue()));
      Backbone.history._updateHash(Backbone.history.location, '?' + query.join('&'), true);
    },

    _updateCode: function() {

    }
  });

  var Router = Backbone.Router.extend({
    routes: {
      '6to5.github.io'             : 'index',
      '6to5.github.io/repl/'       : 'repl',
      '6to5.github.io/docs/:name/' : 'docs'
    },

    index: function() {
      new Index();
    },

    repl: function() {
      new Repl();
    },

    docs: function() {
      new Docs();
    }
  });

  var router = new Router();

  $(function() {
    Backbone.history.start({ pushState: true });
  });

}());
