const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    cartItems: { type: [Schema.Types.Mixed], required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: "Pending" },
    totalAmt: { type: Number },
    totalItem: { type: Number },
    // todo : it will be enum type
    paymentMethod: { type: String, required: true },
    selectAddress: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

/* The code block you provided is defining a virtual property called "id" on the orderSchema. */
const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
