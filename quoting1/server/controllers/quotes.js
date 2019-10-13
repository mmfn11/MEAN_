const mongoose = require('mongoose'),
Quote = mongoose.model('Quote')

module.exports = {
    index: function(req,res){
    var quote = new Quote({name: req.body.name, message: req.body.message});
    quote.save(function(err) {
      if(err)
        res.render('index', {errors: quote.errors});
      
      else 
        res.redirect('/quotes');
    })

    },


    qu: function(req,res){
        arr = Quote.find({}, function(err, quotes) {
                res.render('quotes', {arr:quotes});
        })
       
}
    };




    
