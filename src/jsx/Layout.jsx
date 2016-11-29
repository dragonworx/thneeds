import React from 'react'
import Store from '../store-lib'
import Header from './Header.jsx'
import Thneeds from './Thneeds.jsx'
import Settings from './Settings.jsx'
import Footer from './Footer.jsx'

class Layout extends Store.Component {
  constructor(props) {
    super(props);
//    this.initStore();
  }

  render() {
    return (
      <div id="layout">
        <h1>Layout</h1>
        <Header />
        <Thneeds />
        <Settings />
        <Footer />
      </div>
    );
  }
}

export default Layout;