const db = require("../database/model");

module.exports = async(request, response) =>{

    const { username } = request.body;

    try {
        
        const resData = await db.findOne({serverCookie: username});
        response.status(200).json({ success:true, message: resData});

    } catch (error) {
        
        console.log(error);

    }

}