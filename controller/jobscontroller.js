// exporting the model 
const Job =require('../models/jobmodel');
// importing error module from 
const errorHandler = require('../utils/errorHandlers');
const catchAsyncErrors=require('../middlewares/catchAsyncErrors.js')
// @ts-ignore
const apiFilters=require('../utils/filter');
// exporting the controller method => /api/v1/jobs

exports.getJob=catchAsyncErrors( async (req,res,next)=>{
    const job = await Job.findOne({_id: req.params.id, slug: req.params.slug});
    console.log(job);
    if(!job){
        return next(new errorHandler('job not found',404));
   }
    console.log(job)
    res.status(200).json(
        {
        success:true,   
        data:job
        }
    )
})

exports.getJobs =catchAsyncErrors( async (req,res,next)=>{
    const APIFilters =new apiFilters(Job.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery();
   const jobs=  await APIFilters.query; 
   
    // const jobs = await Job.find();
    res.status(200).json(
        {
        success:true,  
        length:jobs.length,  
        data:jobs,
        }
    )
})

exports.postJobs=catchAsyncErrors( async (req,res,next)=>{
    // Adding User to body
    req.body.user = req.user.id;
    const job = await Job.create(req.body);
    res.status(201).json(
        {   
            success:true,    
            message:'data is posted',
            data:job,
        }
    )
}
)

exports.updateJob =catchAsyncErrors( async (req,res,next)=>{
    let job = await Job.findById(req.params.id);

    if(!job){
         return next(new errorHandler('job not found',404));
    }
    job = await Job.findByIdAndUpdate(req.params.id,req.body,{
       new: true,
       runValidators: true,
       useFindAndModify :  false
    });
    res.status(200).json({
        success:true,
        message : 'job is Updated',
        data : job,
    });
});

exports.deleteJob =catchAsyncErrors( async (req,res,next)=>{
    let job = await Job.findById(req.params.id);

    if(!job){
         return next(new errorHandler("job not found", 404));
    }
    job = await Job.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success:true,
        message : 'job is deleted',
        
    })
})

// Get stats about a topic (job) => /api/v1/stats/:topic
exports.jobStats = catchAsyncErrors(async (req,res,next)=>{
   const stats = await Job.aggregate([
    {
        $match :{$text :{ $search : "\""+req.params.topic+"\""}}
    },
    {
        $group:{
            _id :{$toUpper : `$experience`},
            totalJobs : {$sum : 1},
            avgPosition : {$avg : `$positions`},
            avgSalary :{$avg : '$salary'},
            minSalary : {$min : '$salary'},
            maxSalary : {$max : `$salary`}
        }  
    }
   ]);
    if(stats.length === 0){
        return res.status(200).json({
            success :false,
            message :`No stats found for - ${req.params.topic}`
        })
    }
     res.status(200).json({
        success : true,
        data : stats
     });
})


