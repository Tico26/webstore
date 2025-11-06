const endpointsJson = require("../endpoints.json");

exports.getApi = async (req, res, next) => {
  try {
    res.status(200).send({ endpoints: endpointsJson });
  } catch (err) {
    next(err);
  }
};
