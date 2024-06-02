const express=require('express');
const app= express();
const connectionURL=require('./database/database');
const PORT=3000;
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
