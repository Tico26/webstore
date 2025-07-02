const {
  fetchAllUsers,
  fetchUserById,
  postUser,
  authenticateUserModel,
  removeUser,
} = require("../models/users.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await fetchAllUsers();
    res.status(200).send({ allUsers });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await fetchUserById(user_id);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      date_of_birth,
      username,
      password_hash,
      is_admin,
    } = req.body;
    const user = await postUser(
      first_name,
      last_name,
      email,
      date_of_birth,
      username,
      password_hash,
      is_admin
    );
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.authenticateUser = async (req, res, next) => {
  try {
    const { email, username, password_hash } = req.body;
    authenticateUserModel(email, username, password_hash);
    res.status(200).send("Successful login");
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const {
      first_name,
      last_name,
      email,
      date_of_birth,
      username,
      password_hash,
      is_admin,
    } = req.body;

    res.status(200).send({
      first_name,
      last_name,
      email,
      date_of_birth,
      username,
      password_hash,
      is_admin,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    await removeUser(user_id);
    res.status(200).send(`Succefully Deleted User: ${user_id}`);
  } catch (err) {
    next(err);
  }
};
