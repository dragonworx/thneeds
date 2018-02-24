module.exports = {
  get isAvailable () {
    try {
      const key = 'localStorage-key-test-' + Math.random();
      localStorage[key] = 'true';
      delete localStorage[key];
      return true;
    } catch (e) {
      return false;
    }
  },
  has (key) {
    return this.isAvailable ? localStorage.hasOwnProperty(key) : false;
  },
  get (key, defaultValue = undefined) {
    if (this.isAvailable) {
      return localStorage.hasOwnProperty(key) ? JSON.parse(localStorage[key]) : defaultValue;
    }
  },
  set (key, value) {
    if (this.isAvailable) {
      localStorage[key] = JSON.stringify(value);
    }
  },
  remove (key) {
    if (this.isAvailable) {
      localStorage.removeItem(key);
    }
  },
  is (key, equalToValue) {
    return this.isAvailable && this.get(key) === equalToValue;
  }
};