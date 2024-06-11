const mongoose=require("mongoose")

const saiplairschima= new mongoose.Schema({
    userEmail:{type:String},
    SuppliarName:{type:String},
    phone:{type:String,unique:true},
    email:{type:String},
    addrasse:{type:String},
    createDate:{type:Date,default:Date.now()}
},{versionKey:false})

const saipplirModel=mongoose.model("saippliars",saiplairschima)
module.exports=saipplirModel;
