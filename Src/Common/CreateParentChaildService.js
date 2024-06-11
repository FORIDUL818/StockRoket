
const mongoose = require("mongoose");

const CreateParentChildService = async (request, parentModel, childModel, jointParentName) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // First process: Creating parent data
        const parentPostBody = request.body.parent;
        parentPostBody.userEmail = request.headers.email;
        let parentDataCreation = await parentModel.create([parentPostBody], { session: session });

        // Second process: Creating child data
        const childPostBody = request.body.child;
        childPostBody.forEach(element => {
            element.userEmail = request.headers.email;
            element[jointParentName] = parentDataCreation[0]._id;
        });
        let childDataCreation = await childModel.create(childPostBody, { session: session });

        await session.commitTransaction();
        return { status: "success", parentData: parentDataCreation, childData: childDataCreation };
    } catch (err) {
        await session.abortTransaction();
        return { status: "fail", data: err.message };
    } finally {
        session.endSession();
    }
};

module.exports = CreateParentChildService;
