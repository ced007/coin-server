const path = require("path");
const fs = require("fs");
const referralRoute = require("../dbServices/referral");
const signUpRoute = require("../dbServices/signUp");
const loginRoute = require("../dbServices/login");




module.exports = (request, response, serverData) =>{

    fs.readFile(path.resolve(__dirname,`../database/${serverData.username}.txt`), (err) =>{
        if(err){
            referralRoute(serverData);
            signUpRoute(request, response, serverData);
        }else{
            loginRoute(request, response, serverData);
        }
    })

}