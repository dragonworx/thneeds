import React from 'react'
import Store from '../store-lib'

class SaveSortChanges extends Store.Component {
  saveChanges() {
    postJSON('/api/saveThneeds', {thneeds: this.get('thneeds')}).then(res => {
      console.log(res);
    });
  }

  render() {
    if (!this.saveSortChanges) {
      return null;
    }
    return (
      <button onClick={this.saveChanges.bind(this)}>Save</button>
    );
  }
}

SaveSortChanges.store = 'ui.saveSortChanges';

export default SaveSortChanges;