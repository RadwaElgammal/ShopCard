const express = require("express");
const authenticationMW=require("./../Middlewares/Authorization")
const controller = require("../Controllers/productController")
const router = express.Router();


router.route("/Products")
    .get(authenticationMW.isClientOrAdmin,
        controller.getAllProducts)
    .delete(
        authenticationMW.isAdmin,
        controller.deleteProducts)



 router.route("/Products/:id")
        .get(
            authenticationMW.isClientOrAdmin,
                controller.getProductByID)
        .delete( 
                authenticationMW.isAdmin,
                controller.deleteProductByID)
        .patch(  
                authenticationMW.isAdmin,
                controller.updateProduct)