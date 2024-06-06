const express =require('express');
const mongoose=require('mongoose');
const bcrypt = require("bcryptjs");
const signupModel=require('../model/signupModel');
module.exports={
    register:async(req,res)=>{     
try {
    console.log("Request body:", req.body);  
    const signupData = {
        Name: req.body.name,
        Phone: req.body.phone,
        Email: req.body.email,
        Password: req.body.password
    };
    console.log("Signup data:", signupData);
            const existingUser = await signupModel.findOne({ Email: signupData.Email });
            if (existingUser) {
                return res.status(400).json({
                    status: "error",
                    message: "Email already exists"
                });
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(signupData.Password, saltRounds);
            signupData.Password = hashedPassword;

            const signups = await signupModel.create(signupData);
            // res.status(201).json({
            //     status: "success",
            //     message: "Data is created successfully",
            //     data: signups
            // });
            return res.redirect('/login');
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({
                status: "error",
                message: "Internal server error",
                data: "No data found"
            });
        }
    }
};

