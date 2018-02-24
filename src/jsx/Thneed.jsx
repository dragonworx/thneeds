import React from 'react'
import Axial from 'react-axial'

class Thneed extends Axial.Component {
  render() {
    const thneed = this.props.thneed;
    return (
      <div className={`thneed ${thneed.label}`}>
        <span>{`#${thneed.id}: ${thneed.title} $${thneed.amount}`}</span>
        <button onClick={() => this.call.thneed.moveUp(thneed)}>Up</button>
        <button onClick={() => this.call.thneed.moveDown(thneed)}>Down</button>
        <button onClick={() => this.call.thneed.edit.open(thneed)}>Edit</button>
        {
          this.get('user.isAdmin')
          ? <button onClick={() => this.call.thneed.confirmDelete(thneed)}>Delete</button>
            : null
        }
        <button onClick={() => this.call.thneed.showPurchase(thneed)}>Purchase</button>
        <div className={`confirm-delete ${this.get('deleteThneed.id') === thneed.id ? 'show' : 'hide'}`}>
          <span>Are you sure?</span>
          <button onClick={() => this.call.thneed.applyConfirmDelete()}>Yes</button>
          <button onClick={() => this.call.thneed.cancelConfirmDelete()}>Cancel</button>
        </div>
      </div>
    );
  }
}

Thneed.bind('deleteThneed');

export default Thneed;