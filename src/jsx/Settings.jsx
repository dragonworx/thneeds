import React from 'react'
import Axial from 'react-axial'

class Settings extends Axial.Component {
  render() {
    return (
      <Axial.Section when={this.route === 'settings'} id="settings">
        <fieldset>
          <legend>Settings</legend>
          <p>
            <label>Account Description:</label> <input ref="accountDescription" type="text" defaultValue={this.accountDescription} />
          </p>
          <p>
            <label>Account Amount:</label> <input ref="accountAmount" type="text" defaultValue={this.accountAmount} />
            <Axial.Span when={this.errors.accountAmount} className="error-validation">Must be a currency value</Axial.Span>
          </p>
          <p>
            <label>Budget Amount:</label> <input ref="budgetAmount" type="text" defaultValue={this.budgetAmount} />
            <Axial.Span when={this.errors.budgetAmount} className="error-validation">Must be a currency value</Axial.Span>
          </p>
          <p>
            <label>Budget Frequency:</label>
            <select ref="budgetFrequency" defaultValue={this.budgetFrequency}>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
            </select>
          </p>
          <p>
            <label>Budget Occurence:</label>
            <select ref="budgetOccurence" defaultValue={this.budgetOccurence}>
              <option value="start">Start</option>
              <option value="end">End</option>
            </select>
          </p>
          <p>
            <button onClick={() => this.call.settings.save(this.ref('accountDescription'), this.refNum('accountAmount'), this.refNum('budgetAmount'), this.ref('budgetFrequency'), this.ref('budgetOccurence'))}>Save</button>
            <button onClick={() => this.route = 'thneeds'}>Cancel</button>
          </p>
        </fieldset>
      </Axial.Section>
    );
  }
}

Settings.bind(
  'route',
  'settings',
  'settings.accountDescription',
  'settings.accountAmount',
  'settings.budgetAmount',
  'settings.budgetFrequency',
  'settings.budgetOccurence',
  'errors'
);

export default Settings;