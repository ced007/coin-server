const [path, fs] = [require("path"), require("fs")];

const currentDay = new Date().getUTCDay();

module.exports = (request, response) =>{

    const { userToken } = request.body;

    fs.readFile(path.resolve(__dirname,`../database/${userToken}.txt`), "utf-8", (err, result)=>{
        if(err)return;

        let newData = JSON.parse(result);

            newData = ({
                ...newData,
                today: currentDay, 
                isTodayClaimed: false,
                spinCount:3,
                totalSpinsPerDay: 3,
                allowedDailySpins:15, 
                isDaysReset: newData.presentDayIndex > 6 ? true: false,
            });
                
            fs.writeFile(path.resolve(__dirname,`../database/${userToken}.txt`), JSON.stringify({...newData}), (err)=>{
                if(err)return;
                response.status(200).json({success:true, message:{...newData}});
            });
        

    });
}
