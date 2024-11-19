const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();



router.get("/", (request, response) =>{
    response.status(200).send("<h1>Home page Asikion coin</h1>");
})


router.get("/get-ip", (request, response) =>{
    response.status(200).send(request.socket.remoteAddress)
})

router.post("/sign-up", (request, response) =>{

    let  serverData  = request.body.serverData.includes(",") ? request.body.serverData.split(',') : [request.body.serverData,null];
    serverData = {username:serverData[0], startPayload:serverData[1]};

    if(serverData.startPayload){
        require("../dbServices/referral")(request, response,serverData);
        // require("../dbServices/signUp")(request,response,serverData);
    }else{
        require("../dbServices/login")(request,response,serverData);
    }
 
});

router.post("/add-coin", (request, response) =>{
    require("../dbServices/addCoin")(request, response);
})


router.post("/claim-daily-reward", (request, response) =>{
    require("../dbServices/claimReward")(request, response);
})


router.post("/update-daily-spin-count", (request, response) =>{
    require("../dbServices/updateSpinCount")(request, response);
})

router.post("/configure-new-day", (request, response) =>{
    require("../dbServices/configureNewDay")(request, response);
})

router.post("/reset-day", (request, response) =>{
   require("../dbServices/resetDay")(request, response);
})


router.post("/follow-platform", (request, response) =>{
    require("../dbServices/followPlatform")(request, response);
})

router.post("/claim-follow-platform", (request, response) =>{
    require("../dbServices/claimPlatformFollow")(request, response);
})

router.get("/get-users-number", (request, response) =>{
    require("../dbServices/getAllUsers")(request, response);
})

router.post("/get-one-user", (request, response)=>{
   require("../dbServices/getOneUser")(request, response);
})


router.post("/delete-user", (request, response) =>{
    require("../dbServices/deleteUser")(request, response);
})




module.exports = router;
