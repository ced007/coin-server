const db = require("../database/model");


module.exports = async(request, response) =>{
    const {serverCookie} = request.body;


    try {
        
        const resData = await db.deleteOne({serverCookie})
        if(resData){
            const final = await db.find();
            response.status(200).json({ success: true, message: final});
        }else{
            throw new Error("no user to delete");
        }
        
    } catch (error) {
        
        console.log(error);

    }
}