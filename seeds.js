const mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment');

const data = [
    {
        name: "Cloud's Rest",
        image: 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg',
        description: 'Blah blah blah'
    },
    {
        name: "Desert Masa",
        image: 'https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg',
        description: 'Blah blah blah'
    },
    {
        name: "Canyon Floor",
        image: 'https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg',
        description: 'Blah blah blah'
    }
];

function seedDB() {
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('removed campgrounds!');
        // add a few campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Added a campground');
                    // create a comment
                    Comment.create({
                        text: 'This place is great but I wish there was internet',
                        author: 'Homer'
                    }, (err, comment) => {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('Created new comment');
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;