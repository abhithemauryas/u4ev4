const express=require("express")
const {connection}=require("./db")
const{json}=require("express")
const{userRoute}=require("./routers/user.route")
const {articleRoute}=require("./routers/articles.route")


const app=express()
require('dotenv').config()
app.use(express.json())

app.use(userRoute)
app.use(articleRoute)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Db is connected")
    } catch (error) {
        console.log(error)
        console.log("Db is not connected")
    }
    console.log(`http://localhost:${process.env.port}`);
})
