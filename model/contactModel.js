const mongoose = require("mongoose");
const contactSchema=mongoose.Schema({
Name:{
    type:String,
    required:true
},
Email:{
    type:String,
    required:true
},
Subject:{
    type:String,
    required:true
},
Message:{
    type:String,
    required:true
}
})

module.exports=mongoose.model('contact',contactSchema);