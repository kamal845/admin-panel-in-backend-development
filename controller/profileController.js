const express=require('express');
const mongoose=require('mongoose');
const profileModel=require('../model/profileModel');
module.exports={
    profile: async (req, res) => {
        const { Fullname, About, Company, Job, Country, Address, Phone, Email } = req.body;
        const newProfile = new profileModel({
          Fullname, About, Company, Job, Country,Address,Phone,Email});
        try {
          const profile = await newProfile.save();
          res.status(201).json({
            status: 'success',
            message: 'Data created successfully',
            data: profile
          });
        } catch (error) {
          res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
          });
        }
      },
    updateprofile:async(req,res)=>{
            const { Fullname, About, Company, Job, Country, Address, Phone, Email } = req.body;
            const profileFields = { Fullname, About, Company, Job, Country, Address, Phone, Email };
        
            try {
              let profile = await profileModel.findById(req.params.id);
              if (!profile) {
                return res.status(404).json({
                  status: 'error',
                  message: 'Profile not found'
                });
              }
              profile = await profileModel.findByIdAndUpdate(req.params.id, { $set: profileFields }, { new: true });
            //   res.json({
            //     status: 'success',
            //     message: 'Profile updated successfully',
            //     data: profile
            //   });
              res.redirect('/profile');
            } catch (error) {
              res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
              });
              res.render('error');
            }
    }
}