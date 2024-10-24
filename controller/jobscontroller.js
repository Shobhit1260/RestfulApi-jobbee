
// exporting the controller method => /api/v1/jobs
exports.getJobs=(req,res)=>{
    res.status(200).json(
        {
        success:true,    
        message:'getting something',
        }
    )
}