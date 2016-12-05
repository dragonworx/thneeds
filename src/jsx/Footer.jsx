import React from 'react'
import Store from '../store-lib'

class Footer extends Store.Component {
  render() {
    return (
      <footer>
        <h1>Footer</h1>
        <button onClick={this.deferSet('route', 'settings')}>Settings</button>
        <button onClick={this.deferSet('route', 'thneeds')}>Thneeds</button>
      </footer>
    );
  }
}

Footer.store = 'route';

export default Footer;