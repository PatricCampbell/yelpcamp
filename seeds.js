const mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment');

const data = [
    {
        name: "Cloud's Rest",
        image: 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg',
        description: 'Lorem ipsum dolor sit amet, mauris est scelerisque, vitae eget neque amet quia. At quis pede ligula interdum sapien molestie, consequat quisque sit aenean ligula excepturi, vivamus fermentum. Sed lobortis metus tristique litora libero. At sit nam nisl a est, neque adipiscing bibendum. Nullam id est morbi tortor. A non odio tincidunt in fusce. Accumsan faucibus wisi sollicitudin. Aut nisl id odio eget tortor, sed felis, tellus nulla risus ullamcorper et morbi, nibh taciti id, sodales sapien interdum viverra suscipit dolor id. Wisi amet massa dictumst, mi integer dolor molestie, lorem nec dapibus eget sapien, feugiat in mattis fringilla nibh sit, et maecenas porttitor interdum pede. Nulla diam varius vero. Nascetur volutpat lobortis, tristique laboriosam molestie ac sociis, in magna nulla amet sed magna amet, eu nisl volutpat taciti sit condimentum condimentum, ut convallis molestie feugiat mollis vestibulum interdum. Vitae augue, vulputate dolor non, auctor vehicula egestas dictum.'
    },
    {
        name: "Desert Masa",
        image: 'https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg',
        description: 'Lorem ipsum dolor sit amet, mauris est scelerisque, vitae eget neque amet quia. At quis pede ligula interdum sapien molestie, consequat quisque sit aenean ligula excepturi, vivamus fermentum. Sed lobortis metus tristique litora libero. At sit nam nisl a est, neque adipiscing bibendum. Nullam id est morbi tortor. A non odio tincidunt in fusce. Accumsan faucibus wisi sollicitudin. Aut nisl id odio eget tortor, sed felis, tellus nulla risus ullamcorper et morbi, nibh taciti id, sodales sapien interdum viverra suscipit dolor id. Wisi amet massa dictumst, mi integer dolor molestie, lorem nec dapibus eget sapien, feugiat in mattis fringilla nibh sit, et maecenas porttitor interdum pede. Nulla diam varius vero. Nascetur volutpat lobortis, tristique laboriosam molestie ac sociis, in magna nulla amet sed magna amet, eu nisl volutpat taciti sit condimentum condimentum, ut convallis molestie feugiat mollis vestibulum interdum. Vitae augue, vulputate dolor non, auctor vehicula egestas dictum.'
    },
    {
        name: "Canyon Floor",
        image: 'https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg',
        description: 'Lorem ipsum dolor sit amet, mauris est scelerisque, vitae eget neque amet quia. At quis pede ligula interdum sapien molestie, consequat quisque sit aenean ligula excepturi, vivamus fermentum. Sed lobortis metus tristique litora libero. At sit nam nisl a est, neque adipiscing bibendum. Nullam id est morbi tortor. A non odio tincidunt in fusce. Accumsan faucibus wisi sollicitudin. Aut nisl id odio eget tortor, sed felis, tellus nulla risus ullamcorper et morbi, nibh taciti id, sodales sapien interdum viverra suscipit dolor id. Wisi amet massa dictumst, mi integer dolor molestie, lorem nec dapibus eget sapien, feugiat in mattis fringilla nibh sit, et maecenas porttitor interdum pede. Nulla diam varius vero. Nascetur volutpat lobortis, tristique laboriosam molestie ac sociis, in magna nulla amet sed magna amet, eu nisl volutpat taciti sit condimentum condimentum, ut convallis molestie feugiat mollis vestibulum interdum. Vitae augue, vulputate dolor non, auctor vehicula egestas dictum.'
    }
];

function seedDB() {
    // Campground.remove({}, (err) => {
        // if (err) {
        //     console.log(err);
        // }
        // console.log('removed campgrounds!');
        // // add a few campgrounds
        // data.forEach((seed) => {
        //     Campground.create(seed, (err, campground) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log('Added a campground');
        //             // create a comment
        //             Comment.create({
        //                 text: 'This place is great but I wish there was internet',
        //                 author: 'Homer'
        //             }, (err, comment) => {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log('Created new comment');
        //                 }
        //             });
        //         }
        //     });
        // });
    // });
}

module.exports = seedDB;
