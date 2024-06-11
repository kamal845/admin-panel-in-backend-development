// const profileModel = require('../models/profileModel');

// const profileController = {
//     profile: async (req, res) => {
//         const { Fullname, About, Company, Job, Country, Address, Phone, Email } = req.body;
//         const newProfile = new profileModel({
//             Fullname, About, Company, Job, Country, Address, Phone, Email
//         });
//         try {
//             const profile = await newProfile.save();
//             res.status(201).json({
//                 status: 'success',
//                 message: 'Data created successfully',
//                 data: profile
//             });
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     },

//     getProfile: async (req, res) => {
//         try {
//             const profile = await profileModel.findById(req.params.id);
//             if (!profile) {
//                 return res.status(404).json({
//                     status: 'error',
//                     message: 'Profile not found'
//                 });
//             }
//             res.render('profile', { profile, activeTab: 'overview' });
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     },

//     getEditProfilePage: async (req, res) => {
//         try {
//             const profile = await profileModel.findById(req.params.id);
//             if (!profile) {
//                 return res.status(404).json({
//                     status: 'error',
//                     message: 'Profile not found'
//                 });
//             }
//             res.render('profile', { profile, activeTab: 'edit' });
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     },

//     updateProfile: async (req, res) => {
//         const { Fullname, About, Company, Job, Country, Address, Phone, Email } = req.body;
//         const profileFields = { Fullname, About, Company, Job, Country, Address, Phone, Email };

//         try {
//             let profile = await profileModel.findById(req.params.id);
//             if (!profile) {
//                 return res.status(404).json({
//                     status: 'error',
//                     message: 'Profile not found'
//                 });
//             }
//             profile = await profileModel.findByIdAndUpdate(req.params.id, { $set: profileFields }, { new: true });
//             res.redirect(`/profile/${req.params.id}`);
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     }
// };

// module.exports = profileController;
const profileModel = require('../model/profileModel');
// const profileController = {
//     createProfile: async (req, res) => {
//         const { Fullname, About, Company, Job, Country, Address, Phone, Email } = req.body;
//         const newProfile = new profileModel({
//             Fullname, About, Company, Job, Country, Address, Phone, Email
//         });
//         try {
//             const profile = await newProfile.save();
//             // res.status(201).json({
//             //     status: 'success',
//             //     message: 'Data created successfully',
//             //     data: profile
//             // });
//             res.redirect('/profile/overview');
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     },

//     getProfile: async (req, res) => {
//         try {
//             const profile = await profileModel.findById(req.params.id);
//             if (!profile) {
//                 return res.status(404).json({
//                     status: 'error',
//                     message: 'Profile not found'
//                 });
//             }
//             res.render('profile', { profile, activeTab: 'overview' });
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     },

//     getEditProfilePage: async (req, res) => {
//         try {
//             const profile = await profileModel.findById(req.params.id);
//             if (!profile) {
//                 return res.status(404).json({
//                     status: 'error',
//                     message: 'Profile not found'
//                 });
//             }
//             res.render('profile', { profile, activeTab: 'edit' });
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     },

//     updateProfile: async (req, res) => {
//         const { Fullname, About, Company, Job, Country, Address, Phone, Email } = req.body;
//         const profileFields = { Fullname, About, Company, Job, Country, Address, Phone, Email };

//         try {
//             let profile = await profileModel.findById(req.params.id);
//             if (!profile) {
//                 return res.status(404).json({
//                     status: 'error',
//                     message: 'Profile not found'
//                 });
//             }
//             profile = await profileModel.findByIdAndUpdate(req.params.id, { $set: profileFields }, { new: true });
//             res.redirect(`/profile/${req.params.id}`);
//         } catch (error) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Internal Server Error'
//             });
//         }
//     }
// };

// module.exports = profileController;











const express = require('express');
const mongoose = require('mongoose');

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

  createProfile: async (req, res) => {
    try {
      const profile = new profileModel(req.body);
      await profile.save();
      res.redirect(`/profile/${profile._id}`);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const profile = await profileModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.redirect(`/profile/${id}`);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }
};