const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Feature", FeatureSchema);