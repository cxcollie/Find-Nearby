var express     = require("express"),
    app         = express(),
    bodyParser = require("body-parser"),
    request = require('request');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//requiring routes
var restaurants = require("./routes/restaurants");

//root route
app.get("/", function(req, res){
    res.render("index");
});

app.use("/restaurants", restaurants);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});