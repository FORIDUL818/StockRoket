const CreateParentChildService = require("../Common/CreateParentChaildService");
const deleteChildService = require("../Common/DeleteChaildService");
const ListServiceOne = require("../Common/ListServiceOne");
const parentModel = require("../Models/Return/ReturnModel");
const childModel = require("../Models/Return/returnProductModel");

exports.createReturn = async (req, res) => {
    const result = await CreateParentChildService(req, parentModel, childModel, "returnId");
    res.status(200).json({ status: "success", data: result });
};
 // return list start
 exports.returnlist = async (req, res) => {
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
   // return list end


   // return delete start
   exports.returnDelete = async (req, res) => {
    try {
      let result = await deleteChildService(req, parentModel, childModel, "returnId");
      if (result.status === "success") {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (err) {
      res.status(500).json({ status: "fail", data: err.message });
    }
  };
   // return delete end