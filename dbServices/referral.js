const path = require("path");
const fs = require("fs");


module.exports = (serverData) =>{

    fs.readFile(path.resolve(__dirname,`../database/${serverData.startPayload}.txt`), "utf-8", (err, result) =>{
        if(err)return;
        let newData = JSON.parse(result);
        let isPresent = newData.referrals.find(user => user === serverData.username);
        if(isPresent){
            return;
        }else{
            const referralBonus = Math.floor(Math.random() * ((100 + (newData.referrals.length * 25)) - 70) + 70); 
            newData = ({...newData, referrals:[...newData.referrals, serverData.username], totalPoints:newData.totalPoints + referralBonus});
            fs.writeFile(path.resolve(__dirname,`../database/${serverData.startPayload}.txt`), JSON.stringify(newData), (err) =>{
                if(err)return;
            })
        }
    })
}