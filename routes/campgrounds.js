const express = require('express'),
      router  = express.Router(),
      Campground = require('../models/campground');

// Index route, show all camgrounds
router.get('/', (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {
                campgrounds: allCampgrounds});
        }
    });
});

// Create route, add new campground to DB
router.post('/', isLoggedIn, (req, res) => {
    // get data from form and add to DB
    // then redirect to campgrounds page
    let campgroundName = req.body.name;
    let campgroundImage = req.body.image;
    let campgroundDesc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }

    let newCampground = {
        'name': campgroundName,
        'image': campgroundImage,
        'description': campgroundDesc,
        'author': author
    }

    //Create a new campground and save to mongodb
    Campground.create(newCampground, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            console.log('new campground created:');
            console.log(campground);
            res.redirect('/campgrounds');     
        }
    });
});

// New route, show form to create new campground
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new.pug');
});

// Show route, view more information on campground
router.get('/:id', (req, res) => {
    // find the campground with provided ID
    let campgroundId = req.params.id;    
    Campground.findById(campgroundId).populate('comments').exec( (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            // render show template with that campground            
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
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