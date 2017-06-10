// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Click schema
var Article = require("./models/article");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nytscraper");
var db = mongoose.connection;

db.on("error", function (err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our articles
// We will call this route the moment our page gets rendered
app.get("/api", function (req, res) {
  
    Article.find({}).sort([
        ["date", "descending"]
    ]).exec(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

app.post("/api", function (req, res) {
    console.log("BODY to be saved to db: " + req.body.title);

    Article.create({
        title: req.body.title,
        date: Date.now()
    }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Saved article");
        }
    });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
