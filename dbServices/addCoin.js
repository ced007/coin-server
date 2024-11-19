const db = require("../database/model");

module.exports = async(request, response) =>{
    const { userToken, spinVal } = request.body;


    try {

        let resData = await db.findOne({serverCookie: userToken});

        resData = await db.updateOne({ serverCookie: userToken}, {
            totalPoints: resData.totalPoints + spinVal,
            spinCount: resData.spinCount > 0 ? resData.spinCount - 1 : 0,
        })

        if(resData){
            const final = await db.findOne({serverCookie: userToken})
            response.status(200).json({success:true, message: final});
        }else{
            throw new Error("error in adding count");
        }
    } catch (error) {
        console.log(error);
    }
       
}