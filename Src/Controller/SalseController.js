const CreateParentChaildSevice = require("../Common/CreateParentChaildService");
const deleteChildService = require("../Common/DeleteChaildService");
const ListServiceOne = require("../Common/LIstServiceOne");
const parentModel = require("../Models/Salse/SalseModel");
const childModel = require("../Models/Salse/SalseProductModel");
// createSalse start
exports.createSalse = async (req, res) => {
    const result = await CreateParentChaildSevice(req, parentModel, childModel, "salseId");
    res.status(200).json({ status: "success", data: result });
};
// createSalse end
 // salse list start
 exports.Salselist = async (req, res) => {
     try {
         const searchKeyword = req.params.searchKeyword;
         const searchRegex = { $regex: searchKeyword, $options: "i" };
         
         const joinOnestage = { 
             $lookup: {
                 from: "customars", 
                 localField: "CustomarId", 
                 foreignField: "_id", 
                 as: "customar"
                }
            };
            
            const array = [
                { "customar.email": searchRegex },
                { "customar.phone": searchRegex },
                { "customar.addrasse": searchRegex },
                { 'customar.name': searchRegex },
                
            ];
            
            const result = await ListServiceOne(req, parentModel, array, joinOnestage);
            
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ status: "fail", data: err.message });
        }
    };
    // salse list end
    // salse delete start
    exports.SalseDelete = async (req, res) => {
        try {
          let result = await deleteChildService(req, parentModel, childModel, "salseId");
          if (result.status === "success") {
            res.status(200).json(result);
          } else {
            res.status(500).json(result);
          }
        } catch (err) {
          res.status(500).json({ status: "fail", data: err.message });
        }
      };
    // salse delete end