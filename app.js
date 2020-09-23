// Libraries
if (process.env.NODE_END !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const RedisStore = require('connect-redis')(session);

// Config
const initializePassport = require('./config/passport');

// Services
// const photoServices = require('./services/dummyData/photos');

// Middlewares
const authMiddlewares = require('./middlewares/auth');
const { checkAuthenticated, checkNotAuthenticated } = authMiddlewares;

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const logoutRouter = require('./routes/logout');
const photosRouter = require('./routes/photos');

// Jobs
const mailJobs = require('./services/jobs/mail-jobs');

// Redis connection
const redisClient = require('./db/redis');
redisClient.on('connect', function () {
  console.log('Successfully connected to Redis!');
});

const app = express();
require('./db/mongoose-connect.js');
initializePassport(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Session
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: 'session:',
      // ttl: 86400, // default one day
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Use routes
app.use('/auth', checkNotAuthenticated, authRouter);
app.use('/users', checkAuthenticated, usersRouter);
app.use('/products', checkAuthenticated, productsRouter);
app.use('/photos', checkAuthenticated, photosRouter);
app.use('/logout', checkAuthenticated, logoutRouter);
app.use('/', checkAuthenticated, indexRouter);

// Start jobs
// mailJobs.mailTask.start();

// Send mail using queue
// const mailService = require('./services/mail/mail');
// const mailOptions = {
//   from: process.env.EMAIL,
//   to: 'anhtuanpro6421@yopmail.com',
//   subject: 'Test mail queue',
//   text: 'Test mail node app',
//   html: '<b>Hello world</b>',
// };
// mailService.sendMailQueue(mailOptions);

// Use services
// photoServices.fetchPhotos();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
