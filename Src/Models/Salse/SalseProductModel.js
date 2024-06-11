const mongoose = require("mongoose");

const selseProductsSchema = new mongoose.Schema({
    userEmail: { type: String },
    salseId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const salseProductModel = mongoose.model("selseproducts", selseProductsSchema);
module.exports = salseProductModel;
