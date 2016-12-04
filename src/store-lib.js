import React from 'react'

let instance = null;
let readyHandlers = [];
let stateId = 0;
const storeHelperAccessors = ['set', 'get', 'add', 'remove', 'clear', 'count', 'at', 'indexOf', 'contains', 'first', 'last', 'has', 'update', 'do'];
const storeSetters = ['add', 'remove', 'clear'];

function isObject(o) {
  return typeof o === 'object' && o !== null && !Array.isArray(o);
}

function dispatchReady() {
  readyHandlers.forEach(fn => fn(instance));
}

class Store {
  constructor(defaultState) {
    if (instance) {
      throw new Error('Store is a Singleton, an instance already exists.');
    }
    instance = this;
    this.listeners = new Map;
    this.loggers = [];
    this.enableDispatch = true;
    this.state = defaultState;
    this.actions = {};
    dispatchReady();
  }

  on(path, fn) {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, []);
    }
    this.listeners.get(path).push(fn);
    return this;
  }

  log(fn) {
    this.loggers.push(fn);
    return this;
  }

  dispatch(path, info) {
    try {
      const l = this.loggers.length;
      for (let i = 0; i < l; i++) {
        this.loggers[i](info);
      }
      for (let [listenerPath, array] of this.listeners.entries()) {
        if (path.indexOf(listenerPath) === 0) {
          array.forEach(fn => fn(info));
        }
      }
    } catch (e) {
      console.error(e.stack);
    }
    return this;
  }

  update(path) {
    this.mute(() => this.set(path, this.get(path)));
    this.dispatch(path, {type: 'update', path: path});
  }

  mute(fn) {
    this.enableDispatch = false;
    fn();
    this.enableDispatch = true;
    return this;
  }

  set(pathKeyOrObject, value) {
    if (isObject(pathKeyOrObject)) {
      // object as batch key value based
      let key, path, operation;
      let dispatch = [];
      this.mute(() => {
        for (key in pathKeyOrObject) {
          if (pathKeyOrObject.hasOwnProperty(key)) {
            path = key;
            operation = 'set';
            const l = storeSetters.length;
            for (let i = 0; i < l; i++) {
              let setter = storeSetters[i];
              if (path.indexOf(setter + ':') === 0) {
                // helper setter (add:, remove: etc..)
                path = path.substr(setter.length + 1);
                operation = setter;
              }
            }
            this[operation](path, pathKeyOrObject[key]);
            dispatch.push({type: operation, path: path, value: pathKeyOrObject[key]});
          }
        }
      });
      let l = dispatch.length, d;
      for (let i = 0; i < l; i++) {
        d = dispatch[i];
        this.dispatch(d.path, d);
      }
    } else {
      // string key value
      let path = pathKeyOrObject;
      let ref = typeof value === 'function' ? this.actions : this.state;
      let valueRef = value;
      let steps = path.split('.');
      let l = steps.length - 1;
      for (let i = 0; i < l; i++) {
        ref = ref[steps[i]];
        valueRef = valueRef[steps[i]];
        if (typeof ref === 'undefined' && isObject(valueRef)) {
          debugger;
        }
      }
      ref[steps[l]] = value;
      if (this.enableDispatch) {
        this.dispatch(path, {type: 'set', path: path, value: value});
      }
    }
    return this;
  }

  get(path) {
    let steps = path.split('.');
    let l = steps.length;
    let ref = this.state;
    for (let i = 0; i < l; i++) {
      ref = ref[steps[i]];
    }
    return ref;
  }

  add(arrayPath, item) {
    let array = this.get(arrayPath);
    if (!Array.isArray(array)) {
      throw new Error(`Object at path "${arrayPath}" must be an Array, found type ${typeof array}`);
    }
    array.push(item);
    this.dispatch(arrayPath, {type: 'add', path: arrayPath, value: item});
    return this;
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
    return this;
  }

  clear(path) {
    let value = this.get(path);
    if (Array.isArray(value)) {
      value.length = 0;
    } else {
      this.mute(() => {
        this.set(path, undefined);
      });
    }
    this.dispatch(path, {type: 'clear', path: path});
    return this;
  }

  count(iterablePath) {
    const value = this.get(iterablePath);
    if (Array.isArray(value)) {
      return value.length;
    } else if (isObject(value)) {
      return Object.keys(value).length;
    }
    throw new Error(`Non-iterable path "${iterablePath}"`);
  }

  at(iterablePath, index) {
    let value = this.get(iterablePath);
    if (Array.isArray(value)) {
      return value[index];
    } else if (isObject(value)) {
      let keys = Object.keys(value);
      return value[keys[index]];
    }
    throw new Error(`Non-iterable path "${iterablePath}"`);
  }

  indexOf(iterablePath, item) {
    const value = this.get(iterablePath);
    if (Array.isArray(value)) {
      return value.indexOf(item);
    }
    throw new Error(`Cannot find indexOf non-array value at path "${iterablePath}"`);
  }

  contains(iterablePath, item) {
    return this.indexOf(iterablePath, item) > -1;
  }

  first(iterablePath) {
    let value = this.get(iterablePath);
    let keys = Object.keys(value);
    return value[keys[0]];
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

  do(invokablePath, ...args) {
    let fn = this.actions[invokablePath];
    let output = fn.apply(this, args);
    this.dispatch(invokablePath, {type: 'do', path: invokablePath, args: args});
    return output;
  }

  toString() {
    return JSON.stringify(this.state, null, 4);
  }

  static create(defaultState) {
    return new Store(defaultState);
  }

  static get() {
    return instance;
  }

  static get data() {
    return instance.state;
  }

  static ready(fn) {
    if (instance) {
      fn(instance);
    } else {
      readyHandlers.push(fn);
    }
  }
}

class StoreComponent extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = true;
    this.store = instance;
    this.state = {
      id: stateId++
    };
    if (this.constructor.store) {
      if (typeof this.constructor.store !== 'string' && !Array.isArray(this.constructor.store)) {
        throw new Error('Store bindings must be either a String or Array');
      }
      let bindings = typeof this.constructor.store === 'string' ? [this.constructor.store] : this.constructor.store;
      bindings.forEach(binding => {
        let path, alias;
        if (typeof binding === 'string') {
          path = binding;
          alias = binding.split('.').pop();
        } else if (Array.isArray(binding) && binding.length === 2) {
          path = binding[0];
          alias = binding[1];
        } else {
          throw new Error('Invalid argument for store bind, String or Array required.');
        }
        instance.on(path, () => {
          if (this._isMounted) {
            this.setState({
              id: stateId++
            });
          }
        });
        Object.defineProperty(this, alias, {
          get: function () {
            return instance.get(path);
          },
          set: function (value) {
            return instance.set(path, value);
          }
        });
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handler(path, value) {
    return () => instance.set(path, value);
  }

  action(path, ...args) {
    return () => {
      this.do.call(this, path, ...args)
    };
  }
}

storeHelperAccessors.forEach(methodName => {
  StoreComponent.prototype[methodName] = function () {
    return instance[methodName].apply(instance, arguments);
  }
});

Store.Component = StoreComponent;

export default Store;