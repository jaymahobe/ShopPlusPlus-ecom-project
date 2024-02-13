const express = require("express");
const router = express.Router();

const { callUserById, updateUser } = require("../controller/User");

//  /users is already added in base path
router.get("/:id", callUserById).patch("/:id", updateUser);

exports.router = router;
