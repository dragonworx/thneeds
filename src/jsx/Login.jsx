import React from 'react'
import Store from '../store-lib'
import axios from 'axios'

class Login extends Store.Component {
  constructor(props) {
    super(props);
    this.initStore('user');
  }

  login(e) {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('/api/login', {
      username: username,
      password: password
    }).then(res => {
      let user = res.data;
      user.loginTime = new Date().getTime();
      console.log('user:', user);
      this.set('user', user);
    }).catch((err) => {
      debugger;
    });
    e.preventDefault();
  }

  render() {
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

export default Login;