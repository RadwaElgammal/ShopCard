const express = require("express");
const authenticationMW=require("./../Middlewares/Authorization")
const controller = require("../Controllers/category")
const validator = require("./../Middlewares/errorValidation");

const router = express.Router();


router.route("/Category")
    .get(authenticationMW.isClientOrAdmin,
        controller.getAllCategories)
    // .delete(
    //     authenticationMW.isAdmin,
    //     controller.deleteCategory)



 router.route("/Category/:id")
        .get(
            authenticationMW.isClientOrAdmin,
                controller.getCategoryByID)
        // .delete( 
        //         authenticationMW.isAdmin,
        //         controller.deleteCategoryByID)
        .patch(  
                authenticationMW.isAdmin,
                controller.updateCategory)

module.exports = router