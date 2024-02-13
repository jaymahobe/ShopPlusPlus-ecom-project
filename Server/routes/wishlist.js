const express = require("express");
const { addToWishlist } = require("../controller/Wishlist");
const { callWishlistByUser } = require("../controller/Wishlist");
const { deleteWishlistItem } = require("../controller/Wishlist");

const router = express.Router();
// base path in index file
router
  .post("/", addToWishlist)
  .get("/", callWishlistByUser)
  .delete("/:id", deleteWishlistItem);

exports.router = router;
