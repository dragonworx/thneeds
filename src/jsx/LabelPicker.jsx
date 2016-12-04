import React from 'react'
import Store from '../store-lib'

class LabelPicker extends Store.Component {
  select(label) {
    this.set('editThneed.thneed.label', label);
    showLabelPicker(false);
  }

  render() {
    if (!this.showLabelPicker) {
      return null;
    }
    return (
      <div id="labelPicker">
        {
          ['default', 'red', 'green', 'blue'].map(label => <div key={`label${label}`} className={`label ${label}`} onClick={this.select.bind(this, label)}></div>)
        }
      </div>
    );
  }
}

LabelPicker.store = 'ui.showLabelPicker';

export default LabelPicker;