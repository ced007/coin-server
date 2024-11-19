const mongoose = require("mongoose");
const userSchema  = require("./schema");

const userModel = mongoose.model("asikoin-users",  userSchema);

module.exports = userModel;