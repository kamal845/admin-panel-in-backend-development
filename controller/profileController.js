const express = require('express');
const mongoose = require('mongoose');
const multer=require('multer');
const profileModel = require('../model/profileModel');
const path=require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Adjust the path as per your project structure
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('Profileimage');

module.exports = {

  getProfileAll: async (req, res) => {
    try {
        // Fetch all profiles or any default profile
        // For example:
        const profiles = await profileModel.find();
        if (!profiles || profiles.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No profiles found'
            });
        }
        // Render the profile.ejs template with the first profile (or any default profile) 
        res.render('profile', { profile: profiles[0] });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
},


  getProfile: async (req, res) => {
    try {
      const profile = await profileModel.findById(req.params.id);
      console.log("Profile:", profile);
      if (!profile) {
        return res.status(404).json({
          status: 'error',
          message: 'Profile not found'
        });
      }
      console.log("Profile data:", profile);
      res.render('profile', { profile });
      // res.render('profile');
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  },

  getCreateProfilePage: (req, res) => {
    res.render('createProfile');
  },
  updateProfile: async (req, res) => {
  const { Fullname, About, Company, Job, Country, Address, Phone, Email } = req.body;
  const profileFields = { Fullname, About, Company, Job, Country, Address, Phone, Email };

  console.log("Profile update request body:", req.body);
  
  try {
      let profile = await profileModel.findById(req.params.id);
      if (!profile) {
          return res.status(404).json({
              status: 'error',
              message: 'Profile not found'
          });
      }

      console.log("Profile found:", profile);

      profile = await profileModel.findByIdAndUpdate(req.params.id, { $set: profileFields }, { new: true });
      
      console.log("Profile after update:", profile);

      res.redirect(`/profile/${req.params.id}`);
  } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
          status: 'error',
          message: 'Internal Server Error'
      });
  }
},
uploadProfileImage: async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err.message);
      return res.status(400).send({ message: err.message });
    }

    console.log('Uploaded file:', req.file); // डिबगिंग के लिए लॉगिंग

    try {
      const profile = await profileModel.findById(req.params.id);
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found' });
      }

      if (!req.file || !req.file.path) {
        return res.status(400).send({ message: 'Uploaded file not found or invalid' });
      }

      const relativePath = `/uploads/${req.file.filename}`; // केवल रिलेवेंट पाथ स्टोर करें
      profile.Profileimage = relativePath;
      await profile.save();
      res.redirect(`/profile/${profile._id}`);
    } catch (error) {
      console.error('Database error:', error.message); // डिबगिंग के लिए लॉगिंग
      res.status(500).send({ message: error.message });
    }
  });
},

deleteProfileImage: async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id); // Corrected the model name
    if (!profile) {
      return res.status(404).send({ message: 'Profile not found' });
    }

    profile.Profileimage = null; // Or you can use a default image path
    await profile.save();
    res.redirect(`/profile/${profile._id}`); // Redirect to the profile page of the updated profile
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
};