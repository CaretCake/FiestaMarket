const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./config/database');
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: process.env.ORIGIN}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESS_SECRET));
app.use(session({
  secret: process.env.SESS_SECRET,
  name: 'fmid',
  store: new SequelizeStore({
    db: sequelize
  }),
  cookie: {
    maxAge: 3600000,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.set('json spaces', 2);

// Routes
const aliasRouter = require('./routes/aliases');
const buyOrderRouter = require('./routes/buyOrders');
const contactFormRouter = require('./routes/contactForm');
const itemRouter = require('./routes/items');
const sellOrderRouter = require('./routes/sellOrders');
const userRouter = require('./routes/users');


app.use('/v1/aliases', aliasRouter);
app.use('/v1/buy-orders', buyOrderRouter);
app.use('/v1/contact-form-submissions', contactFormRouter);
app.use('/v1/items', itemRouter);
app.use('/v1/sell-orders', sellOrderRouter);
app.use('/v1/users', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
