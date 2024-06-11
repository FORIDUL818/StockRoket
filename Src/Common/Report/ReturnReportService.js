
const returnProductModel = require("../../Models/Return/returnProductModel");

const ReturnReportService = async (req) => {
  try {
    let userEmail = req.headers.email;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;

    let data = await returnProductModel.aggregate([
      {
        $match: {
          userEmail:userEmail,
          createDate: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
          }
        }
      },
      {
        $facet: {
          total: [{ $group: { _id: 0, totalAmount: { $sum: "$total" } } }],
          data: [
            { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
            { $unwind: "$product" },
            { $lookup: { from: "brands", localField: "product.brandId", foreignField: "_id", as: "brand" } },
            { $lookup: { from: "categoris", localField: "product.categoryId", foreignField: "_id", as: "category" } }
          ]
        }
      }
    ]);

    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err };
  }
};

module.exports = ReturnReportService;
