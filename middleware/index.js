const Campground = require('../models/campground'),
      Comment = require('../models/comment');


let middlewareObject = {};

middlewareObject.checkCampgroundOwnership = function(req, res, next) {
    let campgroundId = req.params.id;

     if (req.isAuthenticated()) {        
        Campground.findById(campgroundId, (err, foundCampground) => {
            if (err) {
                req.flash('error', 'Campground not found');
                res.redirect('back');
            } else {
                // does user own campground?   
                let author = foundCampground.author.id   
                let userId = req.user._id;     

                if (author.equals(userId)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that')
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
}

middlewareObject.checkCommentOwnership = function(req, res, next) {
    let commentId = req.params.comment_id;

     if (req.isAuthenticated()) {        
        Comment.findById(commentId, (err, foundComment) => {
            if (err) {
                req.flash('error', 'Comment not found');
                res.redirect('back');
            } else {
                // does user own comment?   
                let author = foundComment.author.id   
                let userId = req.user._id;     

                if (author.equals(userId)) {
                    next();
                } else {
                    req.flash('You do not have permission to do that');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that');        
        res.redirect('back');
    }
}

middlewareObject.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('/login');
    }
}

module.exports = middlewareObject;