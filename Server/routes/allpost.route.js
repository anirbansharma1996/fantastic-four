const express = require('express');
const {AllpostModel} = require('../models/Allpost.model');
const allpostRoute = express.Router();

allpostRoute.get("/", async (req, res)=>{
    try{
        let qur = req.query;
    
        const data = await AllpostModel.find(qur).populate({path: "user_id", select:["name","email"]});
        console.log("data",data)
        res.send(data);
    }
    catch(err){
        console.log("Post-err",err);
    }
   
})

allpostRoute.post("/post", async (req, res)=>{
    const payload = req.body
    try{
        const new_data = await AllpostModel.insertMany(payload)
        res.send ({"message": "data has saved"})
    }
    catch(err){
        console.log("err",err)
        res.send({"err": "Something went wrong"})
    }
})

allpostRoute.patch("/patch/:id", async (req, res)=>{
    const ids = req.params.id
    const dataid = req.body.userID
    const latest_todo = await AllpostModel.findOne({_id:ids})

    if(dataid != latest_todo.userID){
        res.send("User not authoriged")
    }
    else{
        await AllpostModel.findByIdAndUpdate({_id:ids},payload)
        res.send({"message": "Data Updated"})
    }
})

allpostRoute.delete("/delete/:id" , async(req,res)=>{
    const ids = req.params.id
    const dataid = req.body.userID
    const latest_todo = await AllpostModel.findOne({_id:ids})

    if(dataid != latest_todo.userID){
        res.send("User not authoriged")
    }
    else{
        await AllpostModel.findByIdAndDelete({_id:ids})
        res.send({"message": "Data Deleted"})
    }
})

module.exports = {allpostRoute}