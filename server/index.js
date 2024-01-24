import express from 'express';
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
import cartroute from './routes/cartRoute.js';
import wishlistroute from './routes/wishlistRoute.js';
import striperoute from './routes/stripeRoute.js';
import messageroute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';

const app = express();

// parser
app.use(express.json());

// Use cookie parser middleware
app.use(cookieParser());

// --------------------morgan---------------------------------------------------------------------------------
// morgan
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.Node_ENV}`)
}


// routes

app.use('/', categoryroute)
app.use('/', subcategoryroute)
app.use('/', userroute)
app.use('/author', authorroute)
app.use('/', productroute)
app.use('/', reviewroute)
app.use('/', currencyroute)
app.use('/', orderroute)
app.use('/', cartroute)
app.use('/', striperoute)
app.use('/', messageroute)
app.use('/', wishlistroute)



// connecting to databse ==> listening to requests
connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening to requests on port ${process.env.PORT}`)
    })
})