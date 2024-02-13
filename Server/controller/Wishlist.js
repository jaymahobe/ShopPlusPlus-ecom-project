// The code you provided is a set of functions related to managing a wishlist feature in a web application.

const { Wishlist } = require("../model/Wishlist");

exports.addToWishlist = async (req, res) => {
  const wishlist = new Wishlist(req.body);
  try {
    const item = await wishlist.save();
    const result = await item.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.callWishlistByUser = async (req, res) => {
  const { user } = req.query;

  try {
    const wishlistItems = await Wishlist.find({ user: user })
      .populate("user")
      .populate("product");
    // if (wishlistItems.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No wishlist items found for the user." });
    // }
    res.status(201).json(wishlistItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteWishlistItem = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlistItem = await Wishlist.findByIdAndDelete(id);
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(400).json(err);
  }
};
