const [path, fs] = [require("path"), require("fs")];

module.exports = (request, response, serverData) =>{
    const  userToken  = serverData.username;

    fs.writeFile(path.resolve(__dirname, `../database/${userToken}.txt`), JSON.stringify({
            ...request.body, 
            serverCookie:serverData.username, 
            ip:request.socket.remoteAddress,
            ...serverData, 
        }), (err) =>{

        if(err)return console.log(err.message);
        response.status(200).json({success:true, message:{...request.body, serverCookie:serverData.username}});
    });
};