import React from 'react'
import ReactDOM from 'react-dom'
import Store from '../store-lib'
import Login from './Login.jsx'
import Layout from './Layout.jsx'

class App extends Store.Component {
  constructor(props) {
    super(props);
//    this.initStore('route');
    this.bind('route');
  }

  render() {
    let content = [];
    if (this.get('route') === 'login') {
      content.push(<Login key="login" />);
    } else {
      content.push(<Layout key="layout" />);
    }
    return (
      <div id="app">
        {content}
      </div>
    );
  }
}

export default App;