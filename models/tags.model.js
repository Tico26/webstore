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
      return rows;
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
      return rows;
    });
};

exports.removeTag = () => {};

exports.removeTagFromShop = () => {};
