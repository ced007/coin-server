const [path, fs] = [require("path"), require("fs")];



module.exports = (request, response) =>{
    const { userToken } = request.body;

    fs.readFile(path.resolve(__dirname,`../database/${userToken}.txt`), "utf-8", (err, result)=>{
        if(err)return;

        let newData = JSON.parse(result);
        newData = ({
            ...newData, 
            presentDayIndex:newData.presentDayIndex < 6 ? newData.presentDayIndex + 1 : 0,
            totalPoints: newData.totalPoints + request.body.bonus, 
            isTodayClaimed: true,
            dailyRewards: newData.dailyRewards.map(elem =>{
                if(elem.day === request.body.day){
                    return ({...elem, isClaimed: true});
                }
                return elem;
            })
        });
            
        fs.writeFile(path.resolve(__dirname,`../database/${userToken}.txt`), JSON.stringify(newData), (err)=>{
            if(err)return;
            response.status(200).json({success:true, message:newData});
        });
    });
}