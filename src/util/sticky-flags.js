const storage = require('./local-storage');

function _getQueryParams () {
  const params = {};
  location.search
    .replace(/^\?/, '')
    .split('&')
    .forEach(pair => {
      const parts = pair.split('=');
      const name = parts[0];
      const value = parts[1];
      params[name] = typeof value === 'undefined' ? null : decodeURIComponent(value);
    });
  return params;
}

const _params = _getQueryParams();

module.exports = {
  getQueryParams () {
    return _params;
  },

  getQueryParam (name) {
    return _params[name];
  },

  hasQueryParam (name) {
    return _params.hasOwnProperty(name);
  },

  get (name, defaultValue = undefined) {
    if (this.hasQueryParam(name)) {
      // use query param, takes precedence
      const value = _params[name];
      // write to localStorage flag to preserve setting across navigation
      storage.set(name, value);
      return value;
    }
    return storage.get(name, defaultValue);
  },

  set (name, value) {
    // only write to localStorage
    storage.set(name, value);
    _params[name] = value;
    return this;
  },

  remove (name) {
    storage.remove(name);
    delete _params[name];
    return this;
  },

  is (name, equalToValue) {
    const value = this.get(name);
    const type = typeof equalToValue;
    if (type === 'string' || type === 'number' || type === 'boolean') {
      return ('' + value).toLowerCase() === equalToValue.toLowerCase();
    }
    return value === equalToValue;
  },

  has (name) {
    return this.hasQueryParam(name) || storage.has(name);
  },

  getParsed (name, defaultValue = undefined) {
    let val = this.get(name, defaultValue);
    if (val === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(val);
    } catch (e) {
      return defaultValue;
    }
  },

  getBool (name, defaultValue = false) {
    let val = this.get(name, defaultValue);
    if (val === null) {
      return true;
    }
    try {
      return !!JSON.parse(val);
    } catch (e) {
      return defaultValue;
    }
  },

  getString (name, defaultValue = '') {
    return this.get(name, defaultValue);
  },

  getNumber (name, defaultValue = -1) {
    return this.getParsed(name, defaultValue);
  },

  getObject (name, defaultValue = {}) {
    return this.getParsed(name, defaultValue);
  },

  refreshUrl () {
    let search = [];
    for (let k in _params) {
      if (_params.hasOwnProperty(k)) {
        search.push(k + '=' + encodeURIComponent(_params[k]));
      }
    }
    const l = location;
    const h = l.hash.replace(/^#/, '');
    l.href = `${l.protocol}//${l.host}${l.pathname}${search.length ? '?' : ''}${search.join('&')}${h ? '#' : ''}${h}`;
  }
};