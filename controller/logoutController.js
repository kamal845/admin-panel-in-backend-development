const express = require('express');
const loginModel = require('../model/loginModel');
const logoutModel = require('../model/logoutModel');
const jwt = require('jsonwebtoken');
module.exports = {
    logout: async (req, res) => {
        try {
            // Get token from cookies
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({
                    status: "error",
                    message: "No token provided, user not logged in"
                });
            }

            // Verify the token
            jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        status: "error",
                        message: "Failed to authenticate token"
                    });
                }

                // Find the logged-in user by token
                const loggedInUser = await loginModel.findOne({ token: token });
                if (loggedInUser) {
                    // Save logout data to logoutModel
                    const logoutData = new logoutModel({
                        Email: loggedInUser.Email,
                        Password: loggedInUser.Password,
                        token: loggedInUser.token
                    });
                    await logoutData.save();

                    // Clear the token cookie
                    res.clearCookie('token');

                    // Redirect to register page
                    res.redirect('/');
                } else {
                    res.status(404).json({
                        status: "error",
                        message: "User not found"
                    });
                }
            });
        } catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }
};