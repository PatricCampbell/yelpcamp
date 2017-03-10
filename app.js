const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Campground  = require('./models/campground'),
      seedDB      = require('./seeds');

seedDB();      
mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

// Landing page route
app.get('/', (req, res) => {
    res.render('landing');
});

// Index route, show all camgrounds
app.get('/campgrounds', (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});

// Create route, add new campground to DB
app.post('/campgrounds', (req, res) => {
    // get data from form and add to DB
    // then redirect to campgrounds page
    let campgroundName = req.body.name;
    let campgroundImage = req.body.image;
    let campgroundDesc = req.body.description;

    let newCampground = {
        'name': campgroundName,
        'image': campgroundImage,
        'description': campgroundDesc
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
app.get('/campgrounds/new', (req, res) => {
    res.render('new.pug');
});

// Show route, view more information on campground
app.get('/campgrounds/:id', (req, res) => {
    // find the campground with provided ID
    let campgroundID = req.params.id;    
    Campground.findById(campgroundID, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            // render show template with that campground            
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(3000, (req, res) => console.log('YelpCamp is running'));