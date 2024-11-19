const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 4500;


dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require("./database/connect");


app.use(require("./router/router"));
//require("./bot");
app.listen(port, () => console.log("server running on port 4500"));