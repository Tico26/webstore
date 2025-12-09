const db = require("../db/connection.js");

exports.fetchAllTags = () => {
  return db.query(`SELECT * FROM tags`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchTagsFromShop = (shopId) => {
  return db
    .query(
      `SELECT * FROM shop_tag
        WHERE shop_id=$1`,
      [shopId]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.postTag = (tagName) => {
  return db
    .query(
      `INSERT INTO tags
      (tag_name)
      VALUES ($1)
      RETURNING *`,
      [tagName]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.postTagToShop = (tagId, shopId) => {
  return db
    .query(
      `
    INSERT INTO shop_tag
      (tag_id,
      shop_id)
      VALUES ($1,$2)
      RETURNING *`,
      [tagId, shopId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
exports.fetchTagAndShopNames = (tagId, shopId) => {
  return db
    .query(
      `
      SELECT 
        shop_tag.*,
        tags.tag_name,
        shops.shop_name
      FROM shop_tag
      JOIN tags ON shop_tag.tag_id = tags.tag_id
      JOIN shops ON shop_tag.shop_id = shops.shop_id
      WHERE shop_tag.tag_id = $1
        AND shop_tag.shop_id = $2;
      `,
      [tagId, shopId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.patchTag = (tagId, tagName) => {
  return db
    .query(
      `Update tags
      SET
      tag_name=$1
      WHERE tag_id=$2 
      RETURNING *`,
      [tagName, tagId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeTag = (tagId) => {
  return db.query(
    `DELETE FROM tags 
    WHERE tag_id = $1`,
    [tagId]
  );
};

exports.unlinkTagFromShop = (tagId, shopId) => {
  return db.query(
    `DELETE FROM shop_tag
    WHERE shop_id = $1
    AND
    tag_id=$2`,
    [shopId, tagId]
  );
};
