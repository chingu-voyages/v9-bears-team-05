INSERT INTO user_
  (first_name, last_name, email, hashed_password)
VALUES
  ('Test', 'Name', 'test@gmail.com', '$2a$12$VNTUIxGZ4C5eg7fh/SrEqO.k.ja5BUKu9B63FjTpzNKUu.2ubl4Pe');
/* password is pdpdpP123*/

INSERT INTO user_
  (first_name, last_name, email, hashed_password)
VALUES
  ('Another', 'User', 'anotheruser@gmail.com', '$2a$12$C8YwOe/gWRvUtQXL80EEueHeWtxaSDwlD0RhJr4X1eFuHLszVLtDK');
/* password is pdpdpD123*/

INSERT INTO closet
  (closet_name, user_id)
VALUES
  ('Tops', '1');

INSERT INTO closet
  (closet_name, user_id)
VALUES
  ('Casual', '2');

INSERT INTO closet
  (closet_name, user_id)
VALUES
  ('Bottoms', '1');

INSERT INTO closet
  (closet_name, user_id)
VALUES
  ('Outerwear', '2');

INSERT INTO closet
  (closet_name, user_id, parent_closet)
VALUES
  ('Blouses', '1', '1');

INSERT INTO closet
  (closet_name, user_id, parent_closet)
VALUES
  ('Tank Tops', '1', '1');

iNSERT INTO collection_
  (collection_name, user_id)
VALUES
  ('Weeekend - Summer', '1');

INSERT INTO collection_
  (collection_name, user_id)
VALUES
  ('Weekend - Winter', '1');

INSERT INTO collection_
  (collection_name, user_id)
VALUES
  ('Gym', '1');

INSERT INTO collection_
  (collection_name, user_id)
VALUES
  ('Vacation', '2');

INSERT INTO style
  (style_name, user_id, image_url)
VALUES
  ('Winter', '1', 'https://realhousewivesofmn.com/wp-content/uploads/2013/11/winter-fashion-look-one.png');

INSERT INTO style
  (style_name, user_id, image_url)
VALUES
  ('Formal', '1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMeD6JmGLOxOkEwVPXVRwH_uegi_0ZOdK65t5xkh13_KC82V7D');

INSERT INTO style
  (style_name, user_id, image_url)
VALUES
  ('Casual', '1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRJ8oUDbABPzux5zoUvZaVgaZs7Dhr_K2Jwc12VrGtiLPKQzHt');

INSERT INTO cloth
  (cloth_name, user_id, image_url)
VALUES
  ('Casual Grey Shirt', '1', 'https://static6.cilory.com/187844-thickbox_default/levis-casual-steel-grey-shirt.jpg');

INSERT INTO cloth
  (cloth_name, user_id, image_url)
VALUES
  ('Crop Top', '1','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0oV90gXd4YxFZsVW-VkCU0KVVgnTE7XZuDro6Lip-rNBxiA3M');

INSERT INTO cloth
  (cloth_name, user_id, image_url)
VALUES
  ('Denim Jeans', '1', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1533044469-saintlaurent-1533044371.jpg');
