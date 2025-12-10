const {
  fetchFavouriteShopAndUser,
  postFavouriteShop,
  deleteFavouriteShop,
  fetchFavouriteShops,
} = require("../models/favouriteShop.model");
const { fetchShopById } = require("../models/shops.model");

exports.getFavouriteShops = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const favouriteShops = await fetchFavouriteShops(user_id);
    res.status(201).send({ favouriteShops });
  } catch (err) {
    next(err);
  }
};

exports.addFavouriteShop = async (req, res, next) => {
  try {
    const { user_id, shop_id } = req.body;
    const newFavouriteShops = await postFavouriteShop(user_id, shop_id);
    const favouriteShop = await fetchFavouriteShopAndUser(
      newFavouriteShops.user_id,
      newFavouriteShops.shop_id
    );
    res.status(201).send({ favouriteShop });
  } catch (err) {
    next(err);
  }
};

exports.removeFavouriteShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const { user_id } = req.body;
    await deleteFavouriteShop(user_id, shop_id);
    const shop = await fetchShopById(shop_id);
    res
      .status(201)
      .send(`Successfully removed "${shop.shop_name}" from favourite shops.`);
  } catch (err) {
    next(err);
  }
};
