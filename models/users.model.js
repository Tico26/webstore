const db = require("../db/connection.js");

exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchUserById = (userId) => {
  return db
    .query(
      `SELECT * FROM users
       WHERE user_id=$1;`,
      [userId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.postUser = (
  first_name,
  last_name,
  email,
  date_of_birth,
  username,
  password_hash,
  is_admin
) => {
  return db
    .query(
      `INSERT INTO users
    (first_name,
     last_name,
     email,
     date_of_birth,
     username,
     password_hash,
     is_admin) 
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
      [
        first_name,
        last_name,
        email,
        date_of_birth,
        username,
        password_hash,
        is_admin,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.authenticateUserModel = (email, username, password_hash) => {
  return db
    .query(
      `SELECT * FROM users
        WHERE (email = $1 AND password_hash=$3) OR (username = $2 AND password_hash=$3);`,
      [email, username, password_hash]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.patchUser = (
  userId,
  first_name,
  last_name,
  email,
  date_of_birth,
  username,
  password_hash,
  is_admin
) => {
  return db
    .query(
      `
    UPDATE users
      SET 
      first_name=$1,
      last_name=$2,
      email=$3,
      date_of_birth=$4,
      username=$5,
      password_hash=$6,
      is_admin=$7
    WHERE user_id=$8
    RETURNING *
    `,
      [
        first_name,
        last_name,
        email,
        date_of_birth,
        username,
        password_hash,
        is_admin,
        userId,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
exports.removeUser = (userId) => {
  return db.query(`DELETE FROM users WHERE user_id = $1`, [userId]);
};
