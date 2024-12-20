const db = require("../database/model");



module.exports = async(request, response) =>{

    const { userToken, newDay } = request.body;


    try {

        let resData = await db.findOne({serverCookie: userToken});

        resData = {
            presentDayIndex: resData.presentDayIndex + 1,
            isTodayClaimed: false,
            spinCount:3,
            totalSpinsPerDay: 3,
            allowedDailySpins:15, 
            today: newDay,
            isDaysReset: resData.presentDayIndex > 6 || resData.isTodayClaimed === false ? true: false,
        };

        resData = await db.updateOne({ serverCookie: userToken}, resData);

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
