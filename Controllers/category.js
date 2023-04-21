
const {request,response} = require("express");
const { Result } = require("express-validator");
const mongoose = require ("mongoose");

require ("../Models/categoryModel");
const catSchema = mongoose.model('Category');

/////////category controoler which contains function of sign up and log in 

//fun to return all categories

module.exports.getAllCategories=(request , response , next)=>{

    const query = {};
    if (request.query.catName) query.catName = request.query.catName;

    const page = request.query.page *1 || 1;
    const limit = request.query.limit *1 || 10;
    const skip = (page-1) * limit;
    
    catSchema.find(query).skip(skip).limit(limit)
    .then((data)=>{
      
        response.status(200).json(data);
    })
    .catch((error)=>next(error)) ;
};

///////fun to add a specefic category

exports.addCategory=async (request,response,next)=>{
    const {catName,description } = request.body;

    let newcategory = new catSchema({
        catName:catName,
        description:description,
    });
    console.log(newcategory)
    await newcategory.save()
    .then(result => {
        console.log(result)
        console.log("res" + newcategory);
        response.status(200).json({ Message: "new category Added" });
    })
    .catch(error => {
        response.status(500).json({ error: error.message });
    });

}

// exports.deleteCategory= (request,response,next)=>{
//     catSchema.deleteMany(query)
//     .then((data)=>{
//         response.status(200).json({message:"delete all categories"});
//     })
//     .catch((error)=>next(error));
// };

///////////fun to get specefic category

module.exports.getCategoryByID= (request,response,next)=>{
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

/////////////////fun to delete specefic category

module.exports.deleteCategoryByID = (request, response, next)=>{
    catSchema.findByIdAndRemove({_id:request.params.id})
        .then(()=>{
            response.status(200).json({message:"deleted"+request.params.id});
        })
        .catch((error)=>next(error));
};

/////////////////fun to update specefic category

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
