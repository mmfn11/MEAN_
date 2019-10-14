// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Add mongoose
var mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());

// Connect Mongoose to MongoDB
mongoose.connect('mongodb://localhost/api');

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, {timestamps: true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');


app.get('/', function(req, res) {
    User.find({}, function(err, users){
        if(err){
            res.json({message: "error", error: err});
        } else {
            
            res.json({ data: users});
        }
    });   
});


app.get('/new/:name', function(req, res) {
    var user = new User({name: req.params.name});
    user.save(function(err){
        if(err){
           
            res.json({message: "error", error: err});
        } else {
            console.log('****!');
            res.redirect('/');
        }
    });
});


app.get('/remove/:name', function(req, res){
    User.findOneAndRemove({name: req.params.name}, function(err){
        if(err){
       
            res.json({message: "error", error: err});
        } else{
            console.log('removed');
            res.redirect('/');
        }
    });
    
});


app.get('/:name', function(req, res){
    User.findOne({name: req.params.name}, function(err, data){
        if(err){
           
            res.json({message: "error", error: err});
        } else{
           
            res.json({data: data});
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})