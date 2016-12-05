import React from 'react'
import Store from '../store-lib'

class Settings extends Store.Component {
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
            <button onClick={() => this.do('settings.save', this.ref('accountDescription'), this.refNum('accountAmount'), this.refNum('budgetAmount'), this.ref('budgetFrequency'))}>Save</button>
            <button onClick={this.deferSet('route', 'thneeds')}>Cancel</button>
          </p>
        </fieldset>
      </section>
    );
  }
}

Settings.store = ['route', 'settings'];

export default Settings;