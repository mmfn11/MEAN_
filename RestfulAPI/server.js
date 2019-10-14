//I try to use postman but there is no button to create new collection I will try to find way and search about this.
var express = require('express');
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restfulAPI');

var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})
var Task = mongoose.model('Task', TaskSchema);




// Routes
// 1. Retrieve all Tasks
app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(tasks);
        }
    })
})

// 2. Retrieve a Task by ID
app.get('/tasks/:id', function (req, res) {
    Task.findOne({ _id: req.params.id }, function (err, task) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(task);
        }
    })
})

// 3. Create a Task
app.post('/tasks', function (req, res) {
    console.log("POST /tasks");
    console.log(req.body);
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    });

    task.save(function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success", data: task })
        }
    })

})

// 4. Update a Task by ID
app.put('/tasks/:id', function (req, res) {
    var obj = {};
    if (req.body.title) {
        obj['title'] = req.body.title;
    }
    if (req.body.description) {
        obj['description'] = req.body.description;
    }
    if (req.body.completed != null) {
        obj['completed'] = req.body.completed;
    }
    obj['updated_at'] = Date.now();
    Task.update({ _id: req.params.id }, {
        $set: obj
    }, function (err, task) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success", data: task })
        }
    });
})

// 5. Delete a Task by ID
app.delete('/tasks/:id', function (req, res) {
    Task.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success"})
        }
    });
})


// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})