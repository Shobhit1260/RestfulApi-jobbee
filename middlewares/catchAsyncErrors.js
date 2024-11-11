// alterate of "try-catch" or 
// handling the Promise Rejection with catchAsyncErrors

// neccesary because the async error are automatically shown on terimal 
// we have organise them try-catch or error-handling mechanism

module.exports = func =>(req,res,next)=>{
    Promise.resolve(func(req,res,next)).catch(next);  
}


