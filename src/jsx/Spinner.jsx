import React from 'react'
import Store from '../store-lib'

class Spinner extends Store.Component {
  render() {
    if (!this.isLoading) {
      return null;
    }
    return (
      <div id="spinner">Loading...</div>
    );
  }
}

Spinner.store = 'ui.isLoading';

export default Spinner;