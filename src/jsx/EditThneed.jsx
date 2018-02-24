import React from 'react'
import Axial from 'react-axial'

class EditThneed extends Axial.Component {
  render() {
    return (
      <Axial.Div when={this.route === 'edit' && this.edit.thneed} id="editThneed">
        <h1>Edit {this.edit.isNew ? 'New' : 'Existing'} Thneed</h1>
        <p>
          <label>Title:</label> <input ref="title" type="text" defaultValue={this.title} />
        </p>
        <p>
          <label>Amount:</label> <input ref="amount" type="text" defaultValue={this.amount} />
          <Axial.Span when={this.errors.thneedAmount} className="error-validation">Must be a currency value</Axial.Span>
        </p>
        <p>
          <label>Notes:</label> <input ref="notes" type="text" defaultValue={this.notes} />
        </p>
        <p>
          <button id="labelEdit" className={this.label} onClick={() => this.call.labelPicker.show()}></button>
        </p>
        <p>
          <button onClick={() => this.call.thneed.edit.save(this.ref('title'), this.refNum('amount'), this.ref('notes'), this.get('edit.thneed.label'))}>Save</button>
          <button onClick={() => this.call.thneed.edit.cancel()}>Cancel</button>
        </p>
      </Axial.Div>
    );
  }
}

EditThneed.bind('route', 'edit', 'edit.thneed.title', 'edit.thneed.amount', 'edit.thneed.notes', 'edit.thneed.label', 'errors');

export default EditThneed;