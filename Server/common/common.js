const passport = require("passport");
const mongoose = require("mongoose");

exports.filteredUser = (user) => {
  return { id: user.id, role: user.role };
};
exports.cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }

  console.log("cookies passing", token);

  return token;
};

exports.isAuth = (req, res, done) => {
  console.log("isAuth");
  return passport.authenticate("jwt");
};

exports.database = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to the database");
};
// await mongoose.connect("mongodb://127.0.0.1:27017/shoplusplus");
