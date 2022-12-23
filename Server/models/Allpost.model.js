const mongoose = require('mongoose');

const allpostSchema = mongoose.Schema({
    url: {type: String},
    caption: {type: String},
    likecount: {type: Number, min:0,max:999,default:0},
    userID: String,
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
        
     },
})

const AllpostModel = mongoose.model("allpost", allpostSchema);

module.exports = {AllpostModel}