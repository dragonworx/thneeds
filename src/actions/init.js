module.exports = function () {
  this.call.json.get('/api/init').then(res => {
    const thneeds = res.data.thneeds;
    const sortOrder = res.data.settings.sortOrder;
    if (thneeds.length !== sortOrder.length) {
      throw new Error('Thneeds and sortOrder appear out of sync!');
    }
    const thneedsById = new Map;
    thneeds.forEach(t => thneedsById.set(t.id, t));
    let sortedThneeds = [];
    sortOrder.forEach(id => sortedThneeds.push(thneedsById.get(id)));
    this.set({
      settings: {
        budgetAmount: res.data.settings.budgetAmount,
        budgetFrequency: res.data.settings.budgetFrequency,
        budgetOccurence: res.data.settings.budgetOccurence,
        accountDescription: res.data.settings.accountDescription,
        accountAmount: res.data.settings.accountAmount,
        sortOrder: sortOrder
      },
      thneeds: sortedThneeds
    });
  }).catch(err => {
    // TODO: handle network error...
    console.error(err.stack);
  });
};