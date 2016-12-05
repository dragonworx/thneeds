import axios from 'axios'

module.exports = {
  get: function () {
    this.do('spinner.show');
    return axios.get.apply(axios, arguments).then((res) => {
      this.do('spinner.hide');
      return res;
    });
  },
  post: function () {
    this.do('spinner.show');
    return axios.post.apply(axios, arguments).then((res) => {
      this.do('spinner.hide');
      return res;
    });
  }
};