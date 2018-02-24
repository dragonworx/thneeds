import React from 'react'
import Axial from 'react-axial'

class Spinner extends Axial.Component {
  render() {
    return (
      <Axial.Div when={this.visible} id="spinner">Loading...</Axial.Div>
    );
  }
}

Spinner.bind({path: 'visible.spinner', alias: 'visible'});

export default Spinner;