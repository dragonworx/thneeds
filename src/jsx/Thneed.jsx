import React from 'react'
import Store from '../store-lib'

class Thneed extends Store.Component {
  render() {
    const thneed = this.props.thneed;
    return (
      <div className={`thneed ${thneed.label}`}>
        <span>{`#${thneed.id}: ${thneed.title}`}</span>
        <button onClick={this.action('thneed.moveUp', thneed)}>Up</button>
        <button onClick={this.action('thneed.moveDown', thneed)}>Down</button>
        <button onClick={this.action('thneed.delete', thneed)}>Delete</button>
      </div>
    );
  }
}

export default Thneed;