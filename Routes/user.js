
const express = require("express");
const router = express.Router();

const controller = require("./../Controllers/user");

const userValidation = require("./../Middlewares/userMW");
const validator = require("./../Middlewares/errorValidation");
const authenticationMW=require("./../Middlewares/Authorization")

const upload = require("./../Middlewares/uploadImageMW");

///////////router to get users

router.route("/users")      
    .get(authenticationMW.isAdmin,          //get all users
        controller.getAllUsers)
    .delete(
        authenticationMW.isAdmin,           //delete all users
        controller.deleteUsers)
    .patch(
        authenticationMW.isAdmin,           //update users
        upload.single("image"),
        userValidation.userbodyValidation,
        validator,
        controller.updateUser)


router.route("/changePassword")             //router of change password 
        .post(controller.changePassword)
module.exports = router