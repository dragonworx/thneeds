import React from 'react'
import Store from '../store-lib'

class Overlay extends Store.Component {
  render() {
    if (!this.visible) {
      return null;
    }
    return (
      <div id="overlay">
        {this.props.children}
      </div>
    );
  }
}

Overlay.store = [{path:'visible.overlay', alias:'visible'}];

export default Overlay;