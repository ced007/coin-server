const db = require("../database/model");

module.exports = async(request, response) =>{

    try {
        
        const resData = await db.find();
        response.status(200).json({ success:true, message: resData});

    } catch (error) {
        
        console.log(error);

    }

}