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

exports.postImage = (productId) => {};

exports.removeImage = (imageId) => {};
