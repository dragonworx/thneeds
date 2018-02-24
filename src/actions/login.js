module.exports = function (username, password) {
  this.call.json.post('/api/login', {
    username: username,
    password: password
  }).then(res => {
    let user = res.data;
    user.loginTime = Date.now()
    this.set('user', user);
  }).catch((err) => {
    // TODO: handle network error...
    debugger;
  });
};