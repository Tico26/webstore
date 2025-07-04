exports.getAllTags = async (req, res, next) => {
  try {
    
    res.status(201).send(`Got tags`);
  } catch (err) {
    next(err);
  }
};

exports.getAllTagsFromSpecificShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    res.status(201).send(`Got tags from shop: ${shop_id}`);
  } catch (err) {
    next(err);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const { tag_name } = req.body;
    res.status(201).send(`Created tag: ${tag_name}`);
  } catch (err) {
    next(err);
  }
};

exports.addTagToShop = async (req, res, next) => {
  try {
    const { tag_id } = req.params;
    const { shop_id } = req.body;
    res.status(201).send(`Added tag: ${tag_id} to shop: ${shop_id}`);
  } catch (err) {
    next(err);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    const { tag_id } = req.params;
    const { tag_name } = req.body;
    res.status(201).send(`Updated tag: ${tag_id} to ${tag_name}`);
  } catch (err) {
    next(err);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    const { tag_id } = req.params;
    res.status(201).send(`Deleted tag: ${tag_id}`);
  } catch (err) {
    next(err);
  }
};

exports.removeTagFromShop = async (req, res, next) => {
  try {
    const { tag_id } = req.params;
    const { shop_id } = req.body;
    res.status(201).send(`Deleted tag: ${tag_id} from shop ${shop_id}`);
  } catch (err) {
    next(err);
  }
};
