const express = require('express');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const config = require('./config');
const middlewares = require('./middlewares');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use(helmet());
app.use(xss());
app.use(hpp({
  whitelist: ['sample'],
}));
app.use(limiter);
app.use(express.json({ limit: 1e6 }));

app.use(middlewares.handleEmptyPayload);
app.use(middlewares.contentTypeSet);
app.use(middlewares.contentTypeJson);
app.use(middlewares.handleRequestBodyErrors);
app.use(middlewares.setResponseHeaders);

app.use('/users/', userRoutes);
app.use('/auth/', authRoutes);

app.listen(config.port, (error) => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${config.port}. Error: ${error}`);
  /* eslint-enable no-console */
});
