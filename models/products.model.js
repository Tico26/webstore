const db = require("../db/connection.js");

exports.fetchAllProducts = () => {
  return db.query(`SELECT * FROM products;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchProductById = (productId) => {
  return db
    .query(
      `SELECT * FROM products
        WHERE product_id=$1;`,
      [productId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchProductsFromShop = (shopId) => {
  return db
    .query(
      `SELECT * FROM products
        WHERE shop_id=$1`,
      [shopId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.postProduct = (
  shopId,
  productName,
  productDescription,
  priceInPence,
  productUrl,
  colour,
  size,
  isActive
) => {
  return db
    .query(
      `INSERT INTO products
        (shop_id,
        product_name,
        product_description,
        price_in_pence,
        product_url,
        colour,
        size,
        is_active) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *`,
      [
        shopId,
        productName,
        productDescription,
        priceInPence,
        productUrl,
        colour,
        size,
        isActive,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.patchProduct = (
  productName,
  productDescription,
  priceInPence,
  productUrl,
  colour,
  size,
  isActive,
  productId
) => {
  return db
    .query(
      `
    Update products
    SET
    product_name=$1,
    product_description=$2,
    price_in_pence=$3,
    product_url=$4,
    colour=$5,
    size=$6,
    is_active=$7
    WHERE product_id=$8 
    RETURNING *`,
      [
        productName,
        productDescription,
        priceInPence,
        productUrl,
        colour,
        size,
        isActive,
        productId,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeProduct = (productID) => {
  return db.query(`DELETE FROM products WHERE product_id = $1`, [productID]);
};
