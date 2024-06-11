const PurchaseModel = require("../../Models/Purchase/PurchaseModel");

const PurseeSummaryService = async (req) => {
    try {
        let userEmail = req.headers.email;
        let data = await PurchaseModel.aggregate([
            { $match: { userEmail: userEmail } },
            {
                $facet: {
                    total: [{ $group: { _id: 0, totalAmount: { $sum: "$grandTotal" } } }],
                    last30Days: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%d-%m-%Y", date: "$createDate" } },
                                dailyTotal: { $sum: "$grandTotal" }
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

module.exports = PurseeSummaryService;