const express = require("express");
const bodyParser = require('body-parser');

const app = express();
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


require('./server/config/routes.js')(app)

app.listen(8000, function() {
    console.log("listening on port 8000");
   });