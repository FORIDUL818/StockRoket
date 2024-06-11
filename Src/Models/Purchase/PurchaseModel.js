
const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
    userEmail: { type: String },
    SupplierId: { type: mongoose.Schema.Types.ObjectId },
    vatTex: { type: Number },
    discount: { type: Number },
    otherCost:{type:Number},
    grandTotal: { type: Number },
    details: { type: String },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const PurchaseModel = mongoose.model("purchases", PurchaseSchema);
module.exports = PurchaseModel;
