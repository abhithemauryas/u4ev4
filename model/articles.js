const mongoose=require("mongoose");

const articleSchema=mongoose.Schema({
    title:{type:String, require:true},
    body:{type:String, require:true},
    user:{type:String, require:true},
    category:{type:String, require:true},
    userID:{type:String, require:true},
    live:{type:Boolean, require:true}
 
});

const articleModel=mongoose.model("article",articleSchema);

module.exports={
 articleModel
}