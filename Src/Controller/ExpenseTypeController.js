const  mongoose  = require("mongoose")
const AssociateVerificationService = require("../Common/AssociateVarification")
const CreateService = require("../Common/CreateService")
const detailsService = require("../Common/DetailsService")
const DropDownService = require("../Common/DropDownService")
const ListService = require("../Common/ListService")
const updateServece = require("../Common/UpdateService")
const deleteService = require("../Common/deleteServece")
const ExpenseTypeModel = require("../Models/ExpenseTypeModel")
const expensesModel = require("../Models/expenseModel")
// CreateExpenseType start
exports.CreateExpenseType=async (req,res)=>{
    const result= await CreateService(req,ExpenseTypeModel)
    if(result){
        res.status(200).json({status:"success",data:result})
    }else{
        res.status(200).json({status:"fail",data:"not create your Products"})
    }
}
// CreateExpenseType end


// ExpenseTypeDetails details start
   exports.ExpenseTypeDetails=async(req,res)=>{
   try{
       const result= await detailsService(req,ExpenseTypeModel)
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
// ExpenseTypeDetails details end

// update exppensetype start
  exports.updateExpenseType=async(req,res)=>{
    const result= await updateServece(req,ExpenseTypeModel)
    res.status(200).json({status:"success",data:result,})
  }
// exppensetype end

// ExpenseTypeDropdwon start 
exports.ExpenseTypeDropdwon=async(req,res)=>{
  const result= await DropDownService(req,ExpenseTypeModel,{_id:1,name:1})
  res.status(200).json({status:"success",data:result,})
}
// ExpenseTypeDropdwon end
// ExpenseTypelist start 

exports.ExpenseTypelist=async(req,res)=>{
let searchRegex={$regex:req.params.searchKeyword, $options:"i"}
let array=[{name:searchRegex}]
const result= await ListService(req,ExpenseTypeModel,array)
 if(result){
   res.status(200).json({status:"success",data:result})
 }
 else{
  res.status(200).json({status:"fail"})
 }
}
// ExpenseTypelist end

// deleteDrand start
// Assuming AssociateVerificationService is defined in another file





exports.expenseTypeDelete = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    let deleteId = req.params.id;

    if (!ObjectId.isValid(deleteId)) {
      console.log(`Invalid BrandId: ${deleteId}`);
      return res.status(200).json({ status: "fail", data: "Invalid BrandId" });
    }

    const id = new ObjectId(deleteId);

    const isAssociated = await AssociateVerificationService({ expnseTypeId: id }, expensesModel);
    if (isAssociated) {
      console.log(`Brand is associated with a product: ${id}`);
      return res.status(200).json({ status: "fail", data: "Brand is associated with a product" });
    }

    const result = await deleteService(req, ExpenseTypeModel);
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