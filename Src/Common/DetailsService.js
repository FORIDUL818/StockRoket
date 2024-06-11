const mongoose=require("mongoose");

const detailsService=async(request,datamodel)=>{
    try{
        let id=request.params.id;
        let email=request.headers.email
        let objectId=mongoose.Types.ObjectId;
         
        let query={}
        query['_id']=new objectId(id);
        query["userEmail"]=email;

        const data= await datamodel.aggregate([
            {$match:query}
        ])

        return{status:"success",data:data}

    }catch(err){
        return{status:"fail",data:err}
    }
}

module.exports=detailsService;