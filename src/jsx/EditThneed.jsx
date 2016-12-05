import React from 'react'
import Store from '../store-lib'

class EditThneed extends Store.Component {
  render() {
    if (this.route !== 'edit' || !this.edit.thneed) {
      return null;
    }
    return (
      <div id="editThneed">
        <h1>Edit {this.edit.isNew ? 'New' : 'Existing'} Thneed</h1>
        <p>
          <label>Title:</label> <input ref="title" type="text" defaultValue={this.edit.thneed.title} />
        </p>
        <p>
          <label>Amount:</label> <input ref="amount" type="text" defaultValue={this.edit.thneed.amount} />
        </p>
        <p>
          <label>Notes:</label> <input ref="notes" type="text" defaultValue={this.edit.thneed.notes} />
        </p>
        <p>
          <button id="labelEdit" className={this.edit.thneed.label} onClick={this.action('labelPicker.show')}></button>
        </p>
        <p>
          <button onClick={() => this.do('thneed.edit.save', this.ref('title'), this.ref('amount'), this.ref('notes'), this.get('edit.thneed.label'))}>Save</button>
          <button onClick={this.action('thneed.edit.cancel')}>Cancel</button>
        </p>
      </div>
    );
  }
}

EditThneed.store = ['route', 'edit'];

export default EditThneed;