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
  },
  select: function (label) {
    this
      .set('edit.thneed.label', label)
      .call.labelPicker.hide();
  }
};