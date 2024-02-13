/* The code you provided is a set of JavaScript functions that handle operations related to a shopping
cart. */
const { Cart } = require("../model/Cart");

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const item = await cart.save();
    const result = await item.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.callCartByUser = async (req, res) => {
  const { user } = req.query;

  try {
    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(201).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true })
      .populate("user")
      .populate("product");
    res.status(200).json(cart);
    console.log(cart);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findByIdAndDelete(id);
    res.status(201).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};
