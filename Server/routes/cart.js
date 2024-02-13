const express = require("express");
const {
  addToCart,
  deleteCartItem,
  updateCart,
  callCartByUser,
} = require("../controller/Cart");

const router = express.Router();
// base path in index file
router
  .post("/", addToCart)
  .get("/", callCartByUser)
  .delete("/:id", deleteCartItem)
  .patch("/:id", updateCart);

exports.router = router;
