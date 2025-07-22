const {
  fetchAllShops,
  fetchShopById,
  fetchShopsFromCategory,
  postShop,
  patchShop,
  removeShop,
} = require("../models/shops.model");

exports.getAllShops = async (req, res, next) => {
  try {
    const allShops = await fetchAllShops();
    res.status(200).send({ allShops });
  } catch (err) {
    next(err);
  }
};

exports.getShopById = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const shop = await fetchShopById(shop_id);
    res.status(200).send({ shop });
  } catch (err) {
    next(err);
  }
};

exports.getShopsByCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const shopsByCategory = await fetchShopsFromCategory(category_id);
    res.status(200).send({ shopsByCategory });
  } catch (err) {
    next(err);
  }
};

exports.addShop = async (req, res, next) => {
  try {
    const {
      shop_name,
      shop_description,
      shop_url,
      logo_url,
      location,
      source_type,
      category_id,
    } = req.body;
    const shop = await postShop(
      shop_name,
      shop_description,
      shop_url,
      logo_url,
      location,
      source_type,
      category_id
    );
    res.status(201).send({ shop });
  } catch (err) {
    next(err);
  }
};

exports.updateShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const {
      shop_name,
      shop_description,
      shop_url,
      logo_url,
      location,
      source_type,
      category_id,
    } = req.body;
    const shop = await patchShop(
      shop_name,
      shop_description,
      shop_url,
      logo_url,
      location,
      source_type,
      category_id,
      shop_id
    );
    res.status(200).send({ shop });
  } catch (err) {
    next(err);
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    await removeShop(shop_id);
    res.status(201).send(`succefully deleted shop with id: ${shop_id}`);
  } catch (err) {
    next(err);
  }
};
