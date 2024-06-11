const expenseReportSevice = require("../Common/Report/ExpensiceReportService");
const PursesReportService = require("../Common/Report/PursesReportService");
const ReturnReportService = require("../Common/Report/ReturnReportService");
const SalseReportService = require("../Common/Report/SalseReportService");


exports.expenseReportByDate=async(req,res)=>{
    let result= await expenseReportSevice(req)
    res.status(200).json(result)
}


exports.selseReportByDate = async (req, res) => {
    let result = await SalseReportService(req);
    res.status(200).json(result);
};
exports.PursesReportByDate = async (req, res) => {
    let result = await PursesReportService(req);
    res.status(200).json(result);
};
exports.ReturnReportByDate = async (req, res) => {
    let result = await ReturnReportService(req);
    res.status(200).json(result);
};

