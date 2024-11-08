const [path, fs] = [require("path"), require("fs")];

module.exports = (request, response) =>{
    const { userToken } = request.body;

    fs.readFile(path.resolve(__dirname,`../database/${userToken}.txt`), "utf-8", (err, result)=>{
        if(err)return console.log(err);

        let newData = JSON.parse(result);
        newData = ({
            ...newData, 
            spinCount: newData.spinCount + 10,
            totalSpinsPerDay: newData.totalSpinsPerDay + 10,
            allowedDailySpins: newData.allowedDailySpins > 0 ? newData.allowedDailySpins - 1 : 0,
        });

        fs.writeFile(path.resolve(__dirname,`../database/${userToken}.txt`), JSON.stringify(newData), (err)=>{
            if(err)return console.log(err);
            response.status(200).json({success:true, message:newData});
        });
    });
}