var express = require("express"),
    router  = express.Router(),
    request = require('request');

//INDEX - show restaurants
router.get("/", function(req, res){
    // get restaurant name
    var restaurant_name = req.query.restaurant_name;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var geo = req.query.geo;
    console.log('lat', latitude);
    console.log('long', longitude);
    console.log('geo', geo);
    
    // construct yelp search url
    var search_url = 'https://api.yelp.com/v3/businesses/search?term='
        + restaurant_name + '&latitude='
        + latitude + '&longitude='
        + longitude;

    // post request to get auth token
    var formData = {
        grant_type: 'client_credentials',
        client_id: 'SdxmqZr3TSpgBNzBuKU15g',
        client_secret: 'dRf4nxG1NWldw8txc0Houmc9h6E7TMHwfseKIV2qi4WBbIzDM7J5RGQa7k7exXS1',
    };

    // send post request and collect token
    var token = 'Bearer ';
    request.post({url:'https://api.yelp.com/oauth2/token', formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        
        var parsedData = JSON.parse(body);
        token = token + parsedData.access_token;
      
        // use token to communicate with Yelp
        var options = {
          url: search_url,
          headers: {
            'Authorization': token
          }
        };
         
        function callback(error, response, body) {
          if (error) {
            return console.error('get https failed:', error);
          }
          
          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.render("restaurants", {restaurants: info});
          }
          
          //var search_result = {name: 'panda express'};
          //var search_result = 'panda express';
          //res.render("restaurants", {restaurants: search_result});
        }
         
        request(options, callback);
    });
});

module.exports = router;
