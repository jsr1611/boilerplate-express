let express = require('express');
let app = express();

// print text to console 
console.log("Hello World");


// basic express api
app.get("/", function(req, res){
    res.send("Hello Express");
});


// Serve an HTML File
const filePath = __dirname + "/views/index.html";
app.get("/index", function(req, res){
    res.sendFile(filePath);
});


// Serve Static Assets
const middleWare = express.static(__dirname+"/public");
app.use("/public", middleWare);


// Serve JSON on a Specific Route
const msg = {message: "Hello JSON"};
app.get("/json", function(req,res){
    res.json(msg);
});


// Use the .env File





























 module.exports = app;
