const cli = require('cli-color');

const log = {
  main: function (output) {
    console.log(cli.cyan(output));
  },
  info: function (output) {
    console.log(cli.blackBright(output));
  },
  notify: function (output) {
    console.log(cli.magenta(output));
  },
  begin: function (output) {
    console.log(cli.green(output));
  },
  ok: function finish(output) {
    console.log(cli.white(output || 'ok.'));
  },
  completed: function (output) {
    console.log(cli.green.bold(output || 'completed.'));
  },
  warn: function (output) {
    console.log(cli.yellow.bold(output || 'error.'));
  },
  error: function (output) {
    console.log(cli.red.bold(output || 'warn.'));
  }
};

module.exports = log;