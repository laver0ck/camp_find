const express           = require('express'),
      app               = express(),
      bodyParser        = require('body-parser'),
      mongoose          = require('mongoose'),
      passport          = require('passport'),
      LocalStrategy     = require('passport-local'),
      methodOverride    = require('method-override'),
      Comment           = require('./models/comment'),
      Campground        = require('./models/campground'),
      User              = require('./models/user'),
      seedDB            = require('./seeds');

// requiring routes
const campgroundRoutes = require('./routes/campgrounds'),
      commentsRoutes   = require('./routes/comments'),
      authRoutes       = require('./routes/auth');

mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// seedDB(); // seed the database

// Passport.js config
app.use(require('express-session')({
    secret: 'foxtrot uniform charlie kilo',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);

app.get('/', (req, res) => {
    res.render('landing');
});

app.listen(3000, () => {
    console.log('YelpCamp server has started(:3000)');
});
