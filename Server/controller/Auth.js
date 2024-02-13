const { filteredUser } = require("../common/common");
const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_ENV_KEY = "SECRET_ENV_KEY";

/* The code provided is a module that exports several functions related to user authentication and
password management. Here is a breakdown of each function: */
exports.createUser = async (req, res) => {
  try {
    const saltRounds = 16;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const user = new User({ ...req.body, password: hash });
      const doc = user.save();
      req.login(filteredUser(doc), (err) => {
        if (err) {
          res.status(401).json(err);
        } else {
          let token = jwt.sign(filteredUser(doc), SECRET_ENV_KEY);
          res
            .cookie("jwt", token, {
              expires: new Date(Date.now() + 3600000), // cookies will be vanished after 1 hour
              httpOnly: true,
            })
            .status(201)
            .json({ id: user.id, role: user.role });
        }
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUserAuth = async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: req.user.id, role: req.user.role });
};

exports.logOutUser = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res
    .cookie("jwt", "", {
      expires: new Date(0),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.checkJWTAuth = async (req, res) => {
  if (req.user) {
    res.json({ id: req.user.id, role: req.user.role });
  } else {
    res.sendStatus(401);
  }
};

exports.ChangePasswordRequest = async (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    // Fetch the user by email from the database
    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 16);

    const updatedUser = await User.updateOne(
      { email },
      { password: hashedNewPassword },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400, 504).json({ message: "Error changing password" });
  }
};
