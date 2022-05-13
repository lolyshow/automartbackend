function ResponsePayload(status=400,message="Technical Error",data = [], extras = null){
    let responseData = {};
    if(!extras){
        responseData = {
            "message":message,
            "status":status,
            "data":data,
            
        }
    }else{
        responseData = {
            "message":message,
            "status":status,
            "data":data,
            "others":extras
        }
    }
    return responseData;
}


module.exports = {
    ResponsePayload
};