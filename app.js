const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      methodOverride = require('method-override');

// import models
const Campground    = require('./models/campground'),
      Comment       = require('./models/comment'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');

//import routes
const campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes    = require('./routes/comments'),
      indexRoutes      = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// seed the database
// seedDB();

// Passport configuration
app.use(require('express-session')({
    secret: 'My cat is named Pandora',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// call this on every route
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// use route files
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, (req, res) => console.log('YelpCamp is running'));