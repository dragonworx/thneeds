import React from 'react'
import Store from '../store-lib'

class Login extends Store.Component {
  login(e) {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    postJSON('/api/login', {
      username: username,
      password: password
    }).then(res => {
      let user = res.data;
      user.loginTime = new Date().getTime();
      this.user = user;
    }).catch((err) => {
      // TODO: handle network error...
      debugger;
    });
    e.preventDefault();
  }

  render() {
    if (this.route !== 'login') {
      return null;
    }
    return (
      <form className="login">
        <fieldset>
          <legend>Login</legend>
          <p>
            <label>username: <input ref="username" type="text" defaultValue="ali" /></label>
          </p>
          <p>
            <label>password: <input ref="password" type="password" defaultValue="snerf" /></label>
          </p>
          <p>
            <button onClick={this.login.bind(this)}>Login</button>
          </p>
        </fieldset>
      </form>
    );
  }
}

Login.store = ['route', 'user'];

export default Login;