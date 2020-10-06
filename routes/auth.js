const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.renderLogin);

router.post('/login', authController.login);

router.get('/register', (req, res) => {
  return res.render('auth/register', {
    title: 'Register',
    email: '',
  });
});

router.post('/register', authController.register);

module.exports = router;
