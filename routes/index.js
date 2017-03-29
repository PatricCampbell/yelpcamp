const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

// Landing page route
router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/register', (req, res) => {
    res.render('register');
});

// sign up logic
router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                req.flash('success', 'Welcome to YelpCamp ' + user.username);
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
    req.flash('success', 'Logged you out');
    res.redirect('/campgrounds');
});

module.exports = router;