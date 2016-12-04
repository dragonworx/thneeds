import React from 'react'
import Store from '../store-lib'
import Thneed from './Thneed.jsx'

class Thneeds extends Store.Component {
  moveUp(thneed) {
    let thneeds = this.thneeds;
    const index = thneeds.indexOf(thneed);
    if (index === 0) {
      console.log("nope");
      return;
    }
    thneeds.splice(index, 1);
    thneeds.splice(index - 1, 0, thneed);
    this.thneeds = thneeds;
    this.set('ui.saveSortChanges', true);
  }

  moveDown(thneed) {
    let thneeds = this.thneeds;
    const index = thneeds.indexOf(thneed);
    if (index === thneeds.length - 1) {
      console.log("nope");
      return;
    }
    thneeds.splice(index, 1);
    thneeds.splice(index + 1, 0, thneed);
    this.thneeds = thneeds;
    this.set('ui.saveSortChanges', true);
  }

  delete(thneed) {
    let thneeds = this.thneeds;
    const index = thneeds.indexOf(thneed);
    thneeds.splice(index, 1);
    this.thneeds = thneeds;
    this.set('ui.saveSortChanges', true);
  }

  render() {
    if (this.route !== 'thneeds') {
      return null;
    }
    return (
      <section id="thneeds">
        <h1>Thneeds</h1>
        <div className="thneed-list">
          {this.thneeds.map(thneed => <Thneed key={`thneed${thneed.id}`}
                                                      thneed={thneed}
                                                      onMoveUp={this.moveUp.bind(this, thneed)}
                                                      onMoveDown={this.moveDown.bind(this, thneed)}
                                                      onDelete={this.delete.bind(this, thneed)}></Thneed>)}
        </div>
      </section>
    );
  }
}

Thneeds.store = ['route', 'thneeds'];

export default Thneeds;