const express = require("express");
const authenticationMW=require("./../Middlewares/Authorization")
const controller = require("../Controllers/product")
const router = express.Router();

/////////////router of products which route to the products

router.route("/Products")
    .get(authenticationMW.isClientOrAdmin,          //get all 
        controller.getAllProducts)
    .post(authenticationMW.isAdmin,                 //add prd
        controller.addProduct)
    // .delete(
    //     authenticationMW.isAdmin,
    //     controller.deleteProducts)



 router.route("/Products/:id")
        .get(
            authenticationMW.isClientOrAdmin,       //get specific one
                controller.getProductByID)
        .delete( 
                authenticationMW.isAdmin,           //delete speific one
                controller.deleteProductByID)
        .patch(  
                authenticationMW.isAdmin,           //update one
                controller.updateProduct)

  module.exports = router;