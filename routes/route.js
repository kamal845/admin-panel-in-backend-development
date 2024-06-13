const express=require('express');
const router=express.Router();
const loginController=require('../controller/loginController');
const signupController=require('../controller/signupController');
const profileController=require('../controller/profileController');
const contactController=require('../controller/contactController');
const logoutController=require('../controller/logoutController');
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

router.get('/dashboard',(req,res)=>{
    res.render('dashboard');
});
router.get('/table',(req,res)=>{
    res.render('table');
});
router.get('/contact',(req,res)=>{
    res.render('contact');
});
router.get('/error',(req,res)=>{
    res.render('error');
});
router.get('/faq',(req,res)=>{
    res.render('faq');
});

router.get('/profile', profileController.getProfileAll);
router.get('/profile/:id', profileController.getProfile);
router.get('/createProfile', profileController.getCreateProfilePage);
// router.post('/createProfile', profileController.createProfile);
router.post('/profile/:id/update', profileController.updateProfile);



//contactform

router.post('/contact', contactController.createContact);

//logout form


module.exports=router;