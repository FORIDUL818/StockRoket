exports.ListServiceTwo = async (req, dataModel, searchArray, joinOnestage, joinTwostage) => {
    try {
        const pageNumber = Number(req.params.pageNumber) || 1;
        const perPage = Number(req.params.perPage) || 4;
        const searchKeyword = req.params.searchKeyword;
        const userEmail = req.headers.email; // Use headers instead of params for email
  
        const skip = (pageNumber - 1) * perPage;
        let data;
  
        if (searchKeyword !== "null") {
            const query = { $or: searchArray };
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } }, 
                joinOnestage,
                joinTwostage,
                { $match: query },
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        data: [{ $skip: skip }, { $limit: perPage }]
                    }
                }
            ]);
        } else {
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } },
                joinOnestage,
                joinTwostage,
                {
                    $facet: {
                        total: [{ $count: "total" }],
                        data: [{ $skip: skip }, { $limit: perPage }]
                    }
                }
            ]);
        }
  
        // Ensure that the returned structure matches the expected format
        const formattedData = {
            total: data[0].total.length > 0 ? data[0].total[0].count : 0,
            data: data[0].data
        };
  
        return { status: "success", data: formattedData };
    } catch (err) {
        return { status: "fail", data: err.message };
    }
  };
  

  