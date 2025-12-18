const db = require("../db/connection.js");

exports.fetchImage = (imageId) => {
  return db
    .query(
      `
        SELECT * FROM product_images
        WHERE image_id = $1`,
      [imageId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.postImage = (productId, imageUrl, altText, sortOrder) => {
  return db
    .query(
      ` INSERT INTO product_images
        (product_id,
        image_url,
        alt_text,
        sort_order)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
      [productId, imageUrl, altText, sortOrder]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.patchImage = (imageId, imageUrl, altText, sortOrder) => {
  return db
    .query(
      `Update product_images
        SET
        image_url=$1,
        alt_text=$2,
        sort_order=$3
        WHERE image_id=$4 
        RETURNING *`,
      [imageUrl, altText, sortOrder, imageId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeImage = (imageId) => {
  return db.query(
    `DELETE FROM product_images
        WHERE image_id = $1`,
    [imageId]
  );
};
