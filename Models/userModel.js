const mongoose = require('mongoose');
const address = require('./adressModel');

////////////model of user and its data 

const userSchema = new mongoose.Schema({
    _id : {type :mongoose.Types.ObjectId , auto:true},
    fullName: {type:String , required:true},
    password: {type:String , required:true},
    email:{ type: String, unique: true, required:true},
    age :{type : Number , required:true },
    gender:{type: String, enum: ['Female','Male']},
    address: {type:address.adressSchema},
    role:{type: String, required: true, enum: ["admin", "client"], default:'client'},
    image:{type:String }
});

mongoose.model("users",userSchema);

