const express = require('express');
const mongoose = require('mongoose');
const profileModel = require('../model/profileModel');
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
createProfileImage: async(req,res)=>{

},
updateProfileImage: async(req,res)=>{

},
deleteProfileImage: async(req,res)=>{

},

};
