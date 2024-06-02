const express=require('express');
const app= express();
const connectionURL=require('./database/database');
require('dotenv').config();
// Access the PORT variable from process.env
const PORT = process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
try {
   connectionURL().then(() => {
        console.log("Server is started on port no. 3000");
    }).catch(error => {
        console.log("Error connecting to the database:", error);
    });
} 
catch (error) {
    console.log("error");
}
})
