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


app.get("/", (req, res) => {
    res.send("welcome")
})

app.post("/signup", async (req, res) => {
  const {name,image,gender,dob,number,email, password} = req.body;
  const userPre = await UserModel.findOne({email})

  if(userPre?.email){
    res.send("Try login , already exist")
  }
  else{
    try{
bcrypt.hash(password,4, async function(err,hash){
    const user = new UserModel({name,image,gender,dob,number,email,password:hash})
    await user.save()
    res.send({"message": "signup successfully"})
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

     if(user.length > 0){
        const hashed_pass = user[0].password;
        bcrypt.compare(password, hashed_pass, function(err,result){
            if(result){
                const token = jwt.sign
                ({"userID": user[0]._id}, 'hush')
                res.send({"message": "login Successfully" , "token" : token})
            }
            else{
                res.send("Login Failed")
            }
        })
     }
     else{
        res.send("Login Failed")
     }
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