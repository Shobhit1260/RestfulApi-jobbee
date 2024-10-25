const express=require ('express')
const app = express();
const dotenv = require('dotenv');
// Setting up the config.env file variables
dotenv.config({path:'./config/config.env'});
//importing the database connection
const connectiontodb=require('./config/database.js');

const startserver= async ()=>{
    try{
        await connectiontodb();
        app.use(express.json());
        // /importing all the routes
        const route =require('./Routes/jobs.js');
        
        const port=process.env.PORT;
        app.use('/api/v1',route);
        
        app.listen(port,()=>{
            console.log(`Server is running on port ${process.env.PORT} and in ${process.env.NODE_ENV} mode`);
        })        
    }
    catch(error){
        console.error("Error in starting the server:", error.message);
    }
   
}
startserver();
