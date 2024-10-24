const express = require('express');
const router = express.Router();
//importing the controller method
const {getJobs}=require('../controller/jobscontroller.js');

router.route('/jobs').get(getJobs);

router.get('/jobs',(req,res)=>{
   
})

 module.exports=router;