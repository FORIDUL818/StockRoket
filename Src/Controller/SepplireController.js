const CreateService = require("../Common/CreateService")
const detailsService = require("../Common/DetailsService")
const DropDownService = require("../Common/DropDownService")
const ListService = require("../Common/ListService")
const updateServece = require("../Common/UpdateService")
const saipplirModel = require("../Models/SaipleairModel")

// create sepplire start
exports.CreateSepplier=async (req,res)=>{
    const result= await CreateService(req,saipplirModel)
    if(result){
        res.status(200).json({status:"success",data:result})
    }else{
        res.status(200).json({status:"fail",data:"not create your Products"})
    }
}
// create sepplire end

// seppliar details Start
exports.SepplierDetails=async(req,res)=>{
    try{
        const result= await detailsService(req,saipplirModel)
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
exports.updateSepplair=async(req,res)=>{
    const result= await updateServece(req,saipplirModel)
    res.status(200).json({status:"success",data:result,})
  }
// seppliar update end

// sepplire Dropdwon start
exports.SepplierDropdwon=async(req,res)=>{
    const result= await DropDownService(req,saipplirModel,{_id:1,SuppliarName:1})
    res.status(200).json({status:"success",data:result,})
  }
// sepplire Dropdwon end

// start brand list
exports.seppierList=async(req,res)=>{
    let searchRegex={$regex:req.params.searchKeyword, $options:"i"}
    let array=[{SuppliarName:searchRegex},{phone:searchRegex},{addrasse: searchRegex},]
    const result= await ListService(req,saipplirModel,array)
     if(result){
       res.status(200).json({status:"success",data:result})
     }
     else{
      res.status(200).json({status:"fail"})
     }
    }
// end brand list