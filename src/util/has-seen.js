const storage = require('./local-storage');
const flags = require('./sticky-flags');
const axios = require('axios');

/**
 * Uses the Micros service "have-i-seen-it" to store true/false states for a given user and flag.
 * Using a combination of userKey+flagKey we can globally track different binary states per user.
 *
 * Uses localStorage to store true values to speed up future queries.
 */
module.exports = {
  ENV: flags.is('aes.hs.env', 'staging') ? 'STAGING' : 'PROD',
  STAGING: 'https://have-i-seen-it.internal.useast.staging.atlassian.io/flag',
  PROD: 'https://have-i-seen-it.useast.atlassian.io/flag',
  /**
   * controls whether post will actually write a value, useful for iterating while testing
   */
  readOnly: flags.getBool('aes.hs.ro', false),

  get endPoint () {
    return this[this.ENV];
  },

  validateResponse (res) {
    if (res.status >= 200 && res.status < 300) {
      return Promise.resolve(res.data);
    } else {
      let error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
  },

  storageKey (userKey, flagKey) {
    return `aes.has-seen.${userKey}:${flagKey}`;
  },

  /**
   * query the service to get a boolean response
   * @param {string} userKey
   * @param {string} flagKey
   * @returns {Promise}
   */
  get (userKey, flagKey) {
    flagKey = flags.has('aes.hs.key') ? flags.get('aes.hs.key') : flagKey;
    const storageKey = this.storageKey(userKey, flagKey);

    if (storage.is(storageKey, true)) {
      // save making a call to the service since we've stored TRUE before
      return Promise.resolve(true);
    } else {
      // otherwise make the call
      const url = `${this.endPoint}?userKey=${userKey}&flagKey=${flagKey}`;

      return axios.get(url)
        .then(this.validateResponse)
        .then(data => {
          const status = data.status;
          if (status === true && storage.isAvailable) {
            // store TRUE value locally to speed up future gets
            storage.set(storageKey, true);
          }
          return status;
        });
    }
  },

  /**
   * post to the service to set a true flag
   * @param {string} userKey
   * @param {string} flagKey
   * @returns {Promise}
   */
  post (userKey, flagKey) {
    flagKey = flags.has('aes.hs.key') ? flags.get('aes.hs.key') : flagKey;
    const storageKey = this.storageKey(userKey, flagKey);

    if (storage.is(storageKey, true)) {
      // already set to TRUE, skip network call
      return Promise.resolve(true);
    } else {
      if (this.readOnly) {
        // skip making call to write TRUE if readOnly mode - useful for testing
        return Promise.resolve(true);
      }

      // set local storage to TRUE to save making call next time
      storage.set(storageKey, true);

      return axios.post(this.endPoint, {
        userKey: userKey,
        flagKey: flagKey
      }).then(this.validateResponse)
        .then(data => {
          return data;
        });
    }
  }
};