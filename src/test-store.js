import store from './store-lib'

window.store = store;

store.on('c.d', (e) => {
  console.log('set:', e);
});

store.set({
  a: 1,
  b: 2,
  c: {
    d: {
      e: 3,
      x: {
        y: 'b'
      }
    },
    f: [1,2,3]
  }
});

store.define({
  a: {
    b: function (arg) {
      this.set('c.d.e', arg);
    }
  }
});

//store.do('a.b', 15);
store.add('c.f', 4);
console.log(store.indexOf('c.f', 1));

console.log(store.toString());

