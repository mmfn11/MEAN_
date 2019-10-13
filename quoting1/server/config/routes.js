const mongoose = require('mongoose'),
Quote = mongoose.model('Quote')

module.exports = function(app){
    
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
}