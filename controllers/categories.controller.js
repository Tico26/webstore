exports.getAllCategories = async (req, res, next) => {
  try {
    res.status(201).send("reached all categories");
  } catch (err) {
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    res.status(201).send(`you've reached category: ${category_id}`);
  } catch (err) {
    next(err);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const { category_name, slug } = req.body;
    res.status(201).send(`you've posted category: ${category_name}`);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const { category_name, slug } = req.body;
    res.status(201).send(`you've updated category: ${category_name}`);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const { category_name, slug } = req.body;
    res.status(201).send(`you've deleted category: ${category_name}`);
  } catch (err) {
    next(err);
  }
};
