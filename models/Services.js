const mongoose = require("mongoose");
const { Schema } = mongoose;
const servicesSchema = new Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  nameC: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  iprice: {
    type: Number,
    default: "General",
  },
  dprice: {
    type: Number,
    default: "General",
  },
});
module.exports = mongoose.model("services", servicesSchema);
