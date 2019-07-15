const express = require('express');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config');
const middlewares = require('./middlewares');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.routes');
const closetRoutes = require('./routes/closet.routes');
const collRoutes = require('./routes/collection.routes');
const styleRoutes = require('./routes/style.routes');
const clothRoutes = require('./routes/cloth.routes');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

const limiter = rateLimit({
  max: 300,
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
app.use(cookieParser());

app.use(middlewares.handleEmptyPayload);
app.use(middlewares.contentTypeSet);
app.use(middlewares.contentTypeJson);
app.use(middlewares.handleRequestBodyErrors);
app.use(middlewares.setResponseHeaders);

app.use('/users/', userRoutes);
app.use('/auth/', authRoutes);
app.use('/closets/', closetRoutes);
app.use('/collections/', collRoutes);
app.use('/styles/', styleRoutes);
app.use('/clothes/', clothRoutes);
app.use('/upload/', uploadRoutes);

app.listen(config.port, (error) => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${config.port}. Error: ${error}`);
  /* eslint-enable no-console */
});
