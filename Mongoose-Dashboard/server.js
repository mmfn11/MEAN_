var express = require("express");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const mongoose = require('mongoose');
var id = 0;
mongoose.connect('mongodb://localhost/dashborad2', {useNewUrlParser: true});
const AnimalSchema = new mongoose.Schema({

    name: {type: String, required: true, minlength: 2 },
    food:{type: String, required: true, minlength: 2},
    age:{type: Number, required: true, minlength: 2},
    id:Number,

    }, {timestamps: true})

const Animal =mongoose.model('Animal', AnimalSchema ); 

app.get('/', function(req, res) {
    Animal.find({},function(err,Animal){
         console.log(id)
        if(err)
            console.log("Error matching DB request")
        else
            res.render('index', {Animals:Animal});
     }).sort({id:-1});
    });

app.get('/Animals/new', function(req, res) {
    res.render('new');
});

app.post('/Animals/edit/:id', function(req, res) {
    Animal.findOne({id:req.params.id},function(err,Animals){
        if(err)
            console.log("Error matching DB request");
        else
            res.render('edit', {Animals:Animals});
    }).sort({id:-1});
});

app.post('/Animals/edit_submit/:id', function(req, res) {
    Animal.update({id:req.params.id},{
        name: req.body.name,
        age: req.body.age,
        food: req.body.food,
        id:id,
       
    },function(err,Animals){
        if(err)
            console.log("Error matching DB request");
        else
            res.redirect("/Animals/"+req.params.id);
    });
});
//_______________________________
app.post('/Animals/delete/:id', function(req, res) {
    Animal.remove({id:req.params.id},function(err,Animals){
        if(id>0)
            id--;
        res.redirect('/');
    })
});

app.get('/Animals/:id', function(req, res) {
    Animal.findOne({id:req.params.id},function(err,Animals){
        if(err)
            console.log("Error matching DB request");
        else
            res.render('show', {Animals:Animals});
    }).sort({id:-1});
});

app.post('/Animals', function(req, res) {
    var newAnimals = new Animal({
    	name: req.body.name,
        age: req.body.age,
        food: req.body.food,
        id: id,
        
    });
    newAnimals.save(function(err){
        if(err){
            console.log(err)
    		console.log("Error inserting into DB")}
        else{
            id++;
            res.redirect('Animals/'+(id-1));
        }
    });
})

app.listen(8000, function() {
    console.log("listening on port 8000");
   });
