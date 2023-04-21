const express = require("express");
const authenticationMW=require("./../Middlewares/Authorization")
const controller = require("../Controllers/category")
const validator = require("./../Middlewares/errorValidation");

const router = express.Router();

/////////////router of cateegory which route to the category

router.route("/Category")
    .get(authenticationMW.isClientOrAdmin,      //get categories
        controller.getAllCategories)
        .post(  
            authenticationMW.isAdmin,           //add category
            controller.addCategory)
    // .delete(
    //     authenticationMW.isAdmin,
    //     controller.deleteCategory)



 router.route("/Category/:id")
        .get(
            authenticationMW.isClientOrAdmin,       //get specific one
                controller.getCategoryByID)
        .delete( 
                authenticationMW.isAdmin,           //delete one
                controller.deleteCategoryByID)
        .patch(  
                authenticationMW.isAdmin,           //update one
                controller.updateCategory)

module.exports = router