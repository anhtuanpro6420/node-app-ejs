const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports.renderLogin = (req, res) => {
  return res.render("auth/login", { title: "Login page" });
};

module.exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.render("error", { message: "User not found" });
    }
    bcrypt
      .compare(password, user.password)
      .then((isSame) => {
        if (isSame) {
          return res.redirect("/products");
        } else {
          return res.render("error", {
            message: "Password is incorrect",
            error,
          });
        }
      })
      .catch((error) => {
        return res.render("error", { message: "Password is incorrect", error });
      });
  });
};
