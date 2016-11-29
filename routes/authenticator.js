const pbkdf2 = require('s-salt-pepper');
const guid = require('guid');
const base64 = require('js-base64').Base64;
const cli = require('cli-color');

let tokens = {};
let tokenCounter = 0;
const privateSalt = guid.create().value; // read from ENV
const keySeparator = '-';
const tokenExpiryDuration = 10 /*seconds*/;

let authenticator = {
  newToken: function nextToken() {
    return new Promise((resolve) => {
      let id = ++tokenCounter;
      console.log(cli.green(tokenCounter));
      let issued = new Date().getTime();
      pbkdf2.configure({
        pepper: privateSalt
      });
      pbkdf2.hash(issued.toString(), (err, _salt, hash) => {
        let token = {
          id: id,
          issued: issued,
          hash: hash,
          salt: _salt
        };
        let tokenStr = this.tokenToString(token);
        tokens[tokenStr] = token;
        console.log(cli.cyan('nextToken:' + JSON.stringify(token, null, 4)), cli.blue(tokenStr));
        resolve(tokenStr);
      })
    });
  },
  tokenToString: function (token) {
    return base64.encode(token.issued) + keySeparator + token.salt;
  },
  tokenFromString: function (str) {
    let token = {};
    let parts = str.split(keySeparator);
    token.issued = parseInt(base64.decode(parts[0]));
    token.salt = parts[1];
    return token;
  },
  isValid: function (req) {
    return new Promise((resolve, reject) => {
      var tokenStr = req.body.token;
      let token = this.tokenFromString(tokenStr);
      console.log('issued:', cli.cyan(token.issued));
      console.log('salt:', cli.cyan(token.salt));
      let serverToken = tokens[tokenStr];
      if (!serverToken) {
        reject({
          status: 401,
          message: 'Unauthorized'
        });
      } else {
        pbkdf2.compare(token.issued.toString(), token.salt, function (err, _hash) {
          if (err) {
            reject({
              status: 500,
              message: 'pbkdf2 error: ' + err.message,
              error: err
            });
          }
          if (_hash !== serverToken.hash) {
            reject({
              status: 401,
              message: 'Unauthorized'
            });
          } else {
            // check expiry (secs)
            let expiry = (new Date().getTime() - serverToken.issued) / 1000;
            if (expiry > tokenExpiryDuration) {
              console.log('expired!:', cli.red(expiry));
              reject({
                status: 401,
                message: 'Unauthorized'
              });
            } else {
              console.log('expiry ok:', cli.cyan(expiry));
              resolve({
                status: 200,
                message: 'Authorized'
              });
            }
          }
        });
      }
    });
  },
  authenticate: function (req, res, next) {
    authenticator.isValid(req).then(() => {
      next();
    }).catch((err) => {
      console.log('Authentication!', cli.red(err.stack ? err.stack : err.status + ': ' + err.message));
      res.status(err.status);
      res.end(err.message);
    });
  }
};

module.exports = authenticator;