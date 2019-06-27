const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');

const app = express();

app.use(express.json({ limit: 1e6 }));
app.use(helmet());

app.use('/users/', userRoutes);
app.use('/auth/', authRoutes);

app.listen(config.port, (error) => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${config.port}. Error: ${error}`);
  /* eslint-enable no-console */
});
