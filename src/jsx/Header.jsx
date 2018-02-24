import React from 'react'
import Axial from 'react-axial'

class Header extends Axial.Component {
  render() {
    return (
      <header>
        <h1>Header</h1>
        <p>{this.test}</p>
        <Axial.Button when={this.route === 'thneeds'} onClick={() => this.call.thneed.add()}>Add Thneed</Axial.Button>
        <button onClick={() => this.test = '123'}>Test</button>
      </header>
    );
  }
}

Header.bind(
  'route',
  'user.id',
  {
    alias: 'test',
    get: function () {
      return '#' + this.get('user.id')
    },
    set: function (value) {
      this.set('user.id', value);
    }
  }
);

export default Header;