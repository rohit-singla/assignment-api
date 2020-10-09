const express = require("express");
const events = require('./Routes/events');
const users = require('./Routes/users');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const logger = require('morgan');
var jwt = require('jsonwebtoken');

// jwt secret token
app.set('secretKey', 'nodeRestApi');

// DB connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Events', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.json({ "output": "Perfectly fine!!" });
});

// public route
app.use('/users', users);

// private route
app.use('/events', validateUser, events);

// user validation
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.status(401).json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.id = decoded.id;
            next();
        }
    });
}

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});