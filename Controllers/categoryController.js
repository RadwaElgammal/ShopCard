const { request, response } = require('express');
const mongoose = require('mongoose');

require('../Models/categoryModel');

const catSchema = mongoose.model('Category');
exports.getAllCategories=(request , response , next)=>{

    const page = request.query.page *1 || 1;
    const limit = request.query.limit *1 || 10;
    const skip = (page-1) * limit;
    
    catSchema.find(query).skip(skip).limit(limit)
    .then((data)=>{
       let catAfterSort = sortPatients(data,request.query)
        response.status(200).json(catAfterSort);
    })
    .catch((error)=>next(error)) ;
};

exports.deleteCategory= (request,response,next)=>{
    catSchema.deleteMany(query)
    .then((data)=>{
        response.status(200).json({message:"delete all categories"});
    })
    .catch((error)=>next(error));
};

exports.getCategoryByID= (request,request,next)=>{
    catSchema.findOne({_id:request.params.id})
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

module.exports.deleteCategoryByID = (request, response, next)=>{
    catSchema.findByIdAndDelete({_id:request.params.id})
        .then(()=>{
            response.status(200).json({message:"deleted"+request.params.id});
        })
        .catch((error)=>next(error));
};

module.exports.updateCategory = (request, response, next)=>{
    catSchema.findByIdAndUpdate({
        _id:request.params.id
    },
    {
        $set:{
            catName:request.body.catName,
            description:request.body.description,
        }
    }).then(result=>{
        response.status(200).json({message:" Category updated"});
    })
    .catch(error=>next(error))
};
