const mongoose = require("mongoose");

const SalseSchema = new mongoose.Schema({
    userEmail: { type: String },
    CustomarId: { type: mongoose.Schema.Types.ObjectId },
    vatTex: { type: Number },
    discount: { type: Number },
    grandTotal: { type: Number },
    details: { type: String },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const SalseModel = mongoose.model("salse", SalseSchema);
module.exports = SalseModel;
