import express from 'express';// prepare environment to use js
import morgan from 'morgan'; 
import connection from "./config/connection.js";
import categoryroute from './routes/categoryRoute.js'
import subcategoryroute from './routes/subcategoryRoute.js'
import productroute from './routes/productRoute.js';

const app= express();
// --------------------morgan------------------------------------------------------------------------------
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'));
    console.log(`mode:${process.env.Node_ENV}`)
}
// -----------------------Middleware---------------------------------------------------------------------
app.use(express.json());//parse json string 

//----------------Route-----------------------------------------------------------------------------------

app.use('/',categoryroute)
app.use('/',subcategoryroute)
app.use('/',productroute)


// -----------------------------------------------------------------------------------------------
// connecting to databse ==> listening to requests
connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening to requests on port ${process.env.PORT}`)
    })
})

