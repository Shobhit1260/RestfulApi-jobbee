
const express = require('express');
const router = express.Router();
//importing the controller method
const {getJobs,getJob,postJobs,updateJob, deleteJob, jobStats}=require('../controller/jobscontroller.js');

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/authentication.js')

router.route('/get/jobs').get(getJobs);
router.route('/get/job/:id/:slug').get(getJob);
router.route('/new/job').post(isAuthenticatedUser,authorizeRoles('employeer','admin'),postJobs);
router.route('/stats/:topic').get(jobStats);
router.route('/job/new').put(isAuthenticatedUser ,updateJob).delete(isAuthenticatedUser,deleteJob);
module.exports=router;