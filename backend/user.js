var db = require('./lib/mongodb_settings');

exports.findById = function(id, callback) {
    findByExample({_id:id}, callback);
};

exports.findByEmail = function(email, callback) {
    findByExample({email: email.toLowerCase()}, callback);
};

exports.findByExample = findByExample;

//private
function findByExample(query, callback) {
    var users = db.userCollection();
    users.findOne(query, function(err, user){
        callback(err, user);
    });
}
