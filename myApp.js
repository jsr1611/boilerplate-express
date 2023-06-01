require("dotenv").config();
let express = require("express");
let bodyParser = require('body-parser');
let app = express();

// print text to console
console.log("Hello World");


// Implement a Root-Level Request Logger Middleware
// should be mounted before other API endpoint declarations to apply the logger
const Logger = function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
};
app.use(Logger);

// Use body-parser to Parse POST Requests
// With Ajax, you can also use JSON to handle data having a more complex structure. Another type of encoding: multipart/form-data is used to upload binary files. 
app.use(bodyParser.urlencoded({extended: false}));

// basic express api
app.get("/", function (req, res) {
    res.send("Hello Express");
});

// Serve an HTML File
const filePath = __dirname + "/views/index.html";
app.get("/index", function (req, res) {
    res.sendFile(filePath);
});

// Serve Static Assets
const middleWare = express.static(__dirname + "/public");
app.use("/public", middleWare);

// Serve JSON on a Specific Route
// Use the .env File
app.get("/json", function (req, res) {
    let msg = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        msg = msg.toUpperCase();
    } else {
        msg = "Hello json";
    }
    res.json({ message: msg });
});


// Chain Middleware to Create a Time Server

app.get("now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({time: req.time});
});

// Get Route Parameter Input from the Client

app.get("/:word/echo", function(req, res){
    res.json({echo: req.params.word});
});

// Get Query Parameter Input from the Client

// to receive data from a POST request, at the same /name route path, use the method app.route(path).get(handler).post(handler). 
// This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.

// app.get("/name", function(req, res){
//   let name = req.query.first + " " + req.query.last;
//   res.json({name: name});
// });

// Get Data from POST Requests
// If the body-parser is configured correctly, you should find the parameters in the object req.body.

app.route("/name").get(function(req, res){
    let name = req.query.first + " " + req.query.last;
    res.json({name: name});
}).post(function(req, res){
    let name = req.body.first + " " + req.body.last;
    res.json({name: name});
});




module.exports = app;
