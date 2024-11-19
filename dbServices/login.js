const db = require("../database/model");



module.exports = async(request, response, serverData) =>{

    try {
        
        const resData = await db.findOne({ serverCookie: serverData.username});
        if(!resData){
            throw new Error("signup")
        }else{
            response.status(200).json({ success:true, message: resData});
        }

    } catch (error) {
        
        require("./signUp")(request,response,serverData);

    }
};
