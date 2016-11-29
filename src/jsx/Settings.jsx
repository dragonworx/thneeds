import React from 'react'
import Store from '../store-lib'

class Settings extends Store.Component {
  constructor(props) {
    super(props);
    this.initStore('settings', ['route']);
  }

  render() {
    return (
      <section id="settings" className={this.get('route') === 'settings' ? '' : 'hidden'}>
        <fieldset>
          <legend>Settings</legend>
          <p>
            <label>Account Description:</label> <input type="text" defaultValue={this.data.accountDescription} />
          </p>
          <p>
            <label>Account Amount:</label> <input type="text" defaultValue={this.data.accountAmount} />
          </p>
          <p>
            <label>Budget Amount:</label> <input type="text" defaultValue={this.data.budgetAmount} />
          </p>
          <p>
            <label>Budget Frequency:</label>
            <select ref="frequency" defaultValue={this.data.budgetFrequency}>
              <option>Weekly</option>
              <option>Fortnightly</option>
              <option>Monthly</option>
              <option></option>
            </select>
          </p>
        </fieldset>
      </section>
    );
  }
}

export default Settings;