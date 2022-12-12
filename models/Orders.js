const mongoose = require("mongoose");
const { Schema } = mongoose;
const ordersSchema = new Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },

  name: {
    type: String,
    required: true,
  },
  nameC: {
    type: String,
    required: true,
  },
  nameU: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: "General",
  },
  customerAddress: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: "General",
  },
  month: {
    type: Number,
    default: "General",
  },
  type: {
    type: String,
    default: "General",
  },
});
module.exports = mongoose.model("orders", ordersSchema);
