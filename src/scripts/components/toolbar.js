import {View, Model} from 'backbone';

export default class Toolbar extends View {
  initialize(options = {}) {
    this.settings = new Model(options.settings || {
      experimental : 'true',
      playground   : 'true'
    });
  }

  render() {
    this.ui = {
      experimental : this.$('#experimental'),
      playground   : this.$('#playground')
    };
    this.deserialize();
    return this;
  }

  get events() {
    return {
      'change input': 'serialize'
    };
  }

  deserialize() {
    this.ui.experimental.prop('checked', this.settings.get('experimental') === 'true');
    this.ui.playground.prop('checked', this.settings.get('playground') === 'true');
  }

  serialize() {
    this.settings.set('experimental', this.ui.experimental.prop('checked').toString());
    this.settings.set('playground', this.ui.playground.prop('checked').toString());
  }
}