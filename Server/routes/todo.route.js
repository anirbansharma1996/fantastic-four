const express = require('express');
const {TodoModel} = require('../models/Todo.model');
const todoRoute = express.Router();

todoRoute.get("/", async (req, res)=>{
    let qur = req.query

    const data = await TodoModel.find(qur)
    res.send(data)
})

todoRoute.post("/post", async (req, res)=>{
    const payload = req.body
    try{
        const new_data = new TodoModel(payload);
        await new_data.save()
        res.send ({"message": "data has saved"})
    }
    catch(err){
        console.log("err",err)
        res.send({"err": "Something went wrong"})
    }
})

todoRoute.patch("/patch/:id", async (req, res)=>{
    const ids = req.params.id
    const dataid = req.body.userID
    const latest_todo = await TodoModel.findOne({_id:ids})

    if(dataid != latest_todo.userID){
        res.send("User not authoriged")
    }
    else{
        await TodoModel.findByIdAndUpdate({_id:ids},payload)
        res.send({"message": "Data Updated"})
    }
})

todoRoute.delete("/delete/:id" , async(req,res)=>{
    const ids = req.params.id
    const dataid = req.body.userID
    const latest_todo = await TodoModel.findOne({_id:ids})

    if(dataid != latest_todo.userID){
        res.send("User not authoriged")
    }
    else{
        await TodoModel.findByIdAndDelete({_id:ids})
        res.send({"message": "Data Deleted"})
    }
})

module.exports = {todoRoute}