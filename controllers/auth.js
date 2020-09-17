const passport = require("passport");

const renderLogin = (req, res) => {
  return res.render("auth/login", { title: "Login page" });
};

const login = passport.authenticate("local", {
  successRedirect: "/products",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

module.exports = {
  renderLogin,
  login,
};
