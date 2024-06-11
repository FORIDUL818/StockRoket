const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
    userEmail: { type: String },
    CustomarId: { type: mongoose.Schema.Types.ObjectId },
    vatTex: { type: Number },
    discount: { type: Number },
    grandTotal: { type: Number },
    details: { type: String },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const returnModel = mongoose.model("return", ReturnSchema);
module.exports = returnModel;
