const [path, fs] = [require("path"), require("fs")];



module.exports = (request, response, serverData) =>{
    const  userToken  = serverData.username;

    fs.readFile(path.resolve(__dirname, `../database/${userToken}.txt`), "utf-8", (err, result) =>{
        if(err)return;

        response.status(200).json({success:true, message:JSON.parse(result)});
       
    })
};
