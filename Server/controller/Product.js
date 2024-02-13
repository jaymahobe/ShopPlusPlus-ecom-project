/* The code you provided is a module that exports several functions related to creating, retrieving,
and updating products in a database. */
const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

/* The `exports.callAllProduct` function is responsible for retrieving a list of products based on the
provided query parameters. */
exports.callAllProduct = async (req, res) => {
  let query = Product.find({});
  let TotalProductQuery = Product.find({});
  // queries for filter/sorting/pagination
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    TotalProductQuery = TotalProductQuery.find({ brand: req.query.brand });
  }

  if (req.query.q) {
    query = query.find({
      $or: [
        { title: { $regex: new RegExp(req.query.q, "i") } },
        { description: { $regex: new RegExp(req.query.q, "i") } },
        { brand: { $regex: new RegExp(req.query.q, "i") } },
      ],
    });
    TotalProductQuery = TotalProductQuery.find({ q: req.query.q });
  }

  if (req.query.title) {
    console.log("Title", req.query.title);
    query = query.find({ title: req.query.title });
    TotalProductQuery = TotalProductQuery.find({ title: req.query.title });
  }

  if (req.query.description) {
    console.log("description", req.query.description);
    query = query.find({ description: req.query.description });
    TotalProductQuery = TotalProductQuery.find({
      title: req.query.description,
    });
  }
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    TotalProductQuery = TotalProductQuery.find({
      category: req.query.category,
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  /* The code block you provided is used for pagination in the `callAllProduct` function. */
  if (req.query._page && req.query._limit) {
    const pageLimit = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageLimit * (page - 1)).limit(pageLimit);
  }
  let totalItems = await TotalProductQuery.count().exec();

  try {
    const items = await query.exec();
    res.set("X-Total-Count", totalItems);
    res.status(201).json(items);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.callProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await Product.findById(id);
    res.status(200).json(productById);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(productById);
  } catch (err) {
    res.status(400).json(err);
  }
};
