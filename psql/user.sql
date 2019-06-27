CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name varchar,
  last_name varchar,
  email varchar UNIQUE,
  avatar_url varchar DEFAULT NULL,
  hashed_password varchar
);
