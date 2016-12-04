import Store from './store-lib'
import axios from 'axios'

Store.ready(store => {
  store.set({
    'foo': {
      'bar': 1
    },
    'getJSON': function () {
      this.do('isLoading', true);
      return axios.get.apply(axios, arguments).then((res) => {
        this.do('isLoading', false);
        return res;
      });
    },
    'postJSON': function () {
      this.do('isLoading', true);
      return axios.post.apply(axios, arguments).then((res) => {
        this.do('isLoading', false);
        return res;
      });
    },
    'isLoading': function (bool) {
      this.set({
        'ui.showOverlay': bool,
        'ui.isLoading': bool,
      });
    },
    'showLabelPicker': function (bool) {
      this.set({
        'ui.showOverlay': bool,
        'ui.showLabelPicker': bool,
      });
    },
    'saveSortOrder': function () {

    },
    'saveEditThneed': function (title, amount, notes, label, userId) {
      this.do('postJSON', '/api/addThneed', {
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
          this.do('saveSortOrder');
          this.set({
            'add:thneeds': res.data.thneed,
            'editThneed.thneed': null,
            'route': 'thneeds'
          });
        }
      }).catch(res => {
        // TODO: handle network error...
        debugger;
      });
    },
    'cancelEditThneed': function () {
      this.set({
        'editThneed.thneed': null,
        'route': 'thneeds'
      });
    },
    'addThneed': function () {
      this.set({
        'editThneed.isNew': true,
        'editThneed.thneed': {
          title: 'Thneed it!',
          notes: '',
          amount: 0,
          label: 'default'
        },
        'route': 'editThneed'
      });
    }
  })
});