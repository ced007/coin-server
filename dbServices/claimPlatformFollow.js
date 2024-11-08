const [path, fs] = [require("path"), require("fs")];

module.exports = (request, response) =>{
    const { userToken, platform, points } = request.body;

    fs.readFile(path.resolve(__dirname, `../database/${userToken}.txt`), "utf-8", (err, result)=>{
        if(err)return;

        let newData = JSON.parse(result);

        newData = ({...newData, [platform]:"followed", totalPoints: newData.totalPoints + points});

        fs.writeFile(path.resolve(__dirname, `../database/${userToken}.txt`), JSON.stringify(newData), (err)=>{
            if(err)return;
            response.status(200).json({success:true, message:newData})
        })
    });
}