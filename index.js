import express from 'express';// prepare environment to use js 
import connection from "./config/connection.js";
import { addUser } from "./server/controllers/usercontroller.js";
const app= express();



app.get("/@",(req, res)=>{
    addUser()
    res.send("user is created")
})



app.listen(process.env.PORT , ()=>{console.log("server is runnung on port 3000")})


