const express    = require('express'),
      router     = express.Router(),
      Campground = require('../models/campground'),
      middleware = require('../middleware');

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
router.post('/', middleware.isLoggedIn, (req, res) => {
    // get data from form and add to DB
    // then redirect to campgrounds page
    let campgroundName = req.body.name;
    let campgroundImage = req.body.image;
    let campgroundDesc = req.body.description;
    let campgroundPrice = req.body.price;
    let author = {
        id: req.user._id,
        username: req.user.username
    }

    let newCampground = {
        'name': campgroundName,
        'image': campgroundImage,
        'description': campgroundDesc,
        'author': author,
        'price': price
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
router.get('/new', middleware.isLoggedIn, (req, res) => {
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

// edit campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    let campgroundId = req.params.id;
  
    Campground.findById(campgroundId, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrouds');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }                
    })
});

// update campground route
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    let campgroundId = req.params.id;
    let updatedData = req.body.campground;
    // find and update correct campgroundDesc
    // redirect to show page
    Campground.findByIdAndUpdate(campgroundId, updatedData, (err, updatedCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + campgroundId)
        }
    })
});

// destroy campground route
router.delete('/:id/', middleware.checkCampgroundOwnership, (req, res) => {
    let campgroundId = req.params.id;

    Campground.findByIdAndRemove(campgroundId, (err, deletedCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    })
});

module.exports = router;