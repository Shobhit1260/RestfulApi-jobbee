
const express = require('express');
const router = express.Router();
//importing the controller method
const {getJobs,postJobs}=require('../controller/jobscontroller.js');

router.route('/jobs').get(getJobs);

router.get('/jobs',(req,res)=>{
   
})
router.route('/new/job').post(postJobs);
module.exports=router;