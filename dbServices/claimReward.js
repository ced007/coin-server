const db = require("../database/model");



module.exports = async(request, response) =>{
    const { userToken, bonus, day } = request.body;


        try {

            let resData = await db.findOne({serverCookie: userToken});
            
            resData = {
                totalPoints: resData.totalPoints + bonus, 
                isTodayClaimed: true,
                dailyRewards: { 
                    rewards : resData.dailyRewards.rewards.map(elem =>{
                        if(elem.day === day){
                            return ({...elem, isClaimed: true});
                        }
                        return elem;
                    })
                }
            }
            resData = await db.updateOne({ serverCookie: userToken}, resData);
    
            if(resData){
                const final = await db.findOne({serverCookie: userToken});
                response.status(200).json({success:true, message: final});
            }else{
                throw new Error("error in adding count");
            }
        } catch (error) {
            console.log(error);
        }
      
}