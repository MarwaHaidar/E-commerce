import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connection=mongoose.connect(process.env.MONGO)
.then(

    ()=>{console.log("connected to mongo")}
)
export default connection;