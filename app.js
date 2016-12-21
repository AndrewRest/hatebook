"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var db = require('./backend/lib/mongodb_settings');

var app = express();
app.set('port', 1313);

app.use(express.static('frontend'));

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
    db.userCollection().find({_id: ObjectId(req.params.id)}).toArray(function(err, docs) {
        if(!err){
            console.log("user successfully received");
            res.send(docs);
        } else {
            console.log(err);
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Hatebook is started on port:' + app.get('port'));
});