const deleteService = async (req, model) => {
    const deleteId = req.params.id;
    const result = await model.deleteOne({ _id: deleteId });
    return { status: "success", data: result };
  };
  
  module.exports = deleteService;
  