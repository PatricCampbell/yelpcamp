const Campground = require('../models/campground'),
      Comment = require('../models/comment');


let middlewareObject = {};

middlewareObject.checkCampgroundOwnership = function(req, res, next) {
    let campgroundId = req.params.id;

     if (req.isAuthenticated()) {        
        Campground.findById(campgroundId, (err, foundCampground) => {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                // does user own campground?   
                let author = foundCampground.author.id   
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

middlewareObject.checkCommentOwnership = function(req, res, next) {
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

middlewareObject.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}

module.exports = middlewareObject;