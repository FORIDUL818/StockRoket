const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userEmail: { type: String },
  name: { type: String },
  details: { type: String },
  unit: { type: String },
  images: [{ type: String }], // Array of strings for images
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
