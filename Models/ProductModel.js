const mongoose = require('mongoose');
const address = require('./adressModel');

const productSchema = new mongoose.Schema({
    _id : {type :mongoose.Types.ObjectId , auto:true},
    prdName: {type:String , required:true,unique:true},
    price: { type: Number, required: true },
    quantity:{type:Number,default:0},
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image:{type:String }
});

mongoose.model("Products",productSchema);

