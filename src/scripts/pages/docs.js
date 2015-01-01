import {View} from 'backbone';
import $ from 'jquery';
import ScrollSpy from '../components/scrollspy';
import Sidebar from '../components/sidebar';

export default class Docs extends View {
  get el() {
    return $(document.body);
  }

  render() {
    this.sidebar = new Sidebar({ el: this.$('.sidebar') }).render();
    this.scrollspy = new ScrollSpy({ el: this.$el }).render();
    return this;
  }
}