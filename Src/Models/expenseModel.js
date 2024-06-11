const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  userEmail: { type: String },
  expnseTypeId: { type: mongoose.Schema.Types.ObjectId},
  amount: { type: Number },
  description: { type: String },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const expensesModel = mongoose.model('expenses', expensesSchema);

module.exports = expensesModel;
