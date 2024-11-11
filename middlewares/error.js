const ErrorHandler=require('../utils/errorHandlers');
module.exports = (err,req,res,next)=>{
    // console.log("ABCDEF----",err);
    
    err.statusCode=err.statusCode || 500;
    
    if(process.env.NODE_ENV==="development"){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            message:err.message,
            stack:err.stack
        });
    }
    else {
      
        let error = { ...err }; // Spread syntax, but only copies some properties
        error.message = err.message; // Explicitly set the message
        error.statusCode = err.statusCode || 500; // Ensure statusCode is set

        // error.message = err.message;
        if(err.name==='CastError'){
            const message =`Resource not found. Invalid: ${err.path}`;
            error=new ErrorHandler(message,404);
        }
        if(err.code===11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
            error = new ErrorHandler(message,400);
        }
        if(err.name==="JsonWebTokenError"){
            const message = `JSON web Token is invalid try again!`;
            error = new ErrorHandler(message,500);  
        }
        if(err.name==="TokenExpiredError"){
            const message = `JSON web Token is expired!`;
            error = new ErrorHandler(message,500);  
        }

        res.status(error.statusCode).json({
            success:false,
            message :error.message || 'Internal Server Error'
        });
    }
   

};