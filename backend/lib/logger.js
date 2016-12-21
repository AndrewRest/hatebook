"use strict";

var winston = require('winston');

var logger = new (winston.Logger)({
    exitOnError: false
});

module.exports = logger;
