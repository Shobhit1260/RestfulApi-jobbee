const mongoose = require('mongoose');
const validator= require('validator');
const slugify = require('slugify');
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
        required:[true,'please enter the description'],
        maxlength :[1000,'Job description can not exceed 1000 characters.']
    },
    email:{
        type:String,
        validate:[validator.isEmail,'please enter a valid email'],
        unique:true
    },
    address:{
        type:String,
        required:[true,'please enter the address'],
    },
    company :  {
        type: String ,
        required : [true,'please add Company name.']
    },
    jobType:{
        type:String,
        required: [true, 'plz enter'],
        enum :{
            values :[
                'Permanent',
                'Temporary',
                'Internship'
            ],
            message:"please select the correct options for Job "
        }
    },
    industry:{
        type:[String],
        required:true,
        enum:{
            values:[
                'Information Technology',
                'Business',
                'Banking',
                'Education',
                'Telecommunication',
                'other'
            ],
            message:"please select the correct options for industry name"
        }
    },
    minEducation :{
        type: String,
        required :true,
        enum:{
            values:[
                'Phd',
                'Bachelors',
                'Master',
            ],
            message:'please select the correct options for Education.'
        }
    },
    positions:{
        type:Number ,
        default:1,
    },
    experience:{
        type: String,
        required :true,
        enum:{
            values:[
                'No Experience',
                '1 Year - 2 Years',
                '2 Years - 5 Years',
                '5 Years +'
              ],
              message:"please select the correct options for Experience"
        } 
    },
    salary:{
        type:Number,
        required:[true,'Please enter the expected salary for this job ']
    },
    postingDate : {
        type:Date,
        default : Date.now
    },
    lastDate:{
        type: Date,
        default : new Date().setDate(new Date().getDate()+7)
    },
     applicantsApplied : {
        type :[Object],
        select : false
     },
     user : {
        type:mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
     }
})
jobsSchema.pre('save',  function (next) {
        // Generate slug from the title
        // @ts-ignore
        this.slug =  slugify(this.title, { lower: true });
    next();
});

module.exports=mongoose.model('Job',jobsSchema);