const bcrypt = require('bcrypt');
const User = require('../models/User');

// const register = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user) {
//     errors.message = 'Email has already exist!';
//     return res.render('users/register');
//   } else {
//     const newUser = new User({
//       email: req.body.email,
//       password: req.body.password,
//     });

//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser
//           .save()
//           .then((user) => {
//             if (user) {
//               return res.redirect('/auth/login');
//             }
//           })
//           .catch((err) => {
//             return res.render('users/register');
//           });
//       });
//     });
//   }
// };

module.exports = {
  // register,
};
