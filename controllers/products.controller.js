exports.getAllProducts = async (req, res, next) => {
  try {
    res.status(201).send("reached all products");
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    res.status(201).send(`reached product id: ${product_id}`);
  } catch (err) {
    next(err);
  }
};

exports.getProductsFromSpecificShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    res.status(201).send(`all products from shop: ${shop_id}`);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const {
      shop_id,
      product_name,
      product_description,
      price_in_pennies,
      product_url,
      colour,
      size,
      is_active,
    } = req.body;
    res
      .status(201)
      .send(`added product ${product_name} to shop id: ${shop_id}`);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      product_description,
      price_in_pennies,
      product_url,
      colour,
      size,
      is_active,
    } = req.body;
    res.status(201).send(`updated product ${product_name} `);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    res.status(201).send(`deleted product: ${product_id} `);
  } catch (err) {
    next(err);
  }
};
