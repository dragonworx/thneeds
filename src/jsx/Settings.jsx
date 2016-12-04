import React from 'react'
import Store from '../store-lib'

class Settings extends Store.Component {
  save() {
    this.settings.accountDescription = this.refs.accountDescription.value;
    this.settings.accountAmount = this.refs.accountAmount.value;
    this.settings.budgetAmount = this.refs.budgetAmount.value;
    this.settings.budgetFrequency = this.refs.budgetFrequency.value;
    postJSON('/api/saveSettings', this.settings).then(res => {
      if (res.data.success) {
        this.route = 'thneeds';
      } else {
        // TODO: handle error?
      }
    });
  }

  cancel() {
    this.route = 'thneeds';
  }

  render() {
    if (this.route !== 'settings') {
      return null;
    }
    return (
      <section id="settings">
        <fieldset>
          <legend>Settings</legend>
          <p>
            <label>Account Description:</label> <input ref="accountDescription" type="text" defaultValue={this.settings.accountDescription} />
          </p>
          <p>
            <label>Account Amount:</label> <input ref="accountAmount" type="text" defaultValue={this.settings.accountAmount} />
          </p>
          <p>
            <label>Budget Amount:</label> <input ref="budgetAmount" type="text" defaultValue={this.settings.budgetAmount} />
          </p>
          <p>
            <label>Budget Frequency:</label>
            <select ref="budgetFrequency" defaultValue={this.settings.budgetFrequency}>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
            </select>
          </p>
          <p>
            <button onClick={this.save.bind(this)}>Save</button>
            <button onClick={this.cancel.bind(this)}>Cancel</button>
          </p>
        </fieldset>
      </section>
    );
  }
}

Settings.store = ['route', 'settings'];

export default Settings;