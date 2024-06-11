
const  mongoose  = require("mongoose");
const CreateService = require("../Common/CreateService")
const detailsService = require("../Common/DetailsService");
const DropDownService = require("../Common/DropDownService");
const ListService = require("../Common/ListService.js");
const updateServece = require("../Common/UpdateService");
const BrandModel =require("../Models/BrandModel")
const AssociateVerificationService=require("../Common/AssociateVarification.js")
const ProductModel=require("../Models/product/ProductModel.js");
const deleteService = require("../Common/deleteServece.js");

// create Brand start
exports.CreateBrand=async (req,res)=>{
    const result= await CreateService(req,BrandModel)
    if(result){
        res.status(200).json({status:"success",data:result})
    }else{
        res.status(200).json({status:"fail",data:"not create your Products"})
    }
}
// create Brand end

// brand details start
   exports.BrandDetails=async(req,res)=>{
   try{
       const result= await detailsService(req,BrandModel)
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
// brand details end

// updateBrand start
  exports.updateBrand=async(req,res)=>{
    const result= await updateServece(req,BrandModel)
    res.status(200).json({status:"success",data:result,})
  }
// updateBrand end

// dropdwon start 
exports.BrandDropdwon=async(req,res)=>{
  const result= await DropDownService(req,BrandModel,{_id:1,name:1})
  res.status(200).json({status:"success",data:result,})
}
// dropdwon end
// listSevice start 

exports.Brandlist=async(req,res)=>{
let searchRegex={$regex:req.params.searchKeyword, $options:"i"}
let array=[{name:searchRegex}]
const result= await ListService(req,BrandModel,array)
 if(result){
   res.status(200).json({status:"success",data:result})
 }
 else{
  res.status(200).json({status:"fail"})
 }
}
// listSevice end

// deleteDrand start
// Assuming AssociateVerificationService is defined in another file



exports.deleteBrand = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    let deleteId = req.params.id;

    if (!ObjectId.isValid(deleteId)) {
      console.log(`Invalid BrandId: ${deleteId}`);
      return res.status(200).json({ status: "fail", data: "Invalid BrandId" });
    }

    const id = new ObjectId(deleteId);

    const isAssociated = await AssociateVerificationService({ brandId: id }, ProductModel);
    if (isAssociated) {
      console.log(`Brand is associated with a product: ${id}`);
      return res.status(200).json({ status: "fail", data: "Brand is associated with a product" });
    }

    const result = await deleteService(req, BrandModel);
    if (result.data.deletedCount === 0) {
      console.log(`No brand found to delete with ID: ${id}`);
      return res.status(200).json({ status: "fail", data: "Brand not found" });
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error(`Error occurred while deleting the brand: ${err}`);
    return res.status(200).json({ status: "fail", data: "An error occurred while deleting the brand" });
  }
};