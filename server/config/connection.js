import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path : './.env'});

const connection = async () => { 
    await mongoose.connect(process.env.MONGO)
        .then(() => {
            console.log("connected to database")
        })
        .catch (error => {
            console.error("Connection error: ", error.message)
            process.exit()
        })
};
export default connection;