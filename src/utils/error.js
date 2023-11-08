import ErrorHandller from "./errorHandller.js";
const errorMiddleware=(err,req,res,next)=>{
   err.statusCode=err.statusCode || 500;
   // err.message || "Internal Server Error";
   if(process.env.NODE_ENV==='DEVELOPMENT'){

       res.status(err.statusCode).json({
           success:false,
           error:err,
           errMessage:err.message,
           satck:err.satck
       })
   }
   if(process.env.NODE_ENV==='PRODUCTION'){
 let error={...err}
 err.message=err.message;
//   wrong mongoose object error
if(err.name==="CastError"){
   const message=`Resource not found. Invalid :${err,path}`
   err=new ErrorHandller(message,400)
}
if(err.code==11000){
   const message=`Duplicate ${Object.keys(err.keyvalue)}Entered`;
   err=new ErrorHandller(message,400);

}
if(err.name=="jsonWebTokenError"){
   const message="Invalid token error";
   err=new ErrorHandller(message,400);

}
if(err.name=="TokenExpiredError"){
   const message="Invalid token error";
   err=new ErrorHandller(message,400);

}
//   wrong mongoose validation error
if(err.name==="ValidationError"){
   const message=Object.values(err.errors).map(value=>value.message);
   err=new ErrorHandller(message,400);
}
       res.status(err.statusCode).json({
           success:false,
           message:err.message || "Internal Server Error",
            
       })
   }
}
export default errorMiddleware;