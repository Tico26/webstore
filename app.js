const express = require("express");

const app = express();
app.use(express.json());

const {
  getAllUsers,
  getUserById,
  addUser,
  authenticateUser,
  updateUser,
  deleteUser,
} = require("./controllers/users.controller");

app.get("/api/users", getAllUsers);
app.get("/api/users/:user_id", getUserById);
// //register user
app.post("/api/user", addUser);
// //authenticate user
app.post("/api/user/login", authenticateUser);
app.patch("/api/users/:user_id", updateUser);
app.delete("/api/user/:user_id", deleteUser);

// app.get("/api/categories", () => {});
// app.get("/api/categories/:category_id", () => {});
// app.post("/api/categories", () => {});
// app.patch("/api/categories/:category_id", () => {});
// app.delete("/api/categories/:category_id", () => {});

// app.get("/api/shops", () => {});
// app.get("/api/shops/:shop_id", () => {});
// //get all shops from specific category
// app.get("/api/categories/:category_id/shop");
// app.post("/api/shops", () => {});
// app.patch("/api/shops/:shop_id", () => {});
// app.delete("/api/shops/:shop_id", () => {});

// app.get("/api/products", () => {});
// app.get("/api/products/:product_id", () => {});
// //get all products from specific shop
// app.get("/api/products/:product_id/shop");
// app.post("/api/products", () => {});
// app.patch("/api/products/:product_id", () => {});
// app.delete("/api/products/:product_id", () => {});

// //image apis
// app.get("api/products/:image_id/image", () => {});
// app.post("/api/products/:image_id/image", () => {});
// app.delete("/api/product-images/:image_id", () => {});

// app.get("/api/tags", () => {});
// //get all tags from a shop
// app.get("/api/shops/:shop_id/tags", () => {});
// app.post("/api/tags", () => {});
// //add tag to shop
// app.post("/api/shops/:tag_id/tags", () => {});
// app.patch("api/tags/:tag_id", () => {});
// app.delete("/api/tags/:tag_id", () => {});
// //remove tag from shops
// app.delete("/api/shops/:shop_id/:tag_id", () => {});

// //favourite shops api
// app.get("/api/users/:id/favourites/shops", () => {});
// app.post("/api/favourites/shops", () => {});
// app.delete("/api/favourites/shops/:shopId", () => {});
module.exports = { app };
