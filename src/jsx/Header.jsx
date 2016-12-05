import React from 'react'
import Store from '../store-lib'

class Header extends Store.Component {
  render() {
    return (
      <header>
        <h1>Header</h1>
        <button onClick={this.action('thneed.add')}>Add Thneed</button>
      </header>
    );
  }
}

Header.store = 'route';

export default Header;