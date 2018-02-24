const flags = require('./util/sticky-flags');
const hasSeen = require('./util/has-seen');

console.log(flags.getBool('aes.hs.ro'));

console.log(hasSeen.readOnly);
console.log(hasSeen.ENV);

hasSeen.get('1234', 'test').then(getResult => {
  console.log('getResult:' + getResult);
  hasSeen.post('1234', 'test').then(postResult => {
    console.log('postResult:' + postResult);
  });
});

window.flags = flags;