const mongoose = require("mongoose");
const { Schema } = mongoose;
const companiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ntn: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const companies = mongoose.model("companies", companiesSchema);

module.exports = companies;
