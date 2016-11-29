const database = require('./database');
const log = require('./log');

database.init('postgres://postgres:admin@localhost:5433/postgres').then((tables) => {
  log.begin('Creating default users...');
  tables.user.bulkCreate([
    { name: 'ali', password: 'snerf', isAdmin: true },
    { name: 'liz', password: 'snarf' }
  ]).then(() => {
    return tables.user.findAll();
  }).then(function(users) {
    console.log(`${users.length} users created.`);
    log.completed('Default users created successfully.');
  }).then(() => {
    log.begin('Creating default settings...');
    return tables.settings.create({

    });
  }).then(() => {
    log.completed('Database init completed.');
  });
});