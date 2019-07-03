const { Pool } = require('pg');
const config = require('../config');

const pg = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});

pg.on('error', () => {
  /* eslint-disable no-console */
  console.log('Lost PG connection');
  /* eslint-enable no-console */
});

module.exports = pg;
