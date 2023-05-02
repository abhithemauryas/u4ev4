const express=require("express")
const userRoute=express.Router()
const {UserModel}=require("../model/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {validetor}=require("../middleware/validetor")

userRoute.get("/user",async(req,res)=>{
    try {
        let data= await UserModel.find();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})
userRoute.post("/register",validetor,async(req,res)=>{
    try {
      let {name,email,password,city,age}=req.body;
      console.log({name,email,password,city,age})
      bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            console.log(err);
            res.send({"msg":err})

        }
        else{
            const user=new UserModel({name,email,password:hash,city,age});
            await user.save();
            res.send({"msg":"user hass been signed up"})
        }
       
      })

    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})

userRoute.post("/login",async(req,res)=>{
    try {
      let {email,password}=req.body;
      let data=await UserModel.find({email});
      console.log(data)
      if(data.length>0){
        bcrypt.compare(password,data[0].password,async(err,result)=>{
            if(result){
                var dataid=data[0]._id;
                var name=data[0].name
                var token = jwt.sign({dataid,name}, 'masai');
                res.send({"msg":"You have been logged in",token})
            }else{
                console.log(err);
                res.send({"msg":"something went wrong"})
            }
        })
      }else{

        res.status(404).send({"msg":"go for registration"})
      }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})


module.exports={
    userRoute
}