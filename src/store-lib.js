import React from 'react'

let instance = null;

class Store {
  constructor(defaultState) {
    if (instance) {
      throw new Error('Store is a Singleton, an instance already exists.');
    }
    instance = this;
    this.state = defaultState;
    this.listeners = new Map;
  }

  on(path, fn) {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, []);
    }
    this.listeners.get(path).push(fn);
  }

  dispatch(path, info) {
    try {
      let listeners = this.listeners;
      if (listeners.has('*')) {
        listeners.get('*').forEach(fn => fn(info));
      }
      for (let [listenerPath, array] of this.listeners.entries()) {
        if (listenerPath !== '*' && path.indexOf(listenerPath) === 0) {
          array.forEach(fn => fn(info));
        }
      }
    } catch (e) {
      console.error(e.stack);
    }
  }

  get(path) {
    let steps = path.split('.');
    let ref = this.state;
    for (let i = 0; i < steps.length; i++) {
      ref = ref[steps[i]];
    }
    return ref;
  }

  set(path, value) {
    let steps = path.split('.');
    let l = steps.length - 1;
    let ref = this.state;
    for (let i = 0; i < l; i++) {
      ref = ref[steps[i]];
    }
    ref[steps[l]] = value;
    this.dispatch(path, {type: 'set', path: path, value: value});
  }

  add(arrayPath, item) {
    let array = this.get(arrayPath);
    if (!Array.isArray(array)) {
      throw new Error(`Object at path "${arrayPath}" must be an Array, found type ${typeof array}`);
    }
    array.push(item);
    this.dispatch(arrayPath, {type: 'add', path: arrayPath, value: item});
  }

  remove(arrayPath, item) {
    let array = this.get(arrayPath);
    if (!Array.isArray(array)) {
      throw new Error(`Object at path "${arrayPath}" must be an Array, found type ${typeof array}`);
    }
    let index = array.indexOf(item);
    if (index === -1) {
      throw new Error(`Array item not found for path "${arrayPath}"`);
    }
    array.splice(index, 1);
    this.dispatch(arrayPath, {type: 'remove', path: arrayPath, value: item});
  }

  update(path) {
    this.dispatch(path, {type: 'update', path: path, value: this.get(path)});
  }

  count(iterablePath) {
    return Object.keys(this.get(iterablePath)).length;
  }

  first(iterablePath) {
    let value = this.get(iterablePath);
    let keys = Object.keys(value);
    return value[keys[0]];
  }

  at(iterablePath, index) {
    let value = this.get(iterablePath);
    let keys = Object.keys(value);
    return value[keys[index]];
  }

  last(iterablePath) {
    let value = this.get(iterablePath);
    let keys = Object.keys(value);
    return value[keys[keys.length - 1]];
  }

  has(path) {
    let value = this.get(path);
    return value !== null || typeof value !== 'undefined';
  }

  static create(defaultState) {
    return new Store(defaultState);
  }

  static get instance() {
    return instance;
  }

  static get data() {
    return instance.state;
  }
}

let stateId = 0;

class StoreComponent extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      id: stateId++
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initStore(dataPath, listeners) {
    this.store = instance;
    this.dataPath = dataPath;
    let stateUpdater = () => {
      if (this._isMounted) {
        this.setState({
          data: dataPath ? instance.get(dataPath) : null
        });
      }
    };
    this.state = {
      data: dataPath ? instance.get(dataPath) : null
    };
    if (dataPath) {
      instance.on(dataPath, stateUpdater);
    }
    if (listeners) {
      listeners.forEach(path => instance.on(path, stateUpdater));
    }
  }

  bind(path) {
    instance.on(path, () => {
      if (this._isMounted) {
        this.setState({
          id: stateId++
        });
      }
    });
  }

  alias(path, alias) {
    Object.defineProperty(this, alias, {
      get: function () {
        return instance.get(path);
      }
    });
  }

  get(path) {
    return this.store.get(path);
  }

  set(path, value) {
    this.store.set(path, value);
  }

  get data() {
    return instance.get(this.dataPath);
  }
}

Store.Component = StoreComponent;

export default Store;