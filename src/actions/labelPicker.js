module.exports = {
  show: function () {
    this.set({
      visible: {
        labelPicker: true,
        overlay: true
      }
    });
  },
  hide: function () {
    this.set({
      visible: {
        labelPicker: false,
        overlay: false
      }
    });
  }
};