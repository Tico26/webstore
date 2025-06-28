exports.getImage = async (req, res, next) => {
  try {
    const { image_id } = req.params;
    res.status(201).send(`got image: ${image_id} `);
  } catch (err) {
    next(err);
  }
};

exports.addImage = async (req, res, next) => {
  try {
    const { image_id } = req.params;
    const { product_id, image_url, alt_text, sort_order } = req.body;
    res
      .status(201)
      .send(`added image: ${image_id} into product: ${product_id}`);
  } catch (err) {
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const { image_id } = req.params;
    res.status(201).send(`deleted image: ${image_id}`);
  } catch (err) {
    next(err);
  }
};
