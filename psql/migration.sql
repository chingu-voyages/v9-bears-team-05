CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR UNIQUE,
  avatar_url VARCHAR DEFAULT NULL,
  hashed_password VARCHAR
);

CREATE TABLE closets (
  closet_id SERIAL PRIMARY KEY,
  closet_name VARCHAR,
  user_id INTEGER NOT NULL REFERENCES users(user_id)
);

CREATE TABLE collections (
  collection_id SERIAL PRIMARY KEY,
  collection_name VARCHAR,
  user_id INTEGER NOT NULL REFERENCES users(user_id)
);

CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  style_name VARCHAR,
  collection_id INTEGER NOT NULL REFERENCES collections(collection_id),
  contents VARCHAR
);

CREATE TABLE clothes (
  cloth_id SERIAL PRIMARY KEY,
  cloth_name VARCHAR,
  image_url VARCHAR,
  closet_id INTEGER NOT NULL REFERENCES closets(closet_id)
);

CREATE TABLE cloth_closet_mapping (
  cloth_id INTEGER NOT NULL REFERENCES clothes(cloth_id),
  closet_id INTEGER NOT NULL REFERENCES closets(closet_id)
);

CREATE TABLE cloth_style_mapping (
  cloth_id INTEGER NOT NULL REFERENCES clothes(cloth_id),
  style_id INTEGER NOT NULL REFERENCES styles(style_id)
);

CREATE TABLE style_collection_mapping (
  style_id INTEGER NOT NULL REFERENCES styles(style_id),
  collection_id INTEGER NOT NULL REFERENCES collections(collection_id)
)
