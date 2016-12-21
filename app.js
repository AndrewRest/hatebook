"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var ObjectID = require('mongodb').ObjectID;
var multer  = require('multer');

var api_key = process.env.MAIL_API_KEY;
var domain = 'mifort.org';
var mailgun;
if(process.env.MAIL_API_KEY) {
    mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
}

var cron = require('node-cron');
//just to not stop after error
var logger = require('./backend/lib/logger');
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
app.use(express.static('pictures'));
app.use('/api', bodyParser.json());
app.use(cookieParser());
app.use(session(sessionConfig));
authentication.init(app);

app.use('/api', bodyParser.json());

app.post('/api/signup', function (req, res) {
    db.userCollection().insert({
        email: req.body.email,
        password: req.body.password,
        pooCount: 0,
        pooCredits: 10,
        avatar: '/default-user-avatar.jpg'
    }, function (err, result) {
        if (!err) {
            console.log("user successfully registered");
            res.send(result.ops[0]);
            sendNotification({to: req.body.email,
                              subject: "Let's throw poop online",
                              text: "Hi! Go to our resource and start to fun."});
        } else {
            console.log(err);
            res.status(500).send();
        }
    })
});

cron.schedule('0 0 * * *', function () {
    db.userCollection().update({}, {$inc: {pooCredits: 10}},{multi: true}, function (err, result) {
            if (!err) {
                console.log("poo credits for all users updated");
            } else {
                console.log(err);
            }
        });
});

app.get('/api/user/:id', authentication.ensureAuthenticated, function (req, res) {
    db.userCollection().findOne({_id: new ObjectID(req.params.id)}, function(err, user) {
        if(!err){
            console.log("user successfully received");
            delete user.password;
            res.send(user);
        } else {
            console.log(err);
            res.status(500).send();
        }
    });
});

app.get('/api/current-user', authentication.getCurrentUser);

app.post('/api/post', authentication.ensureAuthenticated, function (req, res) {
    var post = {
        authorName: req.body.authorName,
        authorAvatar: req.body.authorAvatar || '/default-user-avatar.jpg',
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        pooCount: 0,
        attachment: req.body.attachment || null
    };
    db.postCollection().insert(post, function (err, result) {
        if (!err) {
            console.log("post successfully added");
            res.send(result.ops[0]);
        } else {
            console.log(err);
        }
    })
});

app.get('/api/add-enemy/:id', authentication.ensureAuthenticated, function(req, res) {
    var currentUserId = req.user._id;
    var enemyId = new ObjectID(req.params.id);
    db.userCollection().updateOne(
        {_id: currentUserId},
        { $push: { enemies: enemyId }},
        function(err, updatedUser) {
            if(err) {
                console.log('Cannot add enemy to user', currentUserId.toHexString());
                res.json(err);
            } else {
                console.log('Enemy is added', enemyId.toHexString());
                res.json(updatedUser);
            }
        });
    }
);

app.get('/api/enemies', authentication.ensureAuthenticated, function(req, res) {
    var enemies = req.user.enemies;
    if(!enemies) {
        res.json([]);
        return;
    }
    db.userCollection().find({_id: {$in : enemies}})
        .toArray(function(err, selectedEnemies) {
            if(err) {
                console.log(err);
                res.status(404).send();
            } else {
                res.json(selectedEnemies);
            }
        });
});

app.get('/api/not-enemies', authentication.ensureAuthenticated, function(req, res) {
    var enemies = req.user.enemies;
    if(!enemies) {
        res.json([]);
        return;
    }
    //enemy to your-self
    enemies.push(req.user._id);
    db.userCollection().find({_id: {$nin : enemies}})
        .toArray(function(err, selectedEnemies) {
            if(err) {
                console.log(err);
                res.status(404).send();
            } else {
                res.json(selectedEnemies);
            }
        });
});

app.post('/api/cleanup', authentication.ensureAuthenticated, function(req, res) {
    var currentUserId = req.user._id;
    var pooCountToCleanup = req.body.cleanupCount;
    db.userCollection().updateOne(
        {_id: currentUserId},
        {$inc: {pooCount: -pooCountToCleanup}},
        function(err, updatedUser) {
            if(err) {
                console.log(err);
                res.status(503).send();
            } else {
                console.log('Cleanup is completed');
                res.json(updatedUser);
            }
        }
    );
});

app.get('/api/enemy-counter', authentication.ensureAuthenticated, function(req, res){
    var currentUserId = req.user._id;
    db.userCollection().find(
        {enemies: {$all: [currentUserId]}}
    ).count(function(err, count) {
        if(err){
            res.status(500).send();
        } else {
            res.json({haters: count});
        }
    });
});

app.post('/api/user/poo', authentication.ensureAuthenticated, function (req, res) {
    if(req.user.pooCredits > 0){
        db.userCollection().updateOne({_id: new ObjectID(req.body.userId)}
            , {$inc: {pooCount: 1}}, function (err, result) {
                if (!err) {
                    db.userCollection().updateOne({_id: new ObjectID(req.user._id)}
                        , {$inc: {pooCredits: -1}}, function (err, result) {
                            if (!err) {
                                res.send({message: "poo count successfully updated"});
                                console.log("poo count successfully updated");
                            } else {
                                console.log(err);
                            }
                        });
                } else {
                    console.log(err);
                }
            });
    } else {
        console.log("You don't have poo credits!");
        res.send({error: "You don't have poo credits!"})
    }
});

app.post('/api/post/poo', authentication.ensureAuthenticated, function (req, res) {
    db.postCollection().updateOne({_id: new ObjectID(req.body.postId)}
        , {$inc: {pooCount: 1}}, function (err, result) {
            if (!err) {
                console.log("poo count successfully updated");
                db.postCollection().findOne({_id: new ObjectID(req.body.postId)}, function (err, post) {
                    if (!err) {
                        console.log("post poo count received");
                        res.send({_id: post._id,pooCount: post.pooCount});
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });
});

app.get('/api/user/posts/:userId', authentication.ensureAuthenticated, function (req, res) {
    db.postCollection().find({userId:req.params.userId}).toArray(function(err, docs) {
        if(!err){
            console.log("posts successfully received");
            res.send(docs);
        } else {
            console.log(err);
        }
    });
});

app.put('/api/user/update-info', authentication.ensureAuthenticated, function (req, res) {
    db.userCollection().updateOne({_id: new ObjectID(req.body.userId)}
        , {
            $set: {
                username: req.body.username,
                hateMovies: req.body.hateMovies,
                hateBooks: req.body.hateBooks,
                iHate: req.body.iHate
            }
        }, function (err, result) {
            if(!err){
                console.log("user info successfully updated");
                res.send(result);
            } else {
                console.log(err);
                rest.status(500).send();
            }
        });
});

var userProfilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pictures/avatars/')
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id + file.originalname.substr(file.originalname.lastIndexOf('.')))
    }
});

var userProfilePicUpload = multer({storage: userProfilePicStorage, limits: { fileSize: 1024*1024 }});

app.post('/api/user/upload-avatar', authentication.ensureAuthenticated,
        userProfilePicUpload.single('avatar'), function (req, res) {
    db.userCollection().updateOne({_id: new ObjectID(req.user._id)}
        , {$set: {avatar: '/avatars/' + req.file.filename}
        }, function (err, result) {
            if(!err){
                console.log("avatar successfully updated");
                res.send(req.file);
            } else {
                console.log(err);
                res.status(500).send();
            }
        });
});

var postPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pictures/posts/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.substr(file.originalname.lastIndexOf('.')));
    }
});

var postPicUpload = multer({storage: postPicStorage, limits: { fileSize: 1024*1024 }});

app.post('/api/post/upload-image', authentication.ensureAuthenticated,
        postPicUpload.single('post'), function (req, res) {
    console.log("attachment successfully uploaded");
    res.send({picturePath: '/posts/' + req.file.filename});
});

app.listen(app.get('port'), function () {
    console.log('Hatebook is started on port:' + app.get('port'));
});

function sendNotification(message) {
    if(!process.env.MAIL_API_KEY){
        console.log('Cannot send email');
        return;
    }

    var data = {
        from: 'Hate You <hatebook@mifort.org>',
        to: message.to,
        subject: message.subject,
        text: message.text
    };

    mailgun.messages().send(data, function (error, body) {
        console.log('Message is sent successfully!');
    });
}
