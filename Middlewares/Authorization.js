const express= require("express");



module.exports.isAdmin=(request, response, next)=> {
    if (request.role == 'admin')
    {
        console.log(request.role)
        next();
    }
    else {
        let error= new Error("Not Authorized")
        error.status=403;
        next(error)
    }
}

module.exports.isClient=(request, response, next)=> {
    if ((request.role == 'client'))
    {
        console.log(request.role)

        next();
    }
    else {
        let error= new Error("Not Authorized")
        error.status=403;
        next(error)
    }
}


module.exports.isClientOrAdmin=(request, response, next)=> {
    if ((request.role == 'client')||(request.role == 'admin'))
    {
        console.log(request.role)
     
        next();
    }
    else {
        let error= new Error("Not Authorized")
        error.status=403;
        next(error)
    }
}





