const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const renderLogin = (req, res) => {
  return res.render('auth/login', { title: 'Login page' });
};

const login = passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/auth/login',
  failureFlash: true,
});

const register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const error = {
      message: 'Email has already exist!',
      code: 409,
    };
    return res.render('auth/register', { title: 'Register', email: '', error });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            if (user) {
              return res.redirect('/auth/login');
            }
          })
          .catch((err) => {
            return res.render('auth/register', {
              title: 'Register',
              email: '',
              err,
            });
          });
      });
    });
  }
};

module.exports = {
  renderLogin,
  login,
  register,
};
