const mongoose = require("mongoose");

const Schema = {
    serverData: "String",
    serverCookie:"String", 
    isFollowingTelegram:"String",
    isFollowingX:"String",
    isFollowingYoutube:"String",
    spinCount:"Number",
    totalSpinsPerDay:"Number",
    referrals: "Number", 
    totalPoints: "Number", 
    allowedDailySpins: "Number",
    isTodayClaimed: "Boolean",
    isDaysReset:"Boolean",
    presentDayIndex: "Number",
    today:"Number",
    dailyRewards: "Object",
    joined: "String",
}


const userSchema = mongoose.Schema(Schema);

module.exports = userSchema;
