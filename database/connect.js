const mongoose = require("mongoose");


const conStr = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.g4jqh.mongodb.net/?retryWrites=true&w=majority&appName=asikoin-db`;

const connection = mongoose.connect(conStr)
.then(()=>console.log("connected to cloud atlas"))
.catch(err=>console.log(err));


module.exports = connection;