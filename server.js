var express = require("express"); 
var bodyParser = require("body-parser");  
var path = require("path");  

var app = express();

var PORT = process.env.PORT;

//still not sure i understand what's happening here, but let's go with it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//html 
require("./app/routing/htmlRoutes.js")(app);

//api 
require("./app/routing/apiRoutes.js")(app);

app.listen(PORT, function(){
    console.log("listening on port:", PORT);
});