const db = require("../database/model");


module.exports = async(request, response, serverData) =>{

    try {

       const resData = await db.findOne({serverCookie: serverData.username});
       if(resData){
            response.status(200).json({success: true, message: resData});
       }else{
            throw new Error("new user, add referral");
       }
       
    } catch (error) {

       const person = await db.findOne({serverCookie: serverData.startPayload});
       const referralBonus = Math.floor(Math.random() * ((100 + (person.referrals * 25)) - 70) + 70); 

        const final = await db.updateOne({serverCookie: serverData.startPayload}, {
            referrals: person.referrals + 1,
            totalPoints: person.totalPoints + referralBonus,
        })
        
        require("../dbServices/signUp")(request, response, serverData);
    } 
           
}