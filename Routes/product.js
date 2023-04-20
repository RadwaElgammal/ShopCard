const express = require("express");
const authenticationMW=require("./../Middlewares/Authorization")
const controller = require("../Controllers/product")
const router = express.Router();


router.route("/Products")
    .get(authenticationMW.isClientOrAdmin,
        controller.getAllProducts)
    .post(authenticationMW.isAdmin,
        controller.addProduct)
    // .delete(
    //     authenticationMW.isAdmin,
    //     controller.deleteProducts)



 router.route("/Products/:id")
        .get(
            authenticationMW.isClientOrAdmin,
                controller.getProductByID)
        // .delete( 
        //         authenticationMW.isAdmin,
        //         controller.deleteProductByID)
        .patch(  
                authenticationMW.isAdmin,
                controller.updateProduct)

  module.exports = router;