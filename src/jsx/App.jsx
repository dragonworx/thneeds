import React from 'react'
import Axial from 'react-axial'
import Login from './Login.jsx'
import Layout from './Layout.jsx'
import Overlay from './Overlay.jsx'
import Spinner from './Spinner.jsx'
import LabelPicker from './LabelPicker.jsx'
import Purchase from './Purchase.jsx'

class App extends Axial.Component {
  render() {
    return (
      <div id="foo">
        <Login />
        <Layout />
        <Overlay>
          <LabelPicker />
          <Purchase />
          <Spinner />
        </Overlay>
      </div>
    );
  }
}

App.bind('route');

export default App;