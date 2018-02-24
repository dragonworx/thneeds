module.exports = {
  validateNumber: function (value, key) {
    if (isNaN(parseFloat(value))) {
      this.set(`errors.${key}`, true);
      return false;
    }
    return true;
  }
};