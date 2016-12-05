module.exports = {
  save: function (accountDescription, accountAmount, budgetAmount, budgetFrequency) {
    this.set({
      settings: {
        accountDescription: accountDescription,
        accountAmount: accountAmount,
        budgetAmount: budgetAmount,
        budgetFrequency: budgetFrequency
      }
    }).do('json.post', '/api/saveSettings', this.get('settings')).then(res => {
      if (res.data.success) {
        this.set('route', 'thneeds');
      } else {
        // TODO: handle error?
        debugger;
      }
    });
  },
  getSortOrder: function () {
    return this.get('thneeds').map(thneed => thneed.id);
  },
  saveSortOrder: function () {
    this.do('json.post', '/api/saveSortOrder', this.do('settings.getSortOrder')).then(res => {
      if (!res.data.success) {
        // TODO: handle error?
        debugger;
      }
    });
  }
};