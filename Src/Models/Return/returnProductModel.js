const mongoose = require("mongoose");

const returnProductsSchema = new mongoose.Schema({
    userEmail: { type: String },
    returnId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const returnProductModel = mongoose.model("returnproducts", returnProductsSchema);
module.exports = returnProductModel;
