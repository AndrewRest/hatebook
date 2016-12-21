"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var ObjectID = require('mongodb').ObjectID;
var multer  = require('multer');

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
app.use(express.static('avatars'));
app.use('/api', bodyParser.json());
app.use(cookieParser());
app.use(session(sessionConfig));
authentication.init(app);

app.use('/api', bodyParser.json());

app.post('/api/signup', function (req, res) {
    db.userCollection().insert({email: req.body.email, password: req.body.password, pooCount: 0}, function(err, result) {
        if(!err) {
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
            delete user.password;
            res.send(user);
        } else {
            console.log(err);
        }
    });
});

app.get('/api/current-user', authentication.getCurrentUser);

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

app.get('/api/add-enemy/:id', function(req, res) {
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

app.get('/api/enemies', function(req, res) {
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

app.get('/api/not-enemies', function(req, res) {
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

app.post('/api/cleanup', function(req, res) {
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
                        res.status(503).send();
                    }
                });
            } else {
                console.log(err);
            }
        });
});

app.post('/api/post/poo', function (req, res) {
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

app.get('/api/user/posts/:userId', function (req, res) {
    db.postCollection().find({userId:req.params.userId}).toArray(function(err, docs) {
        if(!err){
            console.log("posts successfully received");
            res.send(docs);
        } else {
            console.log(err);
        }
    });
});

app.put('/api/user/update-info', function (req, res) {
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

app.post('/api/user/upload-avatar', userProfilePicUpload.single('avatar'), function (req, res) {
    console.log("avatar successfully uploaded");
    res.send(req.file);
});

app.listen(app.get('port'), function () {
    console.log('Hatebook is started on port:' + app.get('port'));
});
