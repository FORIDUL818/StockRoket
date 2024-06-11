
const CreateService=async(request,dataModel)=>{
    try{
        const body=request.body;
        body.userEmail=request.headers.email;
        const data=await dataModel.create(body)
      return {status:"success",data:data}

    }
    catch(err){
        return{status:"fail",data:err}
    }
}
module.exports=CreateService;