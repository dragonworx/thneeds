import React from 'react'
import Store from '../store-lib'

class Spinner extends Store.Component {
  render() {
    if (!this.visible) {
      return null;
    }
    return (
      <div id="spinner">Loading...</div>
    );
  }
}

Spinner.store = [{path:'visible.spinner', alias:'visible'}];

export default Spinner;