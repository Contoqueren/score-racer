const express = require('express');

const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const mainController = require('./controllers/mainController');
const raceController = require('./controllers/raceController')

//middlewares
const adminMW = require('./middlewares/adminMW');

const router = express.Router();

// Page d'acceuil
router.get('/', mainController.home);
router.post('/subscribe', raceController.subscribeToTheRace)

//afficher le formulaire de login
router.get('/login', userController.loginForm);
router.post('/login', userController.handleLoginForm);

//afficher le formulaire d'inscription
router.get('/signup', userController.signupForm);
router.post('/signup', userController.handleSignupForm);

//afficher le menu admin
//cette route sera protégée par le middleware maison adminMW
//seuls les utilisateurs admin pourront accéder à la page du menu admin
router.get('/admin', adminMW, adminController.adminPage);
router.post('/admin/newrace', adminMW, adminController.createRace);
router.post('/admin/deleterace', adminMW, adminController.deleteRace);
router.post('/admin/newgame', adminMW, adminController.createGame);
router.post('/admin/deletegame', adminMW, adminController.deleteGame);


//deconnexion
router.get('/logout', userController.logout);

module.exports = router;