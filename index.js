const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      Campground    = require('./models/campground'),
      seedDB        = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

seedDB();

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { campgrounds: allCampgrounds });
        }
    })
});

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
    // find the campground with provided id
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            // and render show page with that campground
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log('YelpCamp server has started(:3000)');
});
