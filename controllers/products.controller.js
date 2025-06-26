exports.getAllProducts = async (req, res, next) => {
  try {
    res.status(201).send("reached all shops");
  } catch (err) {
    next(err);
  }
};
