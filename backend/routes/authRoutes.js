const express = require('express');
const { signUp, signin, google, signOut } = require('../controllers/auth.controller.js');

const router=express.Router()
router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout',signOut)

module.exports=router;