const expensesModel = require("../../Models/expenseModel");

const ExpenseSummaryService = async (req) => {
    try {
        let userEmail = req.headers.email;
        let data = await expensesModel.aggregate([
            { $match: { userEmail: userEmail } },
            {
                $facet: {
                    total: [{ $group: { _id: 0, totalAmount: { $sum: "$amount" } } }],
                    last30Days: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%d-%m-%Y", date: "$createDate" } },
                                dailyTotal: { $sum: "$amount" }
                            }
                        },
                        { $sort: { _id: -1 } },
                        { $limit: 30 }
                    ]
                }
            }
        ]);
        return { status: "success", data: data };
    } catch (err) {
        return { status: 'fail', data: err };
    }
}

module.exports = ExpenseSummaryService;