/* This code is a set of controller functions for handling orders in a JavaScript application. */
const { Order } = require("../model/Order");

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const item = await order.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.callOrderByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true })
      .populate("user")
      .populate("product");
    res.status(200).json(order);
    console.log(cart);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.callAllOrderForAdmin = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};
