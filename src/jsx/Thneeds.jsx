import React from 'react'
import Store from '../store-lib'

class Thneeds extends Store.Component {
  constructor(props) {
    super(props);
    this.initStore(null, ['route']);
  }

  render() {
    return (
      <section id="thneeds" className={this.get('route') === 'thneeds' ? '' : 'hidden'}>
        <h1>Thneeds</h1>
      </section>
    );
  }
}

export default Thneeds;