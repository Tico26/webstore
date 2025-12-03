const {
  postCategories,
  fetchCategoryById,
  fetchAllCategories,
  patchCategories,
  removeCategory,
} = require("../models/categories.model");

exports.getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await fetchAllCategories();
    res.status(200).send({ allCategories });
  } catch (err) {
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const categories = await fetchCategoryById(category_id);
    res.status(200).send({ categories });
  } catch (err) {
    next(err);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const { category_name, category_description } = req.body;
    const category = await postCategories(category_name, category_description);
    res.status(201).send({ category });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const { category_name, category_description } = req.body;
    const category = await patchCategories(
      category_id,
      category_name,
      category_description
    );
    res.status(201).send({ category });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    await removeCategory(category_id);
    res.status(201).send(`Successfully deleted ${category_id}`);
  } catch (err) {
    next(err);
  }
};
