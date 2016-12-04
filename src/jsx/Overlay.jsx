import React from 'react'
import Store from '../store-lib'

class Overlay extends Store.Component {
  render() {
    if (!this.showOverlay) {
      return null;
    }
    return (
      <div id="overlay">
        {this.props.children}
      </div>
    );
  }
}

Overlay.store = 'ui.showOverlay';

export default Overlay;