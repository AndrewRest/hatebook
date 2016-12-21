"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./mongodb_settings');
var ObjectID = require('mongodb').ObjectID;

var users = require('../user');

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(user, done) {
    users.findById(new ObjectID(user._id), function(error, user) {
        if(error) {
            done(err);
        } else {
            done(null, user);
        }
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        usernameLowerCase: true
    },
    function(req, email, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            users.findByExample({email: email, password: password}, function (err, user) {
                if (err) {
                    return done(err);
                }
                console.log('User is authenticated. Email:' + email);
                return done(null, user);
            })
        });
    }
));

exports.ensureAuthenticated = function(role) {
    return function (req, res, next) {

        if (req.isAuthenticated()){
            return next();
        }
        res.status(401).json({msg: 'You aren’t authenticated!'});
    };
};

exports.getCurrentUser = function(req, res, next){
    console.log('getCurrentUser API');
    delete req.user.password;
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json(req.user);
};

exports.init = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/api/login',
        passport.authenticate('local'),
        function(req, res) {
            res.json({message:'Authenticated!'});
        }
    );

    app.get('/api/logout', function(req, res){
        // clear the remember me cookie when logging out
        console.log('Logout. Email:' + req.user.email);
        res.clearCookie('local');
        req.logout();
        res.end();
    });
};
