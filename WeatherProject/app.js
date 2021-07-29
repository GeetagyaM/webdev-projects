const express = require("express");
const app = express();
const https = require("https");
const bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res) {
res.sendFile(__dirname+"/index.html");

});


app.post("/",function(req,res){
var city=req.body.cityName;


  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=3d7ac8d17cbbdde8acc78c1373306503&units=metric"
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      console.log(temp);
      const feelsLike = weatherData.main.feels_like;
      console.log(feelsLike);
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>Temperature in "+city+" is " + temp + " degrees celcius.</h1>");
      res.write("<p>Feels like: " + feelsLike + " degrees celcius.</p>");
      res.write("<img src="+imgURL+">");
      res.send();
    });
  });

});





app.listen(3000, function() {
  console.log("Server running on port 3000.");
});
