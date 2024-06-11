// const mongoose=require("mongoose");

// const purchaseProductsSchima=new mongoose.Schema({
//     userEmail:{type:String},
//     purchaseId:{type: mongoose.Schema.Types.ObjectId},
//     productId:{type: mongoose.Schema.Types.ObjectId},

//     quntity:{type:Number},
//     unitCost:{type:Number},
//     total:{type:Number},

//     crateDate:{type:Date,default:Date.now()}
// },{versionKey:false})

// const purchaseProductModel=mongoose.model("purchaseproducts",purchaseProductsSchima)
// module.exports=purchaseProductModel;
const mongoose = require("mongoose");

const PurchaseProductsSchema = new mongoose.Schema({
    userEmail: { type: String },
    purchaseId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const PurchaseProductModel = mongoose.model("purchaseproducts", PurchaseProductsSchema);
module.exports = PurchaseProductModel;
