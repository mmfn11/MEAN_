var express = require("express");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Quoting', {useNewUrlParser: true});
const QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2 },
    message: {type: String, required: true, minlength: 2}
    }, {timestamps: true})
    const Quote =mongoose.model('Quote', QuoteSchema); 


app.post('/add', function(req, res) {
        console.log("POST DATA", req.body);
        var quote = new Quote({name: req.body.name, message: req.body.message});
        quote.save(function(err) {
          if(err) {
            res.render('index', {errors: quote.errors})
          } 
          else { 
            res.redirect('/quotes');
          }
        })
      })
      

      app.get('/', function(req, res) {
        res.render('index');
    })
    
    app.get('/quotes', function(req, res) {
        arr = Quote.find({}, function(err, quotes) {
          res.render('quotes', {arr:quotes});
        })
      })

app.listen(8000, function() {
    console.log("listening on port 8000");
   });