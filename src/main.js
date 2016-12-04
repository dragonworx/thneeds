import React from 'react'
import ReactDOM from 'react-dom'
import Store from './store-lib'
import App from './jsx/App.jsx'
import './actions'

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
  thneeds: [],
  editThneed: {
    isNew: false,
    thneed: null
  },
  settings: null,
  route: 'thneeds',
  ui: {
    showOverlay: false,
    isLoading: false,
    showLabelPicker: false,
    saveSortChanges: false
  }
});

store.log((e) => {
  console.log(e);
});

window.store = store;

ReactDOM.render(<App />, document.getElementById('main'));

store.do('getJSON', '/api/init').then(res => {
  store.set({
    'settings': res.data.settings,
    'thneeds': res.data.thneeds
  });
}).catch(err => {
  // TODO: handle network error...
  console.error(err.stack);
});