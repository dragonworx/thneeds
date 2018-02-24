import React from 'react'
import Axial from 'react-axial'

class Login extends Axial.Component {
  render() {
    return (
      <Axial.Form when={this.route === 'login'} className="login">
        <fieldset>
          <legend>Login</legend>
          <p>
            <label>username: <input ref="username" type="text" defaultValue="ali" /></label>
          </p>
          <p>
            <label>password: <input ref="password" type="password" defaultValue="snerf" /></label>
          </p>
          <p>
            <button onClick={() => this.call.login(this.ref('username'), this.ref('password'))}>Login</button>
          </p>
        </fieldset>
      </Axial.Form>
    );
  }
}

Login.bind('route', 'user');

export default Login;