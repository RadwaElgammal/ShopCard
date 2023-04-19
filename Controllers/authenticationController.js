const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request } = require("http");
const { response } = require("express");
require("./../Models/userModel");


const saltRounds = 10;

const userSchema = mongoose.model("users")

module.exports.signUp = async(request, response , next)=>{
    console.log(request);
    const emailExist = await userSchema.findOne({email:request.body.email});
    if(emailExist){
        return response.status(400).json({message:"Email is already Used"});
    }

    const {fullName,password,email,age,gender,address,role } = request.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user = new userSchema({
        fullName:fullName,
        password:hash,
        email:email,
        age:age,
        gender:gender,
        address:address,
        role:role,
        // image:request.file.path
    });

    user.save()
        .then(result=>{
            response.status(200).json({message:"User added"});
        })
        .catch(err=>next(err));
}


module.exports.login=(async(request,response,next)=>{

    const user = await userSchema.findOne({email:request.body.email})
    if(user != null)
    {
        try
        {
            if(await bcrypt.compare(request.body.password, user.password))
            {
                let token = jwt.sign({
                    id:user._id,
                    role:user.role,
                },
                process.env.SECRET_KEY,
                {expiresIn:"2h"})

                if(true && user.role=="admin")
                {
                    response.status(200).json({message:"Admin",token});

                }
                else if (true && user.role =="client")
                {
                    response.status(200).json({message:"client",token});

                }
              
            }
            else
            {
                response.status(400).json({message:"Incorrect password"});
            }
           
        }
        catch(error)
        {
            console.log("hello")
            next(error)
        }
    }
    else
    {
        response.status(400).json({message:"can not find user"});
    }
});




