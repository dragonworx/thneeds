import React from 'react'
import ReactDOM from 'react-dom'
import Axial from 'react-axial'
window.Axial = Axial;

//------------------------------------------------------------------------------------------ App Setup

/**
 * #define ListItem Interface
 */
const IListItem = Axial.define('IListItem', {
  text: Axial.String
});

/**
 * #define List Interface
 */
const IList = Axial.define('IList', {
  items: Axial.Array(IListItem),

  add: Axial.Function.extend({
    defaultValue: function () {
      this.items.push.apply(this.items, arguments);
    }
  })
});

const IList2 = IList.extend('IList2');

/**
 * #define App Interface
 */
let IApp = Axial.define('IApp', {
  foo: Axial.Boolean,
  message: Axial.String.orNull(),
  list: IList2
});

/**
 * #create instance of App Interface as app, use as main state (machine?)
 */
const app = IApp.new({
  foo: false,
  message: 'App',
  'list.items': [{text:'a'}, {text:'b'}]
});

// we can listen to when functions are called from/by instances
//app.list._.bind('add', e => {
//  debugger;
//  console.log('add was called with:', e.arguments);
//});

//------------------------------------------------------------------------------------------ React Setup
/**
 * #define List (React Component)
 */
class List extends Axial.Component {
  render () {
    return <ul>{app.list.items.map((item, i) => <li key={i}>Item "{item.text}"</li>)}</ul>
  }
}

/**
 * #define App (React Component)
 */
class App extends Axial.Component {
  render () {
    return (
      <div className="app">
        <h1>{app.foo ? app.message : '?'}</h1>
        <List></List>
      </div>
    )
  }
}

//------------------------------------------------------------------------------------------ Debug Render
//Axial.addDefaultLogListeners();
//Axial.Component.addDefaultLogListeners();
Axial.Component.debug = true;


//------------------------------------------------------------------------------------------ Start

// render to DOM
ReactDOM.render(<App />, document.getElementById('main'));

//console.log(app._.stringify(true));

// start changing values
app.message = null;
app.message = 'a';

let c = 0;
//setInterval(() => {
//  app.message = 'App' + c;
//  c++;
//  document.querySelector('.app').style.height = ((c * 50) > (window.innerHeight - 50) ? c = 1 : c * 50) + 'px';
//}, 1000);
//
//setTimeout(() => {
//  app.list.add({
//    text: 'b'
//  }, {
//    text: 'd'
//  });
//}, 2000);
//
//setTimeout(() => {
//  app.list.items.pop();
//  app.list.items[0].text = 'abc';
//}, 4000);
//
//setInterval(() => {
//  app.list.items.reverse();
//}, 5000);

window.app = app;

window._app = Axial.proxy(app).toPlainObject();
//console.log(_app);
_app.list.items[0].text = 'fred';
app.list = _app.list;
app.list.items[0].text = 'foo';
