const db = require("../db/connection.js");
exports.fetchAllShops = () => {
  return db.query(`SELECT * FROM shops;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchShopById = (shopId) => {
  return db
    .query(
      `SELECT * FROM shops
    WHERE shop_id=$1;`,
      [shopId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchShopsFromCategory = (categoryId) => {
  return db
    .query(
      `SELECT * FROM shops
    WHERE category_id=$1;`,
      [categoryId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.postShop = (
  shopName,
  shopDescription,
  shopUrl,
  logoUrl,
  location,
  source_type,
  categoryId
) => {
  return db
    .query(
      `INSERT INTO shops
(shop_name,
    shop_description,
    shop_url,
    logo_url,
    location,
    source_type,
    category_id) 
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
      [
        shopName,
        shopDescription,
        shopUrl,
        logoUrl,
        location,
        source_type,
        categoryId,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.patchShop = (
  shopName,
  shopDescription,
  shopUrl,
  logoUrl,
  location,
  source_type,
  categoryId,
  shopId
) => {
  return db
    .query(
      `Update shops
    SET
    shop_name=$1,
    shop_description=$2,
    shop_url=$3,
    logo_url=$4,
    location=$5,
    source_type=$6,
    category_id=$7
    WHERE shop_id=$8 
    RETURNING *`,
      [
        shopName,
        shopDescription,
        shopUrl,
        logoUrl,
        location,
        source_type,
        categoryId,
        shopId,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeShop = (shopId) => {
  return db.query(`DELETE FROM shops WHERE shop_id = $1`, [shopId]);
};
