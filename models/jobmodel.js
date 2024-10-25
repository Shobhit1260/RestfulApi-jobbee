const mongoose = require('mongoose');
const validator= require('validator');
const jobsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please enter a job title'],
        maxlength:[100,'job tittle should be under 100 characters'],
        trim:true,
    },

    slug : String,

    description : {
        type:String,
        required:[true,'please enter the description']
    },
    email:{
        type:String,
        validate:[validator.isEmail,'please enter a valid email'],
    },
    address:{
        type:String,
        required:[true,'please enter the address'],
    },
    industry:{
        type:String,
        required:true,
        enum:{
            values:[
                'Information Technology',
                'master',
                'bachelor',
            ],
            message:"enter the industry name"
        }
    }

})

module.exports=mongoose.model('Job',jobsSchema);