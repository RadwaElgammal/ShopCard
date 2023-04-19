const express=require("express");
const mongoose = require('mongoose');
const  morgan = require('morgan');
const path = require("path");
const cors = require('cors');

const server=express();
server.use(cors());
const bodyParser =require("body-parser");

const userRoutes = require("./Models/user");
const authenticationRouter = require("./Models/authentication");
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
