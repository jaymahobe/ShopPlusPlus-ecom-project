const express = require("express");
const {
  createOrder,
  callOrderByUser,
  deleteOrder,
  updateOrder,
  callAllOrderForAdmin,
} = require("../controller/Order");

const router = express.Router();
//  "/" base path in index file
router
  .post("/", createOrder)
  .get("/", callOrderByUser)
  .get("/admin", callAllOrderForAdmin)
  .delete("/:id", deleteOrder)
  .patch("/admin/:id", updateOrder);

exports.router = router;
