import express from "express";
import morgan from "morgan";
import cors from "cors";
import connection from "./config/connection.js";
import categoryroute from "./routes/categoryRoute.js";
import subcategoryroute from "./routes/subcategoryRoute.js";
import userroute from "./routes/userRoute.js";
import authorroute from "./routes/authRoute.js";
import productroute from "./routes/productRoute.js";
import reviewroute from "./routes/reviewRoute.js";
// import currencyroute from './routes/currencyRoute.js';
import orderroute from "./routes/orderRoute.js";
import cartroute from "./routes/cartRoute.js";
import wishlistroute from "./routes/wishlistRoute.js";
import striperoute from "./routes/stripeRoute.js";
import messageroute from "./routes/messageRoute.js";
import accesstoken from "./controllers/accessTokenController.js";
import cookieParser from "cookie-parser";
import { validateToken } from "./Middleware/validateTokenHandler.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Add other HTTP methods if needed
    allowedHeaders: ["Content-Type", "Authorization"], // Add other allowed headers if needed
    credentials: true, // Allow cookies to be sent with the request
  })
);

// parser
app.use(express.json());

// Use cookie parser middleware
app.use(cookieParser());

// --------------------morgan---------------------------------------------------------------------------------
// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.Node_ENV}`);
}

// routes
app.use(categoryroute);
app.use(subcategoryroute);
app.use(userroute);
app.use("/author", authorroute);
app.use(productroute);
app.use(reviewroute);
// app.use('/', currencyroute)
app.use(orderroute);
app.use('/cart',cartroute);
app.use(striperoute);
app.use(messageroute);
app.use(wishlistroute);
app.use(accesstoken);

// connecting to databse ==> listening to requests
connection().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening to requests on port ${process.env.PORT}`);
  });
});
