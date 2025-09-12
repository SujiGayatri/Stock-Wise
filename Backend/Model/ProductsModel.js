const mongoose = require("mongoose");

const ProductMain = new mongoose.Schema({
  ID: { type: Number, required: true, unique: true },
  Name: { type: String, required: true },
  Type: { type: String },
  Color: { type: String },
  Style: { type: String },
  Occasion: { type: String },
  Fabric: { type: String },
  Size: { type: String },
  Image: { type: String },
  Number: { type: Number },
  Fit: { type: String },
  Price: { type: Number },
  Season: { type: String },
  Category: { type: String },
  embedding: { type: [Number] }
}, { timestamps: true });

module.exports = mongoose.model("Outfit", ProductMain);