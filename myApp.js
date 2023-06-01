require("dotenv").config();
let express = require("express");
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

module.exports = app;
