const db = require("../database/model");

module.exports = async(request, response, serverData) =>{

    const newData = {
        ...request.body, 
        serverCookie:serverData.username, 
        ...serverData, 
    }

    try{

        const resData = await db.create(newData);
        response.status(200).json({ success:true, message: resData });

    }catch(error){

        console.log(error)

    }
};