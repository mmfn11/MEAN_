var mongoose = require("mongoose");
var Task = mongoose.model("Task");
var tasks = require("../controllers/tasks.js");

module.exports = function(app){

    app.get("/tasks", tasks.show)

    app.get("/tasks/:id", tasks.showone)

    app.post("/tasks", tasks.create)

    app.put("/tasks/:id", tasks.update)

    app.delete("/tasks/:id", tasks.delete)
}