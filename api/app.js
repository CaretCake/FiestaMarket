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

const app = express();

const { User, BuyOrder, Item, ItemOffer, SellOrder, UserReview, Alias } = require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('keyboard kitteh kit kat'));
app.use(session({
  secret: "keyboard kitteh kit kat",
  store: new SequelizeStore({
    db: sequelize
  }),
  cookie: { maxAge: 3600000 },
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// Routes
const aliasRouter = require('./routes/aliases');
const buyOrderRouter = require('./routes/buyOrders');
const itemRouter = require('./routes/items');
const sellOrderRouter = require('./routes/sellOrders');
const userRouter = require('./routes/users');

const testAPIRouter = require('./routes/testAPI');


app.use('/testAPI', testAPIRouter);
app.use('/aliases', aliasRouter);
app.use('/buyorders', buyOrderRouter);
app.use('/items', itemRouter);
app.use('/sellorders', sellOrderRouter);
app.use('/users', userRouter);


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
