const db = require("../db/connection.js");

exports.fetchFavouriteShops = (userId) => {
  return db
    .query(
      `SELECT * FROM favourite_shops
        WHERE user_id=$1`,
      [userId]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.postFavouriteShop = (userId, shopId) => {
  return db
    .query(
      `INSERT INTO favourite_shops
    (user_id,
    shop_id)
     VALUES ($1,$2) 
     RETURNING *`,
      [userId, shopId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchFavouriteShopAndUser = (userId, shopId) => {
  return db
    .query(
      `
      SELECT
        shops.shop_name,
        users.first_name,
        users.last_name,
        users.username
      FROM favourite_shops
      JOIN users ON favourite_shops.user_id = users.user_id
      JOIN shops ON favourite_shops.shop_id = shops.shop_id
      WHERE favourite_shops.user_id = $1
        AND favourite_shops.shop_id = $2;
      `,
      [userId, shopId]
    )
    .then(({ rows }) => rows[0]);
};

exports.deleteFavouriteShop = (userId, shopId) => {
  return db.query(
    `DELETE FROM favourite_shops 
        WHERE shop_id = $1 AND user_id =$2`,
    [shopId, userId]
  );
};
