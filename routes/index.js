const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

// Landing page route
router.get('/', (req, res) => {
    res.render('landing');
});


// ============
// Auth Routes
// ============
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/campgrounds');
            });
        }
    });
});
// Show login form
router.get('/login', (req, res) => {
    res.render('login');
});
// handling login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}));
// logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}

module.exports = router;