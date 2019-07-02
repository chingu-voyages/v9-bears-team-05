INSERT INTO user_ (first_name, last_name, email, hashed_password) VALUES ('Test', 'Name', 'test@gmail.com', '$2a$12$VNTUIxGZ4C5eg7fh/SrEqO.k.ja5BUKu9B63FjTpzNKUu.2ubl4Pe');
/* password is pdpdpP123*/

INSERT INTO user_ (first_name, last_name, email, hashed_password) VALUES ('Another', 'User', 'anotheruser@gmail.com', '$2a$12$C8YwOe/gWRvUtQXL80EEueHeWtxaSDwlD0RhJr4X1eFuHLszVLtDK');
/* password is pdpdpD123*/

INSERT INTO closet (closet_name, user_id) VALUES ('Tops', '1');

INSERT INTO closet (closet_name, user_id) VALUES ('Casual', '2');

INSERT INTO closet (closet_name, user_id) VALUES ('Bottoms', '1');

INSERT INTO closet (closet_name, user_id) VALUES ('Outerwear', '2');

INSERT INTO closet (closet_name, user_id, parent_closet) VALUES ('Blouses', '1', '1');

INSERT INTO closet (closet_name, user_id, parent_closet) VALUES ('Tank Tops', '1', '1');

iNSERT INTO collection_ (collection_name, user_id) VALUES ('Weeekend - Summer', '1');

INSERT INTO collection_ (collection_name, user_id) VALUES ('Weekend - Winter', '1');

INSERT INTO collection_ (collection_name, user_id) VALUES ('Gym', '1');

INSERT INTO collection_ (collection_name, user_id) VALUES ('Vacation', '2');

INSERT INTO style (style_name, collection_id, user_id) VALUES ('My Fav', '1', '1');

INSERT INTO style (style_name, collection_id, user_id) VALUES ('My Fav #2', '1', '1');

INSERT INTO style (style_name, collection_id, user_id) VALUES ('My Fav', '4', '2');

INSERT INTO cloth (cloth_name, user_id) VALUES ('Casual Grey Shirt', '1');

INSERT INTO cloth (cloth_name, user_id) VALUES ('Crop Top', '1');

INSERT INTO cloth (cloth_name, user_id) VALUES ('Denim Jeans', '1');
