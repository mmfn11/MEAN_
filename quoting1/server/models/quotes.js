var mongoose = require('mongoose');


const QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2 },
    message: {type: String, required: true, minlength: 2}
    }, {timestamps: true})
Quote=mongoose.model('Quote', QuoteSchema); 