"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', config.port || 1313);

app.use(express.static('frontend'));

app.use('/api', bodyParser.json());

logger.info('Error handler is initialized!');

app.listen(app.get('port'), function () {
    ('Hatebook is started on port:' + app.get('port'));
});
