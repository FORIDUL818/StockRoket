const mongoose = require("mongoose");

const  deleteChildService = async (request, parentModel, childModel, jointParentName) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deleteId = request.params.id;
    const userEmail = request.headers.email; // Ensure that userEmail comes from request.user

    let childQuery = {};
    childQuery[jointParentName] = deleteId;

    let parentQuery = {
      '_id': deleteId,
      'userEmail': userEmail
    };

    let childDelete = await childModel.deleteMany(childQuery).session(session);
    let parentDelete = await parentModel.deleteOne(parentQuery).session(session);

    if (parentDelete.deletedCount === 0) {
      throw new Error("Parent record not found or not deleted");
    }

    await session.commitTransaction();
    session.endSession();

    return { status: "success", parentData: parentDelete, childData: childDelete };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return { status: "fail", data: err.message };
  }
};

module.exports = deleteChildService;