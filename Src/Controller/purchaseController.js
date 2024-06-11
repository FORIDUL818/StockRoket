
const parentModel = require("../Models/Purchase/PurchaseModel");
const childModel = require("../Models/Purchase/PurchaseProductsModel");
const CreateParentChaildSevice=require("../Common/CreateParentChaildService");
const deleteChaildService = require("../Common/DeleteChaildService");
const ListServiceOne = require("../Common/ListServiceOne");
//createPurchase start
exports.createPurchase = async (req, res) => {
    const result = await CreateParentChaildSevice(req, parentModel, childModel, "purchaseId");
    res.status(200).json({ status: "success", data: result });
};
//createPurchase end


exports.purchaselist = async (req, res) => {
    try {
        const searchKeyword = req.params.searchKeyword;
        const searchRegex = { $regex: searchKeyword, $options: "i" };
  
        const joinOnestage = { 
            $lookup: {
                from: "saippliars", 
                localField: "SupplierId", 
                foreignField: "_id", 
                as: "supliare"
            }
        };
  
        const array = [
            { "supliare.email": searchRegex },
            { "supliare.phone": searchRegex },
            { "supliare.addrasse": searchRegex },
            { 'supliare.name': searchRegex },
            
        ];
  
        const result = await ListServiceOne(req, parentModel, array, joinOnestage);
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ status: "fail", data: err.message });
    }
  };
// purchase Delete service start
exports.purchaseDelete = async (req, res) => {
    try {
      let result = await deleteChaildService(req, parentModel, childModel, "purchaseId");
      if (result.status === "success") {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (err) {
      res.status(500).json({ status: "fail", data: err.message });
    }
  };
// purchase Delete service end
