import React from 'react'
import Axial from 'react-axial'
import Thneed from './Thneed.jsx'

class Thneeds extends Axial.Component {
  render() {
    return (
      <Axial.Section when={this.route === 'thneeds'} id="thneeds">
        <h1>Thneeds</h1>
        <div className="thneed-list">
          {this.thneeds.map(thneed => <Thneed key={`thneed${thneed.id}`} thneed={thneed}></Thneed>)}
        </div>
      </Axial.Section>
    );
  }
}

Thneeds.bind('route', 'thneeds');

export default Thneeds;