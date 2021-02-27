const express = require('express');

const userController = require('./controllers/userController');

const router = express.Router();

//afficher le formulaire de login
router.get('/login', userController.loginForm);
router.post('/login', userController.handleLoginForm);

//afficher le formulaire d'inscription
router.get('/signup', userController.signupForm);
router.post('/signup', userController.handleSignupForm);

module.exports = router;