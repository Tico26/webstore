const {
  fetchAllTags,
  fetchTagsFromShop,
  postTag,
  postTagToShop,
  patchTag,
  removeTag,
  unlinkTagFromShop,
} = require("../models/tags.model");
exports.getAllTags = async (req, res, next) => {
  try {
    const allTags = await fetchAllTags();
    res.status(201).send({ allTags });
  } catch (err) {
    next(err);
  }
};

exports.getTagFromShop = async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const allTags = await fetchTagsFromShop(shop_id);
    res.status(200).send({ allTags });
  } catch (err) {
    next(err);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const { tag_name } = req.body;
    const tag = await postTag(tag_name);
    res.status(201).send({ tag });
  } catch (err) {
    next(err);
  }
};

exports.addTagToShop = async (req, res, next) => {
  try {
    const { tag_id } = req.params;
    const { shop_id } = req.body;
    const tag = await postTagToShop(tag_id, shop_id);
    res.status(201).send(tag);
  } catch (err) {
    next(err);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    const { tag_id } = req.params;
    const { tag_name } = req.body;
    const tag = await patchTag(tag_id, tag_name);
    res.status(200).send({ tag });
  } catch (err) {
    next(err);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    const { tag_id } = req.params;
    await removeTag(tag_id);
    res.status(201).send(`Deleted tag: ${tag_id}`);
  } catch (err) {
    next(err);
  }
};

// exports.removeTagFromShop = async (req, res, next) => {
//   try {
//     const { tag_id,shop_id } = req.params;
//     await unlinkTagFromShop(tag_id, shop_id);
//     res.status(201).send(`Deleted tag: ${tag_id} from shop ${shop_id}`);
//   } catch (err) {
//     next(err);
//   }
// };
