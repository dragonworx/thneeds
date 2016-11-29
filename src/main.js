import React from 'react'
import ReactDOM from 'react-dom'
import Store from './store-lib'
import App from './jsx/App.jsx'
import axios from 'axios'

const store = Store.create({
  user: {
    "id": 1,
    "name": "ali",
    "password": "snerf",
    "isAdmin": true,
    "createdAt": "2016-11-27T22:41:01.449Z",
    "updatedAt": "2016-11-27T22:41:01.449Z",
    "loginTime": 1480405504541
  },
  account: {
    description: null,
    amount: null
  },
  settings: null,
  route: 'settings'
});

window.Store = Store;

axios.get('/api/init').then(res => {
  store.set('settings', res.data[0]);
  ReactDOM.render(<App />, document.getElementById('main'));
  setTimeout(() => store.set('route', 'thneeds'), 2000);
});