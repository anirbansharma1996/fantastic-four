const express = require('express');
const app = express();
const jwt = require("jsonwebtoken")
const {connection} = require('./config/db')
require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');
const {todoRoute} = require('./routes/todo.route');
const {UserModel} = require('./models/User.model');
const {userRoute} = require('./routes/user.route');
const {allpostRoute} = require('./routes/allpost.route');
const {authentication} = require('./middlewares/authentication');
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("welcome")
})

app.post("/signup", async (req, res) => {
  const {name,email, password} = req.body;
  //const {name,image,gender,dob,number,email, password} = req.body;
  const userPre = await UserModel.findOne({email})

  if(userPre?.email){
    res.send("Try login , already exist")
  }
  else{
    try{
bcrypt.hash(password,4, async function(err,hash){
    const user = new UserModel({name,email,password:hash})
    await user.save()
    res.send({"message": "signup successfully",user})
})
    }
    catch(err){
      console.log("err",err)
      res.send("Something went wrong try again later")
    }
  }
})

app.post("/login", async (req, res)=>{
    const {email,password} = req.body;
    try{
     const user = await UserModel.find({email})
        const hashed_pass = user[0].password;
        bcrypt.compare(password, hashed_pass, function(err,result){
            if(result){
                const token = jwt.sign
                ({"userID": user._id}, 'hush')
                res.send({token,user})
            }
            else{
                res.send("Login Failed")
            }
        })
    }
    catch(err){
        console.log("err",err)
        res.send("Something went worng, please try again later")
    }
})

app.use(authentication)
app.use("/todos", todoRoute)
app.use("/mypost", allpostRoute)
app.use("/user", userRoute)

//userRoute

app.listen(process.env.port, async()=> {

   try{
        await connection ;
        console.log(`server is running on port ${process.env.port}`)
    }
    catch(err){
     console.log("err",err)
    }

})