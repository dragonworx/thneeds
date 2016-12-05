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
    save: function (title, amount, notes, label, userId) {
      this.do('json.post', '/api/addThneed', {
        title: title,
        amount: amount,
        notes: notes,
        label: label,
        userId: userId
      }).then(res => {
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
            .do('settings.saveSortOrder');
        }
      }).catch(res => {
        // TODO: handle network error...
        debugger;
      });
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
      .do('settings.saveSortOrder');
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
      .do('settings.saveSortOrder');
  },
  delete: function (thneed) {
    let thneeds = this.get('thneeds');
    const index = thneeds.indexOf(thneed);
    thneeds.splice(index, 1);
    this.do('json.post', '/api/deleteThneed', {
      id: thneed.id,
      sortOrder: this.do('settings.getSortOrder')
    }).then((res) => {
      if (res.data.success) {
        this.set('thneeds', thneeds);
      }
    })
  }
};