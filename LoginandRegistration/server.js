var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/login_DB', {useMongoClient: true});
const { Schema } = mongoose;

//Set up login/registration
const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "First Name required to register"]
    },
    last_name: {
        type: String,
        required: [true, "Last Name required to register"]
    },
    email: {
        type: String,
        required: [true, "Must have a valid email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birthday: {
        day: { type: Number, required: [true, "A birth day is required for registration"], min: 1, max: 31 },
        month: { type: Number, required: [true, "A birth month is required for registration"], min: 1, max: 12 },
        year: { type: Number, required: [true, "A birth year is required for registration"], min: 1900, max: 2018 }
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
        minlength: 8,
    }
})

var User = mongoose.model('User', UserSchema);
const bcrypt = require('bcrypt');

const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const flash = require('express-flash');
app.use(flash());

app.get('/', (req, res) => {

    res.render("index")

});

app.get('/registration', (req, res) => {

    res.render("registration")

});
app.post('/registration', function (req, res) {
    const newUser = req.body
    User.create(newUser)
    bcrypt.hash(newUser.password, 10)
        .then((hashed_pass) => {

            newUser.password = hashed_pass;
            console.log(newUser,"1")
            res.render('Dashboard')
        })
        .catch((error) => {
            for (var key in error.errors) {
                req.flash('registration', error.errors[key].message);
            }
            // redirect the user to an appropriate route
            console.log(newUser,"2")
            res.redirect('/registration')
        })
})

app.post('/login', function (req, res) {
    
    User.find({ email: req.body.email })
    hashed_pass=bcrypt.hash(req.body.password, 10)
    bcrypt.compare('req.body.password', 'hashed_pass')
        .then((user) => {
            hashed_pass
                .then((hashed_pass) => {
                    console.log(hashed_pass, req.body.email )
                    User.findOne({ email: req.body.email })
                        .then((user) => {
                            req.session = { first_name: user.first_name, last_name: user.last_name, email: user.email, birthday: user.birthday };
                            res.redirect('/Dashboard')
                        })
                        .catch((error) => { 
                            for (var key in error.errors) {
                                req.flash('login', error.errors[key].message);
                            }                     
                            res.redirect('/')
                        })
                })
        .catch((error) => {
            for (var key in error.errors) {
                req.flash('login', error.errors[key].message);
            }  
            res.redirect('/Dashboard')
        })
        })


})
app.get('/Dashboard', (req, res) => {

    res.render("Dashboard")

});

app.listen(8000, function() {
    console.log("listening on port 8000");
});