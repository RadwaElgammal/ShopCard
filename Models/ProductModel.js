const mongoose = require('mongoose');
const address = require('./adressModel');
const AutoIncreament = require('mongoose-sequence')(mongoose);

////////////model of user and its data 

const productSchema = new mongoose.Schema({
    _id:{type:Number},
    prdName: {type:String , required:true,unique:true},
    price: { type: Number, required: true },
    quantity:{type:Number,default:0},
    description: { type: String },
    category: { type: mongoose.Schema.Types.Number, ref: 'Category' },
    //image:{type:String }
},{_id:false}
);
productSchema.plugin(AutoIncreament, { inc_field: '_id' ,id:'productCounter'});

mongoose.model("Products",productSchema);

