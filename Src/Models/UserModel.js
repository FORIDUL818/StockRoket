const mongoose=require("mongoose")
const bcrypt = require('bcrypt');

const userschima= new mongoose.Schema({
    fristName:{
        type:String,
        required:true,
        maxlength:[60,"you can maximum length is 60 carecters"],
        minlength:[3,"you can minimum length is 3 carecters"],
    },
    lastName:{
        type:String,
        required:true,
        maxlength:[60,"you can maximum length is 60 carecters"],
        minlength:[3,"you can minimum length is 3 carecters"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate:{
            validator:function (v){
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
                return emailRegex;
            },
            message:"input your correct email",
        }
    }, 
    password:{
        set:(v) => bcrypt.hashSync(v, bcrypt.genSaltSync(5)),
        type: String,
        required: true,
        maxlength:[60,"you can maximum length is 60 carecters"],
        minlength:[3,"you can minimum length is 3 carecters"],
        trim:true,
      },
    photo:String,
    crateDate:{type:Date,default:Date.now()}
},{versionKey:false})

const userModel=mongoose.model("users",userschima)
module.exports=userModel;
