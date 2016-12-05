import React from 'react'
import Store from '../store-lib'

class LabelPicker extends Store.Component {
  select(label) {
    this.set('edit.thneed.label', label);
    this.do('labelPicker.hide');
  }

  render() {
    if (!this.labelPicker) {
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

LabelPicker.store = 'visible.labelPicker';

export default LabelPicker;