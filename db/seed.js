const db = require("./connection");

const format = require("pg-format");
const seed = ({
  shops,
  products,
  categories,
  productCategories,
  shopTags,
  shopTagMap,
  productColours,
  productColourMap,
  users,
  favouriteShops,
  reviews,
  productImages,
}) => {
  return (
    db
      .query(
        `
        DROP TABLE IF EXISTS favourite_shops;
      `
      )
      .then(() => {
        return db.query(`
        DROP TABLE IF EXISTS product_images;
    `);
      })
      .then(() => {
        return db.query(`
        DROP TABLE IF EXISTS shop_tag;
     `);
      })
      .then(() => {
        return db.query(`
        DROP TABLE IF EXISTS favourite_products;`);
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
        return createProductImagesTable();
      })
      .then(() => {
        return createTagsTable();
      })
      .then(() => {
        return createShopTagsTable();
      })
      .then(() => {
        return createFavouriteShopsTable();
      })
      // .then(() => {
      //   return createReviewsTable();
      // })
      .then(() => {
        return insertUsers(users);
      })
      .then(() => {
        return insertCategories(categories);
      })
      .then(() => {
        return insertShops(shops);
      })
      .then(() => {
        return insertProducts(products);
      })
      .then(() => {
        return insertProductImages(productImages);
      })
      .then(() => {
        return insertShopTag(shopTags);
      })
      .then(() => {
        return insertShopTagMap(shopTagMap);
      })
      .then(() => {
        return insertFavouriteShops(favouriteShops);
      })
  );
};

const createUsersTable = () => {
  return db.query(`
          CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(250) NOT NULL,
            last_name VARCHAR(250) NOT NULL,
            username VARCHAR(250) UNIQUE NOT NULL,
            date_of_birth DATE,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            is_admin BOOLEAN DEFAULT FALSE,
            last_login TIMESTAMP DEFAULT NOW()
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
            shop_description VARCHAR(250),
            shop_url VARCHAR(250) NOT NULL,
            logo_url VARCHAR(250) NOT NULL,
            location VARCHAR(250),
            source_type VARCHAR(250) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            category_id INT REFERENCES categories(category_id) ON DELETE SET NULL
          );
        `);
};

const createProductsTable = () => {
  return db.query(`
          CREATE TABLE products (
            product_id SERIAL PRIMARY KEY,
            product_name VARCHAR(250) NOT NULL,
            product_description VARCHAR(250),
            price_in_pence INT,
            product_url VARCHAR(250) NOT NULL,
            colour VARCHAR(250),
            size VARCHAR(250),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            is_active BOOLEAN DEFAULT true,
            shop_id INT REFERENCES shops(shop_id) ON DELETE CASCADE
          );
        `);
};

const createProductImagesTable = () => {
  return db.query(`
          CREATE TABLE product_images (
            image_id SERIAL PRIMARY KEY,
            product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
            image_url VARCHAR(500) NOT NULL,
            alt_text VARCHAR(250) NOT NULL,
            sort_order INT
          );
        `);
};

const createTagsTable = () => {
  return db.query(`
          CREATE TABLE tags (
            tag_id SERIAL PRIMARY KEY,
            tag_name VARCHAR(250) UNIQUE NOT NULL
          );
        `);
};

const createShopTagsTable = () => {
  return db.query(`
          CREATE TABLE shop_tag (
            shop_id INT REFERENCES products(product_id) ON DELETE CASCADE,
            tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE,
            PRIMARY KEY (shop_id, tag_id)
          );
        `);
};

const createFavouriteShopsTable = () => {
  return db.query(`
          CREATE TABLE favourite_shops (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            shop_id INT REFERENCES shops(shop_id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),
            PRIMARY KEY (user_id, shop_id)
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

const insertUsers = (data) => {
  const formatted = data.map(
    ({
      first_name,
      last_name,
      username,
      date_of_birth,
      email,
      password_hash,
      created_at,
      is_admin,
      last_login,
    }) => [
      first_name,
      last_name,
      username,
      date_of_birth,
      email,
      password_hash,
      created_at,
      is_admin,
      last_login,
    ]
  );
  const query = format(
    `INSERT INTO users (
      first_name,
      last_name,
      username,
      date_of_birth,
      email,
      password_hash,
      created_at,
      is_admin,
      last_login) VALUES %L RETURNING *;`,
    formatted
  );
  return db.query(query);
};

const insertCategories = (data) => {
  const formatted = data.map(({ name, slug }) => [name, slug]);
  const query = format(
    `INSERT INTO categories (category_name, category_description) VALUES %L RETURNING *;`,
    formatted
  );
  return db.query(query);
};

const insertShops = (data) => {
  const formatted = data.map(
    ({
      shop_name,
      shop_description,
      shop_url,
      logo_url,
      location,
      source_type,
      created_at,
      updated_at,
      category_id,
    }) => [
      shop_name,
      shop_description,
      shop_url,
      logo_url,
      location,
      source_type,
      created_at,
      updated_at,
      category_id,
    ]
  );

  const query = format(
    `INSERT INTO shops (      
      shop_name,
      shop_description,
      shop_url,
      logo_url,
      location,
      source_type,
      created_at,
      updated_at,
      category_id) VALUES %L RETURNING *;`,
    formatted
  );
  return db.query(query);
};

const insertProducts = (data) => {
  const formatted = data.map(
    ({
      product_name,
      product_description,
      price_in_pence,
      product_url,
      colour,
      size,
      created_at,
      updated_at,
      is_active,
      shop_id,
    }) => [
      product_name,
      product_description,
      price_in_pence,
      product_url,
      colour,
      size,
      created_at,
      updated_at,
      is_active,
      shop_id,
    ]
  );
  const query = format(
    `INSERT INTO products (product_name, product_description, price_in_pence, 
    product_url, colour, size, created_at, updated_at, is_active,shop_id) VALUES %L RETURNING *;`,
    formatted
  );
  return db.query(query);
};

const insertProductImages = (data) => {
  const formatted = data.map(
    ({ product_id, image_url, alt_text, sort_order }) => [
      product_id,
      image_url,
      alt_text,
      sort_order,
    ]
  );

  const sql = format(
    `INSERT INTO product_images (product_id, image_url,alt_text,sort_order)
     VALUES %L RETURNING *;`,
    formatted
  );

  return db.query(sql);
};

const insertShopTag = (data) => {
  const formatted = data.map(({ tag_name }) => [tag_name]);

  const query = format(
    `INSERT INTO tags ( tag_name)
     VALUES %L RETURNING *;`,
    formatted
  );

  return db.query(query);
};

const insertShopTagMap = (data) => {
  const formatted = data.map(({ shop_id, tag_id }) => [shop_id, tag_id]);

  const query = format(
    `INSERT INTO shop_tag (shop_id, tag_id)
     VALUES %L RETURNING *;`,
    formatted
  );

  return db.query(query);
};

const insertFavouriteShops = (data) => {
  const formatted = data.map(({ user_id, shop_id, created_at }) => [
    user_id,

    shop_id,
    created_at,
  ]);

  const query = format(
    `INSERT INTO favourite_shops (user_id,shop_id, created_at)
     VALUES %L RETURNING *;`,
    formatted
  );
  return db.query(query);
};

module.exports = seed;
