module.exports = {
  save: function (accountDescription, accountAmount, budgetAmount, budgetFrequency, budgetOccurence) {
    const validateNumber = this.call.validation.validateNumber;
    if (validateNumber(accountAmount, 'accountAmount') & validateNumber(budgetAmount, 'budgetAmount')) {
      this.set({
        settings: {
          accountDescription: accountDescription,
          accountAmount: accountAmount,
          budgetAmount: budgetAmount,
          budgetFrequency: budgetFrequency,
          budgetOccurence: budgetOccurence
        }
      }).call.json.post('/api/saveSettings', this.get('settings')).then(res => {
        if (res.data.success) {
          this.set('route', 'thneeds');
        } else {
          // TODO: handle error?
          debugger;
        }
      });
    }
  },
  getSortOrder: function () {
    return this.get('thneeds').map(thneed => thneed.id);
  },
  saveSortOrder: function () {
    this.call.json.post('/api/saveSortOrder', this.call.settings.getSortOrder()).then(res => {
      if (!res.data.success) {
        // TODO: handle error?
        debugger;
      }
    });
  }
};