const {
  fetchFavouriteShops,
  postFavouriteShop,
  deleteFavouriteShop,
} = require("../models/favouriteShop.model");

exports.getFavouriteShops = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const favouriteShop = await fetchFavouriteShops(user_id);
    res.status(201).send({ favouriteShop });
  } catch (err) {
    next(err);
  }
};

exports.addFavouriteShop = async (req, res, next) => {
  try {
    const { user_id, shop_id } = req.body;
    const favouriteShop = await postFavouriteShop(user_id, shop_id);
    res.status(201).send({ favouriteShop });
  } catch (err) {
    next(err);
  }
};

exports.removeFavouriteShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const { user_id } = req.body;
    await deleteFavouriteShop(shop_id, user_id);
    res
      .status(201)
      .send(`removed shop ${shop_id} from user ${user_id}'s favourite shops`);
  } catch (err) {
    next(err);
  }
};
