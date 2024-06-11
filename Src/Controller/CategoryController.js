

const  mongoose = require("mongoose")
const CreateService = require("../Common/CreateService")
const detailsService = require("../Common/DetailsService")
const DropDownService = require("../Common/DropDownService")
const ListService = require("../Common/ListService.js")
const updateServece = require("../Common/UpdateService")
const CategoyModel = require("../Models/categoryModel")
const AssociateVerificationService = require("../Common/AssociateVarification.js")
const ProductModel = require("../Models/product/ProductModel.js")
const deleteService = require("../Common/deleteServece.js")

// createCategory start
exports.CategoryCreate=async(req,res)=>{
    const result= await CreateService(req,CategoyModel)
    if(result){
        res.status(200).json({status:"success",data:result})
    }else{
        res.status(200).json({status:"fail",data:"not create your Products"})
    }
}
// createCategory end

// categoryDetails start
exports.categoryDetails=async(req,res)=>{
    const result= await detailsService(req,CategoyModel)
    if(result){
        res.status(200).json({status:"success",data:result})
    }else{
        res.status(200).json({status:"fail",data:"not create your Products"})
    }
}
// categoryDetails end
//  update category start
exports.CategoryUpdate=async(req,res)=>{
    const result= await updateServece(req,CategoyModel)
    res.status(200).json({status:"success",data:result,})
  }
//  update category end

// Category-dropdown start
exports.CategoryDropdwon=async(req,res)=>{
    const result= await DropDownService(req,CategoyModel,{_id:1,name:1})
    res.status(200).json({status:"success",data:result,})
}
// Category-dropdown end

// Category-BranList start
exports.CategoryList=async(req,res)=>{
    let searchRegex={$regex:req.params.searchKeyword, $options:"i"}
    let array=[{name:searchRegex}]
    const result= await ListService(req,CategoyModel,array)
     if(result){
       res.status(200).json({status:"success",data:result})
     }
     else{
      res.status(200).json({status:"fail"})
     }
    }
// Category-BranList end     

//category delete start

exports.deleteCategory = async (req, res) => {
    try {
      const ObjectId = mongoose.Types.ObjectId;
      let deleteId = req.params.id;
  
      if (!ObjectId.isValid(deleteId)) {
        return res.status(200).json({ status: "fail", data: "Invalid catagoryId" });
      }
  
      const id = new ObjectId(deleteId);
  
      const isAssociated = await AssociateVerificationService({ categoryId:id }, ProductModel);
      if (isAssociated) {
        console.log(`Brand is associated with a product: ${id}`);
        return res.status(200).json({ status: "fail", data: "category is associated with a product" });
      }
  
      const result = await deleteService(req, CategoyModel);
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
//category delete end