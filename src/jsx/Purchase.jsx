import React from 'react'
import Axial from 'react-axial'

class Purchase extends Axial.Component {
  render() {
    return (
      <Axial.Div when={this.visible} id="purchase">
        Are you sure?
        <button onClick={() => this.call.thneed.confirmPurchase()}>Yes</button>
        <button onClick={() => this.call.thneed.closePurchase()}>No</button>
      </Axial.Div>
    );
  }
}

Purchase.bind({path: 'visible.purchase', alias: 'visible'});

export default Purchase;