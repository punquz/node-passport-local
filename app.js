const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const util = require('./util/database');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = express();

//passport config
require('./util/passport')(passport);

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

//express session
app.use(session({
    secret: 'its a secret key',
    resave: false,
    saveUninitialized: false
}))

//passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.error = req.flash('error');
    next();
})

//routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);

let port = process.env.PORT || 8080;

//mongodb connection with mongoose
mongoose.connect(util.database);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    app.listen(port, () => console.log(`nodejs server started at port:${port}`));
    console.log('Connected to MongoDB');
});
