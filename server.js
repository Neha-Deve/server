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
app.get('/search',async (req,res)=>{
    const AllUsers=await userModel.find({name:req.query.keyword})
    res.status(200).json(AllUsers)
})
app.delete('/:id',async (req,res)=>{
    try {
        const deletedUser = await userModel.findByIdAndRemove(req.params.id);
    
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})
app.listen(5000,()=>{
    console.log("listenning at port 5000")
})
 