import {View} from 'backbone';
import $ from 'jquery';

export default class ScrollSpy extends View {
  get el() {
    return $(document.body)
  }

  render() {
    this.$el.scrollspy({
      target: '.sidebar',
      offset: 50
    });

    return this;
  }
}