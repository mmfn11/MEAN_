const mongoose = require('mongoose'),
Quote = mongoose.model('Quote')
var Quotes = require('../controllers/quotes.js');

module.exports = function(app){
    
app.post('/add', function(req, res) {
    Quotes.index(req,res);
  })
  

  app.get('/', function(req, res) {
    res.render('index');
})

app.get('/quotes', function(req, res) {
   Quotes.qu(req,res);
  })
}