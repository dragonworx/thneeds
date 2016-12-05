import Store from './store-lib'
import json from './actions/json'
import spinner from './actions/spinner'
import labelPicker from './actions/labelPicker'
import thneed from './actions/thneed'
import settings from './actions/settings'

Store.instance().define({
  init: function () {
    this.do('json.get', '/api/init').then(res => {
      const thneeds = res.data.thneeds;
      const sortOrder = res.data.settings.sortOrder;
      const thneedsById = new Map;
      thneeds.forEach(t => thneedsById.set(t.id, t));
      let sortedThneeds = [];
      sortOrder.forEach(id => sortedThneeds.push(thneedsById.get(id)));
      this.set({
        settings: {
          budgetAmount: res.data.settings.budgetAmount,
          budgetFrequency: res.data.settings.budgetFrequency,
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
  },
  json: json,
  spinner: spinner,
  labelPicker: labelPicker,
  thneed: thneed,
  settings: settings
});