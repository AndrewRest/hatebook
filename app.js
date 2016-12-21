"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', 1313);

app.use(express.static('frontend'));

app.use('/api', bodyParser.json());

app.listen(app.get('port'), function () {
    console.log('Hatebook is started on port:' + app.get('port'));
});
