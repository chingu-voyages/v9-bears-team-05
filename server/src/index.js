const express = require('express');
const helmet = require('helmet');
const config = require('../config');

const app = express();

app.use(helmet());

app.listen(config.port, (error) => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${config.port}. Error: ${error}`);
  /* eslint-enable no-console */
});
