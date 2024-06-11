const mongoose=require("mongoose")

const Customarschima= new mongoose.Schema({
    userEmail:{type:String},
    CustomarName:{type:String},
    phone:{type:String,unique:true},
    email:{type:String},
    addrasse:{type:String},
    createDate:{type:Date,default:Date.now()}
},{versionKey:false})

const CustomarModel=mongoose.model("customars",Customarschima)
module.exports=CustomarModel;
