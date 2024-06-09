const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
  Profileimage: {
    type: String,
  },
  Fullname: {
    type: String,
    required: true,
  },
  About: {
    type: String,
    required: true,
  },
  Company: {
    type: String,
    required: true,
  },
  Job: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("profile", profileSchema);