import React from 'react'
import Axial from 'react-axial'

class Footer extends Axial.Component {
  render() {
    return (
      <footer>
        <h1>Footer</h1>
        {
          this.get('user.isAdmin')
          ? <Axial.Button when={this.route !== 'settings'} onClick={() => this.route = 'settings'}>Settings</Axial.Button>
            : null
        }
        <Axial.Button when={this.route !== 'thneeds'} onClick={() => this.route = 'thneeds'}>Thneeds</Axial.Button>
      </footer>
    );
  }
}

Footer.bind('route');

export default Footer;