// exporting the model 
const Job =require('../models/jobmodel')
// exporting the controller method => /api/v1/jobs
exports.getJobs= async (req,res)=>{
    const jobs = await Job.find();
    res.status(200).json(
        {
        success:true,  
        length:jobs.length,  
        data:jobs,
        }
    )
}

exports.postJobs=async (req,res)=>{
    const job = await Job.create(req.body);
    res.status(200).json(
        {
            success:true,    
            message:'data is posted',
            data:job,
        }
    )
}