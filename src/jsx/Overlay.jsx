import React from 'react'
import Axial from 'react-axial'

class Overlay extends Axial.Component {
  render() {
    return (
      <Axial.Div when={this.visible} id="overlay" onClick={() => this.call.overlay.hide()}>
        {this.props.children}
      </Axial.Div>
    );
  }
}

Overlay.bind({path: 'visible.overlay', alias: 'visible'});

export default Overlay;