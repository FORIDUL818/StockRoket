const ListService = async (req, dataModel, searchArray) => {
  try {
      // Retrieve parameters with default values
      const pageNumber = Number(req.params.pageNumber) || 1;
      const perPage = Number(req.params.perPage) || 4;
      const searchKeyword = req.params.searchKeyword;
      const userEmail = req.headers.email; // Ensure email is taken from headers

      const skip = (pageNumber - 1) * perPage;

      let data;

      if (searchKeyword !== "null") {
          const query = { $or: searchArray };
          data = await dataModel.aggregate([
              { $match: { userEmail: userEmail } }, // Match documents for the specific user
              { $match: query }, // Apply search query
              {
                  $facet: {
                      total: [{ $count: "count" }], // Count total matching documents
                      data: [{ $skip: skip }, { $limit: perPage }] // Paginate results
                  }
              }
          ]);
      } else {
          data = await dataModel.aggregate([
              { $match: { userEmail: userEmail } }, // Match documents for the specific user
              {
                  $facet: {
                      total: [{ $count: "count" }], // Count total documents
                      data: [{ $skip: skip }, { $limit: perPage }] // Paginate results
                  }
              }
          ]);
      }

      // Format the response to match the expected structure
      const formattedData = {
          total: data[0].total.length > 0 ? data[0].total[0].count : 0,
          data: data[0].data
      };

      return { status: "success", data: formattedData };
  } catch (err) {
      return { status: "fail", data: err.message };
  }
};

module.exports = ListService;
