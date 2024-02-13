const express = require("express");
const {
  createProduct,
  callAllProduct,
  callProductById,
  updateProductById,
  searchProducts,
} = require("../controller/Product");

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", callAllProduct)
  .get("/:id", callProductById)
  .patch("/:id", updateProductById);

exports.router = router;
