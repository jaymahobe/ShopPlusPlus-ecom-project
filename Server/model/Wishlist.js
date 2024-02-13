const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

/* The code block you provided is defining a virtual property called "id" on the wishlistSchema. */
const virtual = wishlistSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
wishlistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Wishlist = mongoose.model("Wishlist", wishlistSchema);
