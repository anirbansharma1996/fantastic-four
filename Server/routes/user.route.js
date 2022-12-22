const express = require('express');
const {UserModel} = require("../models/User.model");
const userRoute = express.Router();

userRoute.get("/", async(req,res)=>{
    try{
        let query = req.query;
        let {q} = req.query
        if(q){
            let query_data = await UserModel.find({name:{"$regex":q, $options:"i"}})
            return res.send(query_data)
        }
        else{
            const data = await UserModel.find(query);
            return res.send(data);
        }
    }
    catch(err){
        console.log("err",err);
    }
})
module.exports = {userRoute};