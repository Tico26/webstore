const db = require("./connection");

const format = require("pg-format");

const seed = ({
  shops,
  items,
  categories,
  itemCategories,
  shopTags,
  shopTagMap,
  itemColours,
  itemColourMap,
  users,
  favourites,
  reviews,
  itemImages,
}) => {
  return db
    .query(
      `
        DROP TABLE IF EXISTS reviews;
      `
    )
    .then(() => {
      return db.query(`
                    DROP TABLE IF EXISTS favorites;
            `);
    })
    .then(() => {
      return db.query(`
                      DROP TABLE IF EXISTS item_images;
              `);
    })
    .then(() => {
      return db.query(`
                      DROP TABLE IF EXISTS product_tags;
              `);
    })
    .then(() => {
      return db.query(`
                      DROP TABLE IF EXISTS tags;
              `);
    })
    .then(() => {
      return db.query(`
                      DROP TABLE IF EXISTS products;
              `);
    })
    .then(() => {
      return db.query(`
                      DROP TABLE IF EXISTS shops;
              `);
    })
    .then(() => {
      return db.query(`
                      DROP TABLE IF EXISTS categories;
              `);
    })
    .then(() => {
      return db.query(`
                      DROP TABLE IF EXISTS users;
              `);
    })
    .then(() => {
      return createUsersTable();
    })
    .then(() => {
      return createCategoriesTable();
    })
    .then(() => {
      return createShopsTable();
    })
    .then(() => {
      return createProductsTable();
    })
    .then(() => {
      return createItemImagesTable();
    })
    .then(() => {
      return createTagsTable();
    })
    .then(() => {
      return createProductTagsTable();
    })
    .then(() => {
      return createFavoritesTable();
    })
    .then(() => {
      return createReviewsTable();
    });
};

const createUsersTable = () => {
  return db.query(`
          CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `);
};

const createCategoriesTable = () => {
  return db.query(`
          CREATE TABLE categories (
            category_id SERIAL PRIMARY KEY,
            category_name VARCHAR(250) NOT NULL,
            category_description VARCHAR(250)
          );
        `);
};

const createShopsTable = () => {
  return db.query(`
          CREATE TABLE shops (
            shop_id SERIAL PRIMARY KEY,
            shop_name VARCHAR(250) NOT NULL,
            shop_url VARCHAR(250) NOT NULL,
            location VARCHAR(250),
            category_id INT REFERENCES categories(category_id) ON DELETE SET NULL
          );
        `);
};

const createProductsTable = () => {
  return db.query(`
          CREATE TABLE products (
            product_id SERIAL PRIMARY KEY,
            product_url VARCHAR(250) NOT NULL,
            image VARCHAR(250) NOT NULL,
            product_name VARCHAR(250) NOT NULL,
            price_in_pence INT,
            product_description VARCHAR(250),
            size VARCHAR(250),
            colour VARCHAR(250),
            product_category VARCHAR(250) NOT NULL,
            shop_id INT REFERENCES shops(shop_id) ON DELETE CASCADE
          );
        `);
};

const createItemImagesTable = () => {
  return db.query(`
          CREATE TABLE item_images (
            image_id SERIAL PRIMARY KEY,
            product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
            image_url VARCHAR(500) NOT NULL
          );
        `);
};

const createTagsTable = () => {
  return db.query(`
          CREATE TABLE tags (
            tag_id SERIAL PRIMARY KEY,
            tag_name VARCHAR(100) UNIQUE NOT NULL
          );
        `);
};

const createProductTagsTable = () => {
  return db.query(`
          CREATE TABLE product_tags (
            product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
            tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE,
            PRIMARY KEY (product_id, tag_id)
          );
        `);
};

const createFavoritesTable = () => {
  return db.query(`
          CREATE TABLE favorites (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, product_id)
          );
        `);
};

const createReviewsTable = () => {
  return db.query(`
          CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            rating INT CHECK (rating >= 1 AND rating <= 5),
            comment TEXT,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `);
};
module.exports = seed;
