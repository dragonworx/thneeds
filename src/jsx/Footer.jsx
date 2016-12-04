import React from 'react'
import Store from '../store-lib'

class Footer extends Store.Component {
  render() {
    return (
      <footer>
        <h1>Footer</h1>
        <button onClick={this.handler('route', 'settings')}>Settings</button>
        <button onClick={this.handler('route', 'thneeds')}>Thneeds</button>
      </footer>
    );
  }
}

Footer.store = 'route';

export default Footer;