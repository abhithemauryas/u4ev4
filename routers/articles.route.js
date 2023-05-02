const express=require("express");
const articleRoute=express.Router();
const {articleModel}=require("../model/articles");
const {authentication}=require("../middleware/authenication");
const { CLIENT_RENEG_LIMIT } = require("tls");
articleRoute.use(authentication);


articleRoute.get("/articles",async(req,res)=>{
    try {
        let data=await articleModel.find();
        res.send(data)
    } catch (error) {
    console.log(error);
    res.send({"msg":"something wrong"})
    }
})
articleRoute.post("/articles/add",async(req,res)=>{
    try {

        let save=new articleModel(req.body);
        await save.save()
        res.send(save)
    } catch (error) {
        console.log(error);
        res.send({"msg":"something wrong"})
    }
})
articleRoute.get("/articles/:id",async(req,res)=>{
    try {
       let id=req.params.id;
       let data=await articleModel.findById({_id:id})
   
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something wrong"})
    }
})
articleRoute.patch("/articles/edit/:id",async(req,res)=>{
    try {
        let  data=req.body;
        let id=req.params.id;
        console.log(userid);
        let patchdata=await articleModel.findByIdAndUpdate({_id:id},data);
        if(!patchdata){
            res.status(204).send({"msg":"article does not exist"})
        }
        res.send(patchdata)       
       
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something wrong"})
    }
});

articleRoute.delete("/articles/rem/:id",async(req,res)=>{
    try {
       let id=req.params.id
       let deltedata=await articleModel.findByIdAndDelete({_id:id})
res.status(204).send({"msg":"particular article has been deletd"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"you are not logged in"}) 
    }
});




module.exports={
    articleRoute
}