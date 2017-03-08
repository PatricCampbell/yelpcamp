const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const campGrounds = [
    {
        'name': 'Salmon Creek',
        'image': 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
    },
        {
        'name': 'Bear Mountain',
        'image': 'https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg'
    },
        {
        'name': 'Granite Hill',
        'image': 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'
    },
        {
        'name': "Mountain Goat's Rest",
        'image': 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'
    },
    {
        'name': 'Salmon Creek',
        'image': 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
    },
        {
        'name': 'Bear Mountain',
        'image': 'https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg'
    },
        {
        'name': 'Granite Hill',
        'image': 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'
    },
];

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.pug');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campGrounds: campGrounds});
});

app.post('/campgrounds', (req, res) => {
    // get data from form and add to campgrounds array
    // then redirect to campgrounds page
    let campGroundName = req.body.name;
    let campGroundImage = req.body.image;
    var newCampGround = {
        'name': campGroundName,
        'image': campGroundImage
    }

    campGrounds.push(newCampGround);

    res.redirect('/campgrounds');
});

app.listen(3000, (req, res) => console.log('YelpCamp is running'));