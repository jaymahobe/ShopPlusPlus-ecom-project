const express = require("express");
const {
  createUser,
  loginUserAuth,
  checkJWTAuth,
  ChangePasswordRequest,
  logOutUser,
} = require("../controller/Auth");
const passport = require("passport");

const router = express.Router();
// base path in index file
router
  .post("/signup", createUser)
  .get("/check", passport.authenticate("jwt"), checkJWTAuth)
  .post("/login", passport.authenticate("local"), loginUserAuth)
  .post("/change-password", ChangePasswordRequest)
  .get("/logout", logOutUser);

exports.router = router;
