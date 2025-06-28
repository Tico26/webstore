exports.getAllShops = async (req, res, next) => {
  try {
    res.status(201).send("reached all shops");
  } catch (err) {
    next(err);
  }
};

exports.getShopById = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    res.status(201).send(`reached shop id: ${shop_id}`);
  } catch (err) {
    next(err);
  }
};

exports.getShopsByCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    res.status(201).send(`all shops with category id: ${category_id}`);
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
    res.status(201).send(`created shop ${shop_name}`);
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
    res.status(201).send({ shop_name });
  } catch (err) {
    next(err);
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    console.log(`reached delete`);
    res.status(201).send(`succefully deleted shop with id: ${shop_id}`);
  } catch (err) {
    next(err);
  }
};
