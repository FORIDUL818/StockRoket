const CreateService = require("../Common/CreateService")
const detailsService = require("../Common/DetailsService")
const DropDownService = require("../Common/DropDownService")
const ListService = require("../Common/ListService")
const updateServece = require("../Common/UpdateService")
const CustomarModel = require("../Models/CustomarModel")


exports.CreateCustomar=async (req,res)=>{
    const result= await CreateService(req,CustomarModel)
    if(result){
        res.status(200).json({status:"success",data:result})
    }else{
        res.status(200).json({status:"fail",data:"not create your Products"})
    }
}

exports.CustomarDetails=async(req,res)=>{
    try{
        const result= await detailsService(req,CustomarModel)
        if(result){
         res.status(200).json({status:"success",data:result})
        }
        else{
         res.status(200).json({data:"not authintik information"})
        }
    }catch(err){
      res.status(200).json({status:"fail",data:err})
    }
    }
// seppliar details end


// seppliar update start
exports.updateCustomar=async(req,res)=>{
    const result= await updateServece(req,CustomarModel)
    res.status(200).json({status:"success",data:result,})
  }
// seppliar update end

// sepplire Dropdwon start
exports.CustomarDropdwon=async(req,res)=>{
    const result= await DropDownService(req,CustomarModel,{_id:1,CustomarName:1})
    res.status(200).json({status:"success",data:result,})
  }
// sepplire Dropdwon end

// start brand list
exports.CustomarList=async(req,res)=>{
    let searchRegex={$regex:req.params.searchKeyword, $options:"i"}
    let array=[{CustomarName:searchRegex},{phone:searchRegex},{addrasse: searchRegex},]
    const result= await ListService(req,CustomarModel,array)
     if(result){
       res.status(200).json({status:"success",data:result})
     }
     else{
      res.status(200).json({status:"fail"})
     }
    }