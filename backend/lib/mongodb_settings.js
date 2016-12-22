var MongoClient = require('mongodb').MongoClient;

var mongodbUrl = process.env.MONGODB_URI|| 'mongodb://localhost:27017/hatebook';

var userCollectionName = 'users';
var postCollectionName = 'posts';

MongoClient.connect(mongodbUrl, function(err, db) {
    if(err) {
        console.log('Mongo DB connection failed', {error: err});
    } else {
        cachedDb = db;
        exports.db = cachedDb;
        console.log('Mongo DB: connected!');
    }
});

exports.userCollection = function() {
    return cachedDb.collection(userCollectionName);
};

exports.postCollection = function() {
    return cachedDb.collection(postCollectionName);
};
