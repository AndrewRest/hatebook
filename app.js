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
    db.userCollection().insert({email: req.body.email, password: req.body.password, pooCount: 0}, function(err, result) {
        if(!err){
            console.log("user successfully registered");
            res.send(result);
        } else {
            console.log(err);
        }
    })
});

app.get('/api/user/:id', function (req, res) {
    db.userCollection().findOne({_id: new ObjectID(req.params.id)}, function(err, user){
        if(!err){
            console.log("user successfully received");
            delete user.password;
            res.send(user);
        } else {
            console.log(err);
        }
    });
});

app.post('/api/post', function (req, res) {
    var post = {
        authorName: req.body.authorName,
        authorAvatar: req.body.authorAvatar || 'defaultUserImage.img',
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        pooCount: 0,
        attachment: req.body.attachment || null
    };
    db.postCollection().insert(post, function (err, result) {
        if (!err) {
            console.log("post successfully added");
            res.send(result);
        } else {
            console.log(err);
        }
    })
});

app.post('/api/user/poo', function (req, res) {
    db.userCollection().updateOne({_id: new ObjectID(req.body.userId)}
        , {$inc: {pooCount: 1}}, function (err, result) {
            if (!err) {
                console.log("poo count successfully updated");
                db.userCollection().findOne({_id: new ObjectID(req.body.userId)}, function (err, user) {
                    if (!err) {
                        console.log("user poo count received");
                        res.send({_id: user._id,pooCount: user.pooCount});
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });
});

app.listen(app.get('port'), function () {
    console.log('Hatebook is started on port:' + app.get('port'));
});
