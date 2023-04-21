const mongoose = require('mongoose');


////////////model of address and its data 

const adressSchema= new mongoose.Schema({
    city: String,
    street:String,
    building: Number
} ,{_id:false}
);

module.exports = {adressSchema}