const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    email: {type:String, required: true}, 
    gender: {type: String, required: true},
    password: {type: String, required: true},
    dob: {type: String, required: true},
    number:{type:Number, required: true}

})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}