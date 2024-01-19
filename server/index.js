import express from 'express';// prepare environment to use js
import morgan from 'morgan';
import connection from "./config/connection.js";
import categoryroute from './routes/categoryRoute.js';
import subcategoryroute from './routes/subcategoryRoute.js';
import userroute from './routes/userRoute.js';
import authorroute from './routes/authRoute.js';
import productroute from './routes/productRoute.js';
import reviewroute from './routes/reviewRoute.js';
import currencyroute from './routes/currencyRoute.js';
import orderroute from './routes/orderRoute.js';
import striperoute from './routes/stripeRoute.js';


const app = express();
// --------------------morgan---------------------------------------------------------------------------------
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
    console.log(`mode:${process.env.Node_ENV}`)
}
// -----------------------Middleware---------------------------------------------------------------------
app.use(express.json());//parse json string 

//----------------Route-----------------------------------------------------------------------------------

app.use('/', categoryroute)
app.use('/', subcategoryroute)
app.use('/', userroute)
app.use('/author', authorroute)
app.use('/', productroute)
app.use('/',reviewroute)
app.use('/',currencyroute)
app.use('/',orderroute)
app.use('/',striperoute)
// -----------------------------------------------------------------------------------------------
// connecting to databse ==> listening to requests
connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening to requests on port ${process.env.PORT}`)
    })
})

