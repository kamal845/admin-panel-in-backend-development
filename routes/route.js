const express=require('express');
const router=express.Router();
const loginController=require('../controller/loginController');
const signupController=require('../controller/signupController');

router.get('/',(req,res)=>{
    res.render('register');
})

// router.post('/login',loginController.login);
// router.get('/login', (req, res) => {
//     res.render('dashboard');
// });
router.post('/register', signupController.register, (req, res) => {
    res.redirect('/login');
});
router.get('/login',(req,res)=>{
res.render('login');
})
router.post('/login', signupController.register, (req, res) => {
    res.redirect('/dashboard');
});

module.exports=router;


