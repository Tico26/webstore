const {
  fetchAllProducts,
  fetchProductById,
  fetchProductsFromShop,
  postProduct,
  patchProduct,
  removeProduct,
} = require("../models/products.model");

exports.getAllProducts = async (req, res, next) => {
  try {
    const getAllProducts = await fetchAllProducts();
    res.status(201).send({ getAllProducts });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const product = await fetchProductById(product_id);
    res.status(201).send({ product });
  } catch (err) {
    next(err);
  }
};

exports.getProductsFromSpecificShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const products = await fetchProductsFromShop(shop_id);
    res.status(201).send({ products });
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
      price_in_pence,
      product_url,
      colour,
      size,
      is_active,
    } = req.body;
    const product = await postProduct(
      shop_id,
      product_name,
      product_description,
      price_in_pence,
      product_url,
      colour,
      size,
      is_active
    );
    res.status(201).send({ product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const {
      product_name,
      product_description,
      price_in_pence,
      product_url,
      colour,
      size,
      is_active,
    } = req.body;
    const product = await patchProduct(
      product_name,
      product_description,
      price_in_pence,
      product_url,
      colour,
      size,
      is_active,
      product_id
    );
    res.status(201).send({ product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    await removeProduct(product_id);
    res
      .status(201)
      .send(`Successfully deleted product with ID: ${product_id} `);
  } catch (err) {
    next(err);
  }
};
