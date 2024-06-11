const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  userEmail: { type: String },
  name: { type: String },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const BrandModel = mongoose.model('brands', brandSchema);

module.exports = BrandModel;
