exports.getAllUsers = async (req, res, next) => {
  try {
    console.log("All users");
    return;
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`reached user: ${user_id}`);
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
      created_at,
      is_admin,
      last_login,
    } = req.body;
    console.log(first_name);
    res.status(201).send("reached add");
  } catch (err) {
    next(err);
  }
};

exports.authenticateUser = async (req, res, next) => {
  try {
    const { email, password_hash } = req.body;
    console.log(email);
    res.status(201).send(email);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { first_name } = req.body;
    console.log(first_name);
    res.status(201).send({ first_name });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`reached delete`);
    res.status(201).send(`succefully deleted: ${user_id}`);
  } catch (err) {
    next(err);
  }
};
