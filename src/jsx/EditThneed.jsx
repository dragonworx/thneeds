import React from 'react'
import Store from '../store-lib'

class EditThneed extends Store.Component {
  val(name) {
    return this.refs[name].value;
  }

  render() {
    if (this.route !== 'editThneed' || this.editThneed.thneed === null) {
      return null;
    }
    return (
      <div id="editThneed">
        <h1>Edit {this.editThneed.isNew ? 'New' : 'Existing'} Thneed</h1>
        <p>
          <label>Title:</label> <input ref="title" type="text" defaultValue={this.editThneed.thneed.title} />
        </p>
        <p>
          <label>Amount:</label> <input ref="amount" type="text" defaultValue={this.editThneed.thneed.amount} />
        </p>
        <p>
          <label>Notes:</label> <input ref="notes" type="text" defaultValue={this.editThneed.thneed.notes} />
        </p>
        <p>
          <button id="labelEdit" className={this.editThneed.thneed.label} onClick={this.action('showLabelPicker')}></button>
        </p>
        <p>
          <button onClick={() => this.do('saveEditThneed', this.val('title'), this.val('amount'), this.val('notes'), this.val('label'))}>Save</button>
          <button onClick={() => this.do('cancelEditThneed')}>Cancel</button>
        </p>
      </div>
    );
  }
}

EditThneed.store = ['route', 'editThneed'];

export default EditThneed;