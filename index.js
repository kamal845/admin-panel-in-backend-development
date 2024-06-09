const express=require('express');
const app= express();
const path = require('path');
const connectionURL=require('./database/database');
const routes=require('./routes/route');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
// Access the PORT variable from process.env
const PORT = process.env.PORT || 3000;
app.use('/',routes);
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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'assets')));
