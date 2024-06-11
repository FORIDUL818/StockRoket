 const DropDownService=async(request,dataModel,projection)=>{
    try{
        let userEmail=request.headers.email;
        let data =await dataModel.aggregate([
            {$match: {userEmail:userEmail}},
            {$project:projection}
        ])
        return{status:"success",data:data}
    }catch(err){
        return{status:"fail",data:err}
    }

}
module.exports=DropDownService