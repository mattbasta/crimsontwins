var _ = require('underscore');
var fs = require('fs');
var path = require('path');


// Configuration
var defaults = {
    irc: {
        nick: 'crimsontwins'
    },
    web: {
        port: 8080
    }
};

var existsSync = fs.existsSync || path.existsSync;

var config;

if (existsSync('./config.json')) {
  config = require('./config.json');
} else {
  config = {};
}

config = _.extend(exports, defaults, config);
