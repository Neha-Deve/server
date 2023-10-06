const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Users')
const userSchema = mongoose.Schema({
    name : String,
    username:String,
    email:String,
    password:String,
    phone:String

})
const userModel=mongoose.model('User',userSchema)
const app=express()
app.use(express.json())
app.use(cors())
app.put('/',async (req,res)=>{
    const newUser=new userModel(req.body)
    await newUser.save()
    res.json(newUser)
})
app.get('/',async (req,res)=>{
    const AllUsers=await userModel.find({})

    res.json(AllUsers)
})
app.listen(5000,()=>{
    console.log("listenning at port 5000")
})
 