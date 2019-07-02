CREATE TABLE user_ (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR UNIQUE,
  avatar_url VARCHAR DEFAULT NULL,
  hashed_password VARCHAR
);

CREATE TABLE closet (
  closet_id SERIAL PRIMARY KEY,
  closet_name VARCHAR,
  user_id INTEGER NOT NULL REFERENCES user_(user_id) ON DELETE CASCADE,
  parent_closet INTEGER DEFAULT NULL REFERENCES closet(closet_id)
);

CREATE TABLE collection_ (
  collection_id SERIAL PRIMARY KEY,
  collection_name VARCHAR,
  user_id INTEGER NOT NULL REFERENCES user_(user_id) ON DELETE CASCADE
);

CREATE TABLE style (
  style_id SERIAL PRIMARY KEY,
  style_name VARCHAR,
  collection_id INTEGER NOT NULL REFERENCES collection_(collection_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES user_(user_id) ON DELETE CASCADE,
  contents VARCHAR DEFAULT NULL
);

CREATE TABLE cloth (
  cloth_id SERIAL PRIMARY KEY,
  cloth_name VARCHAR,
  image_url VARCHAR DEFAULT NULL,
  user_id INTEGER NOT NULL REFERENCES user_(user_id) ON DELETE CASCADE
);

CREATE TABLE cloth_closet_mapping (
  cloth_id INTEGER NOT NULL REFERENCES cloth(cloth_id),
  closet_id INTEGER NOT NULL REFERENCES closet(closet_id)
);

CREATE TABLE cloth_style_mapping (
  cloth_id INTEGER NOT NULL REFERENCES cloth(cloth_id),
  style_id INTEGER NOT NULL REFERENCES style(style_id)
);

CREATE TABLE style_collection_mapping (
  style_id INTEGER NOT NULL REFERENCES style(style_id),
  collection_id INTEGER NOT NULL REFERENCES collection_(collection_id)
)
