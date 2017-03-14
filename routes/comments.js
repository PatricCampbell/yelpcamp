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
            });
        }
    })
});

// edit route
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
    let campgroundId = req.params.id;
    let commentId = req.params.comment_id;

    Comment.findById(commentId, (err, foundComment) => {
        if (err) {
            res.redirect('back');
        } else {
                res.render('comments/edit', {campgroundId: campgroundId,
                comment: foundComment});
        }
    });
});

// update route
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
    let commentId = req.params.comment_id;
    let campgroundId = req.params.id;
    let editedComment = req.body.comment;

    Comment.findByIdAndUpdate(commentId, editedComment, (err, updatedComment) => {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + campgroundId);
        }
    });
});

// destroy route
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
    let commentId = req.params.comment_id;
    let campgroundId = req.params.id;
    
    Comment.findByIdAndRemove(commentId, (err) => {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + campgroundId);
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

function checkCommentOwnership(req, res, next) {
    let commentId = req.params.comment_id;

     if (req.isAuthenticated()) {        
        Comment.findById(commentId, (err, foundComment) => {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                // does user own comment?   
                let author = foundComment.author.id   
                let userId = req.user._id;     

                if (author.equals(userId)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        })
    } else {
        res.redirect('back');
    }
}

module.exports = router;