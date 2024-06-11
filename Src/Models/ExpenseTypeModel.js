const mongoose = require('mongoose');

const ExpenseTypeSchima = new mongoose.Schema({
  userEmail: { type: String },
  name: { type: String },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const ExpenseTypeModel = mongoose.model('expensestype', ExpenseTypeSchima);

module.exports = ExpenseTypeModel;
