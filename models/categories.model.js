const db = require("../db/connection.js");

exports.fetchAllCategories = () => {
  console.log("hit models");

  return db.query(`SELECT * FROM categories;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchCategoryById = (categoryId) => {
  return db
    .query(
      `SELECT * FROM categories
      WHERE category_id=$1;`,
      [categoryId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.postCategories = (category_name, slug) => {
  return db
    .query(
      `INSERT INTO categories
  (category_name,
    slug) 
    VALUES ($1,$2)
    RETURNING *`,
      [category_name, slug]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.patchCategories = (category_id, category_name, slug) => {
  return db
    .query(
      `UPDATE categories
        SET category_name=$1,
        slug=$2
        WHERE category_id=$3
        RETURNING *`,
      [category_name, slug, category_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeCategory = (categoryId) => {
  return db.query(
    `
    DELETE FROM categories 
    WHERE category_id=$1`,
    [categoryId]
  );
};
