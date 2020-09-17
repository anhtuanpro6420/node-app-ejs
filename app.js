// Libraries
if (process.env.NODE_END !== "production") {
  require("dotenv").config();
}
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

// Modules
const initializePassport = require("./config/passport");
const authMiddlewares = require("./middlewares/auth");
const { checkAuthenticated, checkNotAuthenticated } = authMiddlewares;

// Routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const logoutRouter = require("./routes/logout");

const app = express();
require("./db/mongoose-connect.js");
initializePassport(passport);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// Use routes
app.use("/auth", checkNotAuthenticated, authRouter);
app.use("/users", checkAuthenticated, usersRouter);
app.use("/products", checkAuthenticated, productsRouter);
app.use("/logout", checkAuthenticated, logoutRouter);
app.use("/", checkAuthenticated, indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
