import mongoose from 'mongoose';

import express from 'express';// prepare environment to use js 

import dotenv from 'dotenv';


dotenv.config();


mongoose.connect(process.env.MONGO)
.then(

    ()=>{console.log("connected to mongo")}
)
const app= express();
app.listen(process.env.PORT , ()=>{console.log("server is runnung on port 3000")})


