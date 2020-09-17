module.exports.logout = (req, res) => {
  req.logOut();
  res.redirect("/auth/login");
};
