import React from 'react'
import Store from '../store-lib'
import Thneed from './Thneed.jsx'

class Thneeds extends Store.Component {
  render() {
    if (this.route !== 'thneeds') {
      return null;
    }
    return (
      <section id="thneeds">
        <h1>Thneeds</h1>
        <div className="thneed-list">
          {this.thneeds.map(thneed => <Thneed key={`thneed${thneed.id}`} thneed={thneed}></Thneed>)}
        </div>
      </section>
    );
  }
}

Thneeds.store = ['route', 'thneeds'];

export default Thneeds;