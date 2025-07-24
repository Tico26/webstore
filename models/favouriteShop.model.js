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
      return rows;
    });
};

exports.deleteFavouriteShop = (shopId, userId) => {
  return db.query(
    `DELETE FROM favourite_shops 
        WHERE shop_id = $1 AND user_id =$2`,
    [shopId, userId]
  );
};
