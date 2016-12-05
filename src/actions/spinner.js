module.exports = {
  show: function () {
    this.set({
      visible: {
        spinner: true,
        overlay: true
      }
    });
  },
  hide: function () {
    this.set({
      visible: {
        spinner: false,
        overlay: false
      }
    });
  }
};