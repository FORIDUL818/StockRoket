const expensesModel = require("../../Models/expenseModel");

const expenseReportSevice=async(req)=>{
    try{
      let userEmail=req.headers.email;
      let formDate=req.body.formDate;
      let Todate=req.body.Todate;

      let data=await expensesModel.aggregate([
        {$match:{userEmail,createDate:{$gte:new Date(formDate),$lte:new Date(Todate)}}},
        {
            $facet:{
                total:[{$group:{_id:0,totalAmaunt:{$sum:"$amount"}}}],
                data:[{$lookup:{from:"expensestypes",localField:"expnseTypeId",foreignField:"_id",as:"type"}}]
            }
         }
      ])
      return {status:"success",data:data}
    }
    catch(err){
      res.status(200).json({status:"fail",data:err})
    }
}
module.exports=expenseReportSevice;