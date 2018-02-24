import axios from 'axios'

export default {
  get: function () {
    this.call.spinner.show();
    return axios.get.apply(axios, arguments).then((res) => {
      this.call.spinner.hide();
      return res;
    });
  },
  post: function () {
    this.call.spinner.show();
    return axios.post.apply(axios, arguments).then((res) => {
      this.call.spinner.hide();
      return res;
    });
  }
};