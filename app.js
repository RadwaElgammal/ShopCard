const express=require("express");
const mongoose = require('mongoose');
const  morgan = require('morgan');
const path = require("path");
const cors = require('cors');

const server=express();
server.use(cors());
const bodyParser =require("body-parser")
const userRoutes = require("./Routes/user");
const categoryRoutes = require("./Routes/category");
const productRoutes = require("./Routes/product");
const authenticationRouter = require("./Routes/authentication");
const authenticationMW = require ("./Middlewares/authenticationMW");


require("dotenv").config();

let port=process.env.PORT||8080;

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB_URL)

    .then(()=>{
        server.listen(port,()=>{
            console.log("I am listening..............", port);
        });
        console.log("db connected");
    })
    .catch(error =>{
        console.log("DB error",error);
    });

server.use(morgan('combined'));
server.use(express.json());


//routes
server.use(authenticationRouter);
server.use(authenticationMW);
server.use(userRoutes);

server.use(categoryRoutes);
server.use(productRoutes);

//Not Found MW
server.use((request ,response, next)=>{
    response.status(404).json({data:"Not Fount"});
});

//Error MW
server.use((error,request,response,next)=>{
    response.status(500).json({message:"Error "+error});
});