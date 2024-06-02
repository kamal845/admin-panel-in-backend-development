const mongoose=require('mongoose');
require('dotenv').config(); // Load environment variables
const connectionURL = process.env.MONGODB_URL;
const databaseConnect= async()=>{
    try {
       await mongoose.connect(connectionURL),{
            // useNewUrlParser:true,
            // useUnifiedTopology:true
            };
            console.log("database is connected");
    } catch (error) {
        console.log("error");
    }
    }
    module.exports=databaseConnect;