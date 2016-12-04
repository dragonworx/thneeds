import React from 'react'

class Thneed extends React.Component {
  render() {
    const thneed = this.props.thneed;
    return (
      <div className={`thneed ${thneed.label}`}>
        <span>{`#${thneed.id}: ${thneed.title}`}</span>
        <button onClick={() => this.props.onMoveUp()}>Up</button>
        <button onClick={() => this.props.onMoveDown()}>Down</button>
        <button onClick={() => this.props.onDelete()}>Delete</button>
      </div>
    );
  }
}

export default Thneed;