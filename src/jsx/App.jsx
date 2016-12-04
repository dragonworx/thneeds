import React from 'react'
import Store from '../store-lib'
import Login from './Login.jsx'
import Layout from './Layout.jsx'
import Overlay from './Overlay.jsx'
import Spinner from './Spinner.jsx'
import LabelPicker from './LabelPicker.jsx'

class App extends Store.Component {
  render() {
    return (
      <div id="app">
        <Login />
        <Layout />
        <Overlay>
          <LabelPicker />
          <Spinner />
        </Overlay>
      </div>
    );
  }
}

App.store = 'route';

export default App;