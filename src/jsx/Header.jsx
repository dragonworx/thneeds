import React from 'react'
import Store from '../store-lib'

class Header extends Store.Component {
  constructor(props) {
    super(props);
//    this.initStore('header.expanded');
  }

  render() {
    return (
      <header>
        <h1>Header</h1>
      </header>
    );
  }
}

export default Header;