import React from 'react'
import Axial from 'react-axial'
import Header from './Header.jsx'
import Thneeds from './Thneeds.jsx'
import EditThneed from './EditThneed.jsx'
import Settings from './Settings.jsx'
import Footer from './Footer.jsx'

class Layout extends Axial.Component {
  render() {
    return (
      <Axial.Div when={this.route !== 'login'} id="layout">
        <h1>Layout</h1>
        <Header />
        <Thneeds />
        <EditThneed />
        <Settings />
        <Footer />
      </Axial.Div>
    );
  }
}

Layout.bind('route');

export default Layout;