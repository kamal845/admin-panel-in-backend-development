const express=require('express');
const router=express.Router();
const loginController=require('../controller/loginController');
const signupController=require('../controller/signupController');
const profileController=require('../controller/profileController');
const contactController=require('../controller/contactController');
const logoutController=require('../controller/logoutController');
const tableXController=require('../controller/tableXController');
const paymentController=require('../controller/paymentController');
const profileModel = require('../model/profileModel');
//main page par render ke liye
router.get('/',(req,res)=>{
    res.render('register');
});
//register ke baad login par render ke liye
router.post('/register', signupController.register, (req, res) => {
    res.redirect('/login');
});
//login page par jaane ke liye
router.get('/login',(req,res)=>{
res.render('login');
})
router.post('/login', loginController.login, (req, res) => {
    res.redirect('/dashboard');
});

// router.get('/dashboard',(req,res)=>{
//     res.render('dashboard');
// });
// router.get('/table',(req,res)=>{
//     res.render('table');
// });
// router.get('/contact',(req,res)=>{
//     res.render('contact');
// });
// router.get('/faq',(req,res)=>{
//     res.render('faq');
// });
// router.get('/error',(req,res)=>{
//     res.render('error');
// });
router.get('/dashboard', async (req, res) => {
    const profile = await profileModel.findOne({});
    res.render('dashboard', { profile });
  });
router.get('/table', async (req, res) => {
    const profile = await profileModel.findOne({});
    res.render('table', { profile });
  });
router.get('/contact', async (req, res) => {
    const profile = await profileModel.findOne({});
    res.render('contact', { profile });
  });
  router.get('/error', async (req, res) => {
    const profile = await profileModel.findOne({});
    res.render('error', { profile });
  });
router.get('/faq', async (req, res) => {
    const profile = await profileModel.findOne({});
    res.render('faq', { profile });
  });


router.get('/profile', profileController.getProfileAll);
router.get('/profile/:id', profileController.getProfile);
router.get('/createProfile', profileController.getCreateProfilePage);
// router.post('/createProfile', profileController.createProfile);
router.post('/profile/:id/update', profileController.updateProfile);



//contactform

router.post('/contact', contactController.createContact);

//logout form
router.get('/logout', logoutController.logout);
//TableX


router.get('/tableX', tableXController.renderHome);
router.get('/tableX/home', tableXController.renderHome);
router.post('/tableX/home', tableXController.createTable);
router.get('/tableX/create', tableXController.renderCreate);
router.get('/tableX/edit/:id', tableXController.renderEditPage);
router.post('/tableX/update/:id', tableXController.updateTable);
router.post('/tableX/delete/:id', tableXController.deleteTable);
router.get('/tableX/search', tableXController.searchTables);


//payment
router.get('/paymentbuy', paymentController.renderBuyPage);
router.post('/paymentbuy', paymentController.payment);
router.get('/success', paymentController.success);
router.get('/failure', paymentController.failure);
// router.post('/profile/:id/update', profileController.updateProfile);
// router.post('/profile/:id/deleteImage', profileController.deleteProfileImage);
module.exports=router;