import React from 'react'
import Store from '../store-lib'

class Footer extends Store.Component {
  constructor(props) {
    super(props);
//    this.initStore('header.expanded');
  }

  render() {
    return (
      <footer>
        <h1>Footer</h1>
      </footer>
    );
  }
}

export default Footer;