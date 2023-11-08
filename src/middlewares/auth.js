const jwt  = require("jsonwebtoken");
const catchValidationerrors=require("../middlewares/validationErrors");
const ErrorHandller = require("../utilis/errorHandller");
const User = require("../models/user");

exports.isAuthenthicatheduser=catchValidationerrors(async (req,res,next)=>{
    const {token}=req.cookies
    console.log(token);
    if(!token){
        return next(new ErrorHandller("LOGIN FIRST TO ACCESS THE RESOURCE",401))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded.id);
    next()
})
// handlling users roles
exports.authorizedRoles=(...roles)=>{
    return (req,res,next)=>{
if(!roles.includes(req.user.role)){
     return next(new ErrorHandller(`Role(${req.user.role}) is not allowed to access`,403))
}
next()
    }
}