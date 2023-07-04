const express = require('express');
const cookieParser = require('cookie-parser');
const app=express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");



const errorMiddleware = require("./middleware/error");
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"config/.env"});
}

app.use(express.json({limit: '80mb'}));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(fileUpload());

//Routes import

const product = require("./routes/productRoute");

const user = require('./routes/userRoute');


const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

// Middleware for error

app.use(errorMiddleware);

app.use("/api/v1",product);
//for user registration

app.use("/api/v1",user);
app.use("/api/v1",payment);

app.use("/api/v1",order);
module.exports = app;
