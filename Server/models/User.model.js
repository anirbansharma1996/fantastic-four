const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String},
    // image: {type: String, required: true},
    email: {type:String}, 
    gender: {type: String},
    password: {type: String},
    dob: {type: String},
    number:{type:Number},
})
const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}