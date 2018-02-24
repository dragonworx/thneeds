module.exports = {
  add: function () {
    this.set({
      edit: {
        isNew: true,
        thneed: {
          title: 'Thneed it!',
          notes: '',
          amount: 0,
          label: 'default'
        }
      },
      route: 'edit'
    });
  },
  edit: {
    open: function (thneed) {
      this.set({
        edit: {
          isNew: false,
          thneed: thneed
        },
        route: 'edit'
      });
    },
    save: function (title, amount, notes, label, userId) {
      if (this.call.validation.validateNumber(amount, 'thneedAmount')) {
        const thneedData = {
          title: title,
          amount: amount,
          notes: notes,
          label: label,
          userId: userId
        };
        if (this.get('edit.isNew')) {
          this.call.json.post('/api/addThneed', thneedData).then(res => {
            if (res.data.err) {
              // TODO: display validation error
              res.err.errors.forEach(err => {
                const message = err.message;
                const path = err.path;
              });
            } else {
              this
                .add('thneeds', res.data.thneed)
                .set({
                  edit: {
                    thneed: null
                  },
                  route: 'thneeds'
                })
                .call.settings.saveSortOrder();
            }
          }).catch(res => {
            // TODO: handle network error...
            debugger;
          });
        } else {
          this.call.json.post('/api/saveThneed', {
            id: this.get('edit.thneed.id'),
            thneed: thneedData
          }).then(res => {
            if (res.data.success) {
              let thneed = this.get('edit.thneed');
              thneed.title = title;
              thneed.amount = amount;
              thneed.notes = notes;
              thneed.label = label;
              this.set({
                edit: {
                  thneed: null
                },
                route: 'thneeds'
              });
            }
          });
        }
      }
    },
    cancel: function () {
      this.set({
        edit: {
          thneed: null
        },
        route: 'thneeds'
      });
    }
  },
  moveUp: function (thneed) {
    let thneeds = this.get('thneeds');
    const index = thneeds.indexOf(thneed);
    if (index === 0) {
      return;
    }
    thneeds.splice(index, 1);
    thneeds.splice(index - 1, 0, thneed);
    this
      .set('thneeds', thneeds)
      .call.settings.saveSortOrder();
  },
  moveDown: function (thneed) {
    let thneeds = this.get('thneeds');
    const index = thneeds.indexOf(thneed);
    if (index === thneeds.length - 1) {
      return;
    }
    thneeds.splice(index, 1);
    thneeds.splice(index + 1, 0, thneed);
    this
      .set('thneeds', thneeds)
      .call.settings.saveSortOrder();
  },
  confirmDelete: function (thneed) {
    this.set('deleteThneed', thneed);
  },
  applyConfirmDelete: function () {
    this.call.thneed.delete(this.get('deleteThneed'));
    this.set('deleteThneed', null);
  },
  cancelConfirmDelete: function () {
    this.set('deleteThneed', null);
  },
  delete: function (thneed) {
    let thneeds = this.get('thneeds');
    const index = thneeds.indexOf(thneed);
    thneeds.splice(index, 1);
    this.call.json.post('/api/deleteThneed', {
      id: thneed.id,
      sortOrder: this.call.settings.getSortOrder()
    }).then(res => {
      if (res.data.success) {
        this.set('thneeds', thneeds);
      }
    })
  },
  showPurchase: function (thneed) {
    this.set({
      purchaseThneed: thneed,
      visible: {
        overlay: true,
        purchase: true
      }
    });
  },
  closePurchase: function () {
    this.set({
      purchaseThneed: null,
      visible: {
        overlay: false,
        purchase: false
      }
    });
  },
  confirmPurchase: function () {
    let thneeds = this.get('thneeds');
    const thneed = this.get('purchaseThneed');
    const index = thneeds.indexOf(thneed);
    thneeds.splice(index, 1);
    this.call.json.post('/api/purchaseThneed', {
      id: thneed.id,
      sortOrder: this.call.settings.getSortOrder()
    }).then(res => {
      if (res.data.success) {
        this.call.thneed.closePurchase();
        this.set('thneeds', thneeds);
      }
    });
  }
};