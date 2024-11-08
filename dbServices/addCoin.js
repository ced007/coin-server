const [path, fs] = [require("path"), require("fs")];

module.exports = (request, response) =>{
    const { userToken, spinVal } = request.body;

    fs.readFile(path.resolve(__dirname,`../database/${userToken}.txt`), "utf-8", (err, result)=>{
        if(err)return console.log(err);

        let newData = JSON.parse(result);
        newData = ({
            ...newData, 
            totalPoints: newData.totalPoints + spinVal,
            spinCount: newData.spinCount > 0 ? newData.spinCount - 1 : 0,
        });

        fs.writeFile(path.resolve(__dirname,`../database/${userToken}.txt`), JSON.stringify(newData), (err)=>{
            if(err)return console.log(err);
            response.status(200).json({success:true, message:newData});
        });
    });
}