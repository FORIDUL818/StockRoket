const AssociateVerificationService = async (query, associateModel) => {
    try {
      const data = await associateModel.aggregate([{ $match: query }]);
      return data.length>0; 
     
    } catch (err) {
      return {status:"fail",data:err} // Throw the error to be handled by the calling function
    }
  };
  
  module.exports = AssociateVerificationService;
  