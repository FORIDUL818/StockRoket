const updateServece = async (request, dataModel) => {
    try {
        let id = request.params.id;
        let email = request.headers.email;

        // Ensure that body is properly structured for the update operation
        const updateData = request.body;

        // Perform the update operation
        const result = await dataModel.updateOne(
            { _id: id, userEmail: email },
            { $set: updateData }
        );

        // Check the result of the update operation
        if (result.matchedCount === 0) {
            return { status: "fail", data: "No document found with the given ID and user email" };
        }

        if (result.modifiedCount === 0) {
            return { status: "fail", data: "No changes made to the document" };
        }

        return { status: "success", data: result };
    } catch (err) {
        return { status: "fail", data: err.message };
    }
};

module.exports = updateServece;
