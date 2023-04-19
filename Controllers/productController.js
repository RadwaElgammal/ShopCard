const { request, response } = require('express');
const mongoose = require('mongoose');

require('../Models/ProductModel');
require('../Models/categoryModel');

const ProductSchema = mongoose.model('Products');
const catSchema = mongoose.model('Category');
exports.getAllProducts=(request , response , next)=>{

    const page = request.query.page *1 || 1;
    const limit = request.query.limit *1 || 10;
    const skip = (page-1) * limit;
    
    ProductSchema.find(query).populate({path:'Category'}).skip(skip).limit(limit)
    .then((data)=>{
       let prdAfterSort = sortPatients(data,request.query)
        response.status(200).json(prdAfterSort);
    })
    .catch((error)=>next(error)) ;
};

// exports.deleteProducts= (request,response,next)=>{
//     ProductSchema.deleteMany(query)
//     .then((data)=>{
//         response.status(200).json({message:"delete all products"});
//     })
//     .catch((error)=>next(error));
// };

exports.getProductByID= (request,request,next)=>{
    patientSchema.findOne({_id:request.params.id})
    .populate({path:"Category"})
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

module.exports.deleteProductByID = (request, response, next)=>{
    patientSchema.findByIdAndDelete({_id:request.params.id})
        .then(()=>{
            response.status(200).json({message:"deleted"+request.params.id});
        })
        .catch((error)=>next(error));
};

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
