var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Message_DB', {useMongoClient: true});

//post table for the message 
var Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 }, 
    message: { type: String, required: true }, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    }, { timestamps: true });

const Post = mongoose.model('Post', PostSchema); 
 

//CommentDB 
const CommentSchema = new mongoose.Schema({

    _post: {type: Schema.Types.ObjectId, ref: 'Post'},
    name: {type: String, required: true, minlength: 2 },
    message: { type: String, required: true },
    }, {timestamps: true });

var Comment =mongoose.model('Comment', CommentSchema); 

   

app.get('/', function(req, res) {
    arr = Post.find({}).populate('comments').exec(function(err, posts){
        console.log('');
        res.render('index', {p:posts})
    })
    
})


app.post('/post', function(req, res) {
  console.log("POST DATA", req.body);
  var post = new Post({name: req.body.name, message: req.body.message});
  post.save(function(err) {
    if(err) {
      console.log('something wrong');
      console.log(post.errors);
      res.redirect('/')
    } 
    else {
      console.log('successfully ');
      res.redirect('/');
    }
  })
})
 

app.post('/comment/:id', function (req, res){
    Post.findOne({_id: req.params.id}, function(err, post){
        console.log(req.body.comment_name);
        console.log(req.body.comment_message);
        var comment = new Comment(
            {name: req.body.comment_name,
            message: req.body.comment_message,
            _post: post._id
            });
        console.log(comment);
        comment.save(function(err){
            post.comments.push(comment);
            post.save(function(err){
                if(err) {
                    console.log('something wrong');
                    console.log(comment.errors);
                    res.redirect('/')
                  } 
                  else {
                    console.log('successfully  Comment!');
                    res.redirect('/');
                  }
            });
        });
    });
});



  // Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});