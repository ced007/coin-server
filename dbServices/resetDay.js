const [path, fs] = [require("path"), require("fs")];

module.exports = (request, response) =>{

    const { userToken } = request.body;

    fs.readFile(path.resolve(__dirname,`../database/${userToken}.txt`), "utf-8", (err, result)=>{
        if(err)return;

        let newData = JSON.parse(result);
        newData = ({
            ...newData, 
            isTodayClaimed: false,
            spinCount:3,
            totalSpinsPerDay: 3,
            allowedDailySpins:15,
            presentDayIndex:0,
            dailyRewards:Array.from({length:7},(_,n)=>({day:n, bonus:(n+1)*35, isClaimed:false})),      
        });

        fs.writeFile(path.resolve(__dirname,`../database/${userToken}.txt`), JSON.stringify(newData), (err)=>{
            if(err)return;
            response.status(200).json({success:true, message:newData});
        });
    });
}
