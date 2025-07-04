const express = require("express");

const app = express();
app.use(express.json());
const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("./controllers/categories.controller");
const {
  getAllUsers,
  getUserById,
  addUser,
  authenticateUser,
  updateUser,
  deleteUser,
} = require("./controllers/users.controller");
const {
  getAllShops,
  getShopById,
  getShopsByCategory,
  addShop,
  updateShop,
  deleteShop,
} = require("./controllers/shops.controller");
const {
  getAllProducts,
  getProductById,
  getProductsFromSpecificShop,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/products.controller");

const {
  getImage,
  addImage,
  deleteImage,
} = require("./controllers/image.controller");

const {
  getAllTags,
  getAllTagsFromSpecificShop,
  createTag,
  addTagToShop,
  updateTag,
  deleteTag,
  removeTagFromShop,
} = require("./controllers/tags.controller");

const {
  getFavouriteShop,
  addFavouriteShop,
  removeFavouriteShop,
} = require("./controllers/favourites.controller");

app.get("/api/users", getAllUsers);
app.get("/api/users/:user_id", getUserById);
// //register user
app.post("/api/user", addUser);
// //authenticate user
app.post("/api/user/login", authenticateUser);
app.patch("/api/users/:user_id", updateUser);
app.delete("/api/user/:user_id", deleteUser);

app.get("/api/categories", getAllCategories);
app.get("/api/categories/:category_id", getCategoryById);
app.post("/api/categories", addCategory);
app.patch("/api/categories/:category_id", updateCategory);
app.delete("/api/categories/:category_id", deleteCategory);

app.get("/api/shops", getAllShops);
app.get("/api/shops/:shop_id", getShopById);
// //get all shops from specific category
app.get("/api/categories/:category_id/shop", getShopsByCategory);
app.post("/api/shops", addShop);
app.patch("/api/shops/:shop_id", updateShop);
app.delete("/api/shops/:shop_id", deleteShop);

app.get("/api/products", getAllProducts);
app.get("/api/products/:product_id", getProductById);
// //get all products from specific shop
app.get("/api/products/:shop_id/shop", getProductsFromSpecificShop);
app.post("/api/products", addProduct);
app.patch("/api/products/:product_id", updateProduct);
app.delete("/api/products/:product_id", deleteProduct);

// //image apis
app.get("/api/products/:image_id/image", getImage);
app.post("/api/products/:product_id/image", addImage);
app.delete("/api/product-images/:image_id", deleteImage);

app.get("/api/tags", getAllTags);
// //get all tags from a shop
app.get("/api/shops/:shop_id/tags", getAllTagsFromSpecificShop);
app.post("/api/tags", createTag);
// //add tag to shop
app.post("/api/shops/:tag_id/tags", addTagToShop);
app.patch("/api/tags/:tag_id", updateTag);
app.delete("/api/tags/:tag_id", deleteTag);
// //remove tag from shops
app.delete("/api/shops/:shop_id/:tag_id", removeTagFromShop);

// //favourite shops api
app.get("/api/users/:user_id/favourites/shops", getFavouriteShop);
app.post("/api/favourites/shops", addFavouriteShop);
app.delete("/api/favourites/shops/:shop_id", removeFavouriteShop);
module.exports = { app };
