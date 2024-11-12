const [path, fs] = [require("path"), require("fs")];



module.exports = (request, response, serverData) =>{

    fs.readFile(path.resolve(__dirname, `../database/${serverData.username}.txt`), "utf-8", (err, result) =>{
        if(err){
            const newData = {
                ...request.body,
                serverCookie:serverData.username, 
                ...serverData, 
                ip:request.socket.remoteAddress
            };

            fs.writeFile(path.resolve(__dirname, `../database/${serverData.username}.txt`), JSON.stringify(newData), (err) =>{
                if(err)return;
                response.status(200).json({success:true, message:newData});
            })
            return;
        }

        response.status(200).json({success:true, message:JSON.parse(result)});
    })
};