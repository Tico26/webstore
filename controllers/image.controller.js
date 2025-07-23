const { fetchImage, removeImage } = require("../models/productImages.model");

exports.getImage = async (req, res, next) => {
  try {
    const { image_id } = req.params;
    const image = await fetchImage(image_id);
    res.status(201).send({ image });
  } catch (err) {
    next(err);
  }
};

exports.addImage = async (req, res, next) => {
  try {
    const { image_id } = req.params;
    const { product_id, image_url, alt_text, sort_order } = req.body;
    const image = await postImage(
      image_id,
      product_id,
      image_url,
      alt_text,
      sort_order
    );

    res.status(201).send({ image });
  } catch (err) {
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const { image_id } = req.params;
    await removeImage(image_id);
    res.status(201).send(`Succefully deleted image: ${image_id}`);
  } catch (err) {
    next(err);
  }
};
