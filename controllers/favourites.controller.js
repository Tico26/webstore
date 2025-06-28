exports.getFavouriteShop = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    res.status(201).send(`User ${user_id}'s favourite shops`);
  } catch (err) {
    next(err);
  }
};

exports.addFavouriteShop = async (req, res, next) => {
  try {
    const { user_id, shop_id } = req.body;
    res
      .status(201)
      .send(`added shop ${shop_id} as user ${user_id}'s favourite shop`);
  } catch (err) {
    next(err);
  }
};

exports.removeFavouriteShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const { user_id } = req.body;
    res
      .status(201)
      .send(`removed shop ${shop_id} from user ${user_id}'s favourite shops`);
  } catch (err) {
    next(err);
  }
};
