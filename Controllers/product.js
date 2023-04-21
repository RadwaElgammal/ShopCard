const { request, response } = require('express');
const mongoose = require('mongoose');

require('../Models/ProductModel');
require('../Models/categoryModel');

/////////product controoler which contains function of sign up and log in 

const ProductSchema = mongoose.model('Products');
const catSchema = mongoose.model('Category');

/////////////////fun to get all products


exports.getAllProducts=(request , response , next)=>{

    
    const query = {};
    if (request.query.price) query.price = request.query.price;

    const page = request.query.page *1 || 1;
    const limit = request.query.limit *1 || 10;
    const skip = (page-1) * limit;

    ProductSchema.find(query).populate({path:'category'})
    .then(data=>{
        console.log(data)
        response.status(201).json(data)
    })
    .catch(error=>next(error));
};
/////////////////fun to add specefic product

exports.addProduct =(request,response,next)=>{
    let newprd = new ProductSchema({
        prdName:request.body.prdName,
        price:request.body.price,
        quantity:request.body.quantity,
        description:request.body.description,
        category:request.body.category
    });
    newprd.save()
        .then(result =>{
            response.status(201).json({Message:"new product Added"});
        })
        .catch(error => next(error));
}
// exports.deleteProducts= (request,response,next)=>{
//     ProductSchema.deleteMany(query)
//     .then((data)=>{
//         response.status(200).json({message:"delete all products"});
//     })
//     .catch((error)=>next(error));
// };
/////////////////fun to get specefic product

exports.getProductByID= (request,response,next)=>{
    patientSchema.findOne({_id:request.params.id})
    .populate({path:"category"})
    .then((data)=>{
        if (data != null) {
            if (request.role == 'client' ||request.role == 'admin') {
                response.status(200).json(data);
            }
            else{
                response.json({message:"You aren't authourized to see this data"});
            }
        }
        else  {
        response.json({message:"Id is not Found"});
    }
    })
    .catch((error)=>next(error));
}
/////////////////fun to delete specefic product

module.exports.deleteProductByID = (request, response, next)=>{
    patientSchema.findByIdAndDelete({_id:request.params.id})
        .then(()=>{
            response.status(200).json({message:"deleted"+request.params.id});
        })
        .catch((error)=>next(error));
};
/////////////////fun to update specefic product

module.exports.updateProduct = async (request, response, next)=>{
   try{
    const prdId = request.params.id;
    const prd = await ProductSchema.findByIdAndUpdate({_id:prdId},
        {$set:{
            prdName:request.body.prdName,
            price:request.body.price,
            quantity:request.body.quantity,
            description:request.body.description,
            image:request.body.image

        }});
        
    const category = await catSchema.findByIdAndUpdate({_id:prd.category},
        {$set:{
            catName:request.body.catName
        }});

        response.status(200).json({message:"product Updated"})
   }
   catch(error)
   {
    next(error)
   }
};
