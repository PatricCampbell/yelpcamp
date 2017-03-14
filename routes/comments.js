const express    = require('express'),
      router     = express.Router({mergeParams: true}),
      Campground = require('../models/campground');
      Comment    = require('../models/comment');

// New route
router.get('/new', isLoggedIn, (req, res) => {
    //find campground by id
    let campgroundId = req.params.id;
    Campground.findById(campgroundId, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            //render new comment template with info from campground
            res.render('comments/new', {campground: foundCampground});    
        }
    })
});

// Create route
router.post('/', isLoggedIn, (req, res) => {
    let campgroundId = req.params.id;
    let userName = req.user.username;
    let userID = req.user._id;
    let commentData = req.body.comment;

    Campground.findById(campgroundId, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(commentData, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to commentData
                    comment.author.id = userID;
                    comment.author.username = userName;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campgroundId);
                }
            })
        }
    })
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