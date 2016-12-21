"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var ObjectID = require('mongodb').ObjectID;

var authentication = require('./backend/lib/authentication');
var db = require('./backend/lib/mongodb_settings');

var app = express();
app.set('port', 1313);

var sessionConfig = {
    secret: 'hatebook cat',
    name: 'kaas',
    resave: true,
    saveUninitialized: true
};

app.use(express.static('frontend'));
app.use('/api', bodyParser.json());
app.use(cookieParser());
app.use(session(sessionConfig));
authentication.init(app);

app.use('/api', bodyParser.json());

app.post('/api/signup', function (req, res) {
    db.userCollection().insert({email: req.body.email, password: req.body.password}, function(err, result) {
        if(!err){
            console.log("user successfully registered");
            res.send(result);
        } else {
            console.log(err);
        }
    })
});

app.get('/api/user/:id', function (req, res) {
    db.userCollection().findOne({_id: new ObjectID(req.params.id)}, function(err, user) {
        if(!err){
            console.log("user successfully received");
            res.send(user);
        } else {
            console.log(err);
        }
    });
});

app.get('/api/current-user', authentication.getCurrentUser);

app.listen(app.get('port'), function () {
    console.log('Hatebook is started on port:' + app.get('port'));
});
