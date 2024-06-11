const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  userEmail: { type: String },
  name: { type: String },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const CategoyModel = mongoose.model('categoris', categorySchema);

module.exports = CategoyModel;

