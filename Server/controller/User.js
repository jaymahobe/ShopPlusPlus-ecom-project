const { filteredUser } = require("../common/common");
const { User } = require("../model/User");
const bcrypt = require("bcrypt");
/* The `exports.callUserById` function is a controller function that is responsible for retrieving a
user by their ID. */
exports.callUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

/* The `exports.updateUser` function is a controller function that is responsible for updating a user's
information. */
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
