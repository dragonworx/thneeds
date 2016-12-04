import React from 'react'
import Store from '../store-lib'
import SaveSortChanges from './SaveSortChanges.jsx'

class Header extends Store.Component {
  render() {
    return (
      <header>
        <h1>Header</h1>
        <button onClick={this.action('addThneed')}>Add Thneed</button>
        <SaveSortChanges />
      </header>
    );
  }
}

Header.store = 'route';

export default Header;