import React from 'react'
import Store from '../store-lib'
import Header from './Header.jsx'
import Thneeds from './Thneeds.jsx'
import EditThneed from './EditThneed.jsx'
import Settings from './Settings.jsx'
import Footer from './Footer.jsx'

class Layout extends Store.Component {
  render() {
    if (this.route === 'login') {
      return null;
    }
    return (
      <div id="layout">
        <h1>Layout</h1>
        <Header />
        <Thneeds />
        <EditThneed />
        <Settings />
        <Footer />
      </div>
    );
  }
}

Layout.store = 'route';

export default Layout;