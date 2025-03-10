const mongoose = require('mongoose');
const userpaymentSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email: {
    type: String,
    required: true,
    unique: true
  },
  stripeCustomerId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }}
);
module.exports=mongoose.model('userpayment',userpaymentSchema);