module.exports = {
  port: process.env.PORT,
  pgUser: process.env.PG_USER,
  pgHost: process.env.PG_HOST,
  pgDatabase: process.env.PG_DATABASE,
  pgPassword: process.env.PG_PASSWORD,
  pgPort: process.env.PG_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRES_IN,
  env: process.env.NODE_ENV,
  origin: process.env.ORIGIN,
};
