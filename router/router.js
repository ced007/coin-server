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

    let  serverData  = request.body.serverData.split(',');
    serverData = {username:serverData[0], startPayload:serverData[1] || null};


    fs.readFile(path.resolve(__dirname,"../database/users.txt"), "utf-8", (err, result) =>{
        if(err)console.log(err);

        let newData = JSON.parse(result);
        const isPresent = newData.find(user => user === serverData.username);

        if(isPresent){
            require("../dbServices/login")(request, response, serverData);
        }else{
            fs.writeFile(path.resolve(__dirname,"../database/users.txt"), JSON.stringify([...newData, serverData.username]), (err)=>{
                if(err)return;
                
                if(serverData.startPayload){
                    require("../dbServices/signUpMiddleWare")(request, response, serverData);
                }else{
                    require("../dbServices/loginOrSignUp")(request, response, serverData);
                }
            });
        }
    }) 
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
    fs.readFile(path.join(__dirname,"../database/users.txt"), "utf-8", (err, result) =>{
        if(err)console.log(err);
        const newData = JSON.parse(result);
        response.status(200).json(newData);
    })
})

router.post("/get-one-user", (request, response)=>{
    const {username} = request.body;
    fs.readFile(path.join(__dirname,`../database/${username}.txt`), "utf-8", (err, result) =>{
        if(err)console.log(err);
        const newData = JSON.parse(result);
        response.status(200).json(newData);
    })
})




module.exports = router;
