import {View} from 'backbone';
import $ from 'jquery';
import _ from 'lodash';

export default class Sidebar extends View {
  get el() {
    return $('.sidebar');
  }

  render() {
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
  }

  collectHeadings() {
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
  }

  renderHeadings(headings) {
    var template = '';
    _.each(headings, function(heading) {
      template += `<li><a href="#${heading.id}">${heading.text}</a>`;
      if (heading.children.length) {
        template += `<ul class="nav">${this.renderHeadings(heading.children)}</ul>`;
      }
      template += '</li>';
    }, this);
    return template;
  }

  calculateTop() {
    let offsetTop = this.$el.offset().top;
    let navbarOuterHeight = $('.navbar').height();
    let sidebarMargin = parseInt(this.$el.children(0).css('margin-top'), 10);

    return offsetTop - navbarOuterHeight - sidebarMargin;
  }

  calculateBottom() {
    return $('.footer').outerHeight(true);
  }
}