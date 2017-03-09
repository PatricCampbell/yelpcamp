const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

// Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//         'name': 'Bear Mountain',
//         'image': 'https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg'
//     }, (err, campground) => {
//         if(err) {
//             console.log(err)
//         } else {
//             console.log('newly created campground:');
//             console.log(campground);
//         }
//     });

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.pug');
});

app.get('/campgrounds', (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    // get data from form and add to campgrounds array
    // then redirect to campgrounds page
    let campgroundName = req.body.name;
    let campgroundImage = req.body.image;
    var newgampground = {
        'name': campgroundName,
        'image': campgroundImage
    }

    campgrounds.push(newCampground);

    res.redirect('/campgrounds');
});

app.listen(3000, (req, res) => console.log('YelpCamp is running'));