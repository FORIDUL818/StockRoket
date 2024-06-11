const express=require('express')
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser = require('body-parser')
const router = require('./Src/AuthRoutes/AuthRoutes')
require("dotenv").config()
const app=express()


app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGO_CONNECTION)
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err))

app.use("/api/v1",router)


app.use("*",(req,res)=>{
    res.status(404).json({status:"bad requist"})
})

module.exports=app;
