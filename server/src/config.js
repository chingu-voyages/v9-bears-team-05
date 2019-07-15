module.exports = {
  port: process.env.PORT || 5000,
  pgUser: process.env.PG_USER || 'aphrodite',
  pgHost: process.env.PG_HOST || 'postgres',
  pgDatabase: process.env.PG_DATABASE || 'aphrodite',
  pgPassword: process.env.PG_PASSWORD || 'aphroditepw',
  pgPort: process.env.PG_PORT || 5432,
  jwtSecret: process.env.JWT_SECRET || 'thissecretshouldbeatleastthirtytwocharacterslong',
  jwtExpiration: process.env.JWT_EXPIRES_IN || 90,
  env: process.env.NODE_ENV || 'development',
  origin: process.env.ORIGIN || 'http://localhost:3000',
  awsAccessyKeyId: process.env.AWS_ACCESS_KEY_ID || 'x',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'x',
};
