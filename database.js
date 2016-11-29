const SQL = require('sequelize');
const config = require('./database.config');
const log = require('./log')

module.exports = {
  tables: {},
  init: function (connectionUrl = process.env.PG) {
    log.begin('Initialising database connection...');

    let db = new SQL(connectionUrl, {
      /* mute logging */
      logging: () => {}
    });

    log.completed('Database connection successful.');

    let tableSync = [];

    log.begin(`Syncing table schemas (force:${config.force})...`);

    Object.keys(config.tables).forEach((tableName) => {
      log.info(`Syncing table "${tableName}"`);
      const tableSchema = config.tables[tableName];
      const columns = tableSchema.columns;
      const options = Object.assign({
        freezeTableName: true
      }, tableSchema.options);
      let table = db.define(tableName, columns, options);
      tableSync.push(table.sync({
        force: config.force
      }));
      this.tables[tableName] = table;
    });

    return new Promise((resolve, reject) => {
      Promise.all(tableSync).then(() => {
        log.completed('Table schemas synced successfully.');
        resolve(this.tables);
      }).catch((err) => {
        reject(err);
      });
    });
  }
};