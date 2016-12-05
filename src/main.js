//import './test-store'
import React from 'react'
import ReactDOM from 'react-dom'
import Store from './store-lib'
import App from './jsx/App.jsx'
import './actions'

const store = window.store = Store.instance();

store.set({
  user: {
    "id": 1,
    "name": "ali",
    "password": "snerf",
    "isAdmin": true,
    "createdAt": "2016-11-27T22:41:01.449Z",
    "updatedAt": "2016-11-27T22:41:01.449Z",
    "loginTime": 1480405504541
  },
  thneeds: [],
  edit: {
    isNew: false,
    thneed: null
  },
  settings: null,
  route: 'thneeds',
  visible: {
    overlay: false,
    spinner: false,
    labelPicker: false,
    saveSortChanges: false
  }
});

store.on('*', (e) => {
  console.log(`set: %c"${e.path}" = ${JSON.stringify(e.value)}`, 'color:blue');
});

ReactDOM.render(<App />, document.getElementById('main'));

store.do('init');