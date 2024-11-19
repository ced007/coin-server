const db = require("../database/model");

module.exports = async(request, response) =>{

    const { userToken } = request.body;


    try {

        let resData = await db.findOne({serverCookie: userToken});

        resData = {
            isTodayClaimed: false,
            spinCount:3,
            totalSpinsPerDay: 3,
            allowedDailySpins:15,
            presentDayIndex:0,
            dailyRewards: {
                rewards : Array.from({length:7},(_,n)=>({day:n, bonus:(n+1)*35, isClaimed:false}))
            }  
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
