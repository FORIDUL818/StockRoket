const CreateService = require("../Common/CreateService")
const detailsService = require("../Common/DetailsService")
const ListServiceOne = require("../Common/LIstServiceOne")
const updateServece = require("../Common/UpdateService")
const deleteService = require("../Common/deleteServece")
const expensesModel = require("../Models/expenseModel")

// createExpense start
exports.CreateExpense=async (req,res)=>{
    const result= await CreateService(req,expensesModel)
    if(result){
        res.status(200).json({status:"success",data:result})
    }else{
        res.status(200).json({status:"fail",data:"not create your Products"})
    }
}
// createExpense end
// expenseDetails start

exports.ExpenseDetails=async(req,res)=>{
    try{
        const result= await detailsService(req,expensesModel)
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
// expenseDetails end

// update Expense start
exports.updateExpense=async(req,res)=>{
    const result= await updateServece(req,expensesModel)
    res.status(200).json({status:"success",data:result,})
}
// update Expense end

// Expenselist start
exports.expenselist = async (req, res) => {
    try {
        const searchKeyword = req.params.searchKeyword;
        const searchRegex = { $regex: searchKeyword, $options: "i" };
  
        const joinOnestage = { 
            $lookup: {
                from: "expensestypes", 
                localField: "expnseTypeId", 
                foreignField: "_id", 
                as: "expense"
            }
        };
  
        const array = [
            { expnseTypeId: searchRegex },
            { amount: searchRegex },
            { description: searchRegex },
            { 'expense.name': searchRegex },
            
        ];
  
        const result = await ListServiceOne(req, expensesModel, array, joinOnestage);
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ status: "fail", data: err.message });
    }
  };
  
// Expenselist end

// expense delete start
  exports.expendseDelete=async(req,res)=>{
    try{
         let result = await deleteService(req,expensesModel)
         res.status(200).json(result)
    }catch(err){
  res.status(200).json({status:"fail",data:err})
    }
  }
// expense delete end