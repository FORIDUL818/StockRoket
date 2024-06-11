const ExpenseSummaryService = require("../Common/Summery/ExpenseSummaryService");
const PurseeSummaryService = require("../Common/Summery/PursesSummeryService");
const ReturnSummaryService = require("../Common/Summery/ReturnSummaryService");

exports.ExpenseSummary = async (req, res) => {
    let result = await ExpenseSummaryService(req);
    res.status(200).json(result);
};
exports.pursesSummary = async (req, res) => {
    let result = await PurseeSummaryService(req);
    res.status(200).json(result);
};
exports.ReturnSummary = async (req, res) => {
    let result = await ReturnSummaryService(req);
    res.status(200).json(result);
};