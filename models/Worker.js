const mongoose = require("mongoose");
const { Schema } = mongoose;
const workerSchema = new Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  nameC: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
});
const worker = mongoose.model("worker", workerSchema);

module.exports = worker;
