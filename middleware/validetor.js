const jwt=require("jsonwebtoken")
let {UserModel}=require("../model/user")

const validetor=async(req,res,next)=>{
    let email=req.body.email;
    let findemail=await UserModel.find({email});
    if(findemail.length==0){
       return next()
    }
    return res.status(401).send({"msg":"already registered"})
}

module.exports={
    validetor
}

