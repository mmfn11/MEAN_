const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/client/static"));
app.set('views', __dirname + '/client/views');
app.set("view engine", "ejs");

require('./server/config/mongoose.js');


// routes_setter(app);
require('./server/config/routes.js')(app)

app.listen(8000, function() {
    console.log("listening on port 8000");
   });