var irc = require('irc');

var config = require('./config');
var web = require('./web');


// IRC Bot
var IRC_TARGET_RE = RegExp('^' + config.irc.nick + ': (.*)$');
var RESET_RE = RegExp('ohshit|reset|clear|lod');

var ircClient = new irc.Client(config.irc.server, config.irc.nick, {
  channels: config.irc.channels
});

// On connected to IRC server
ircClient.on('registered', function(message) {
    // Store the nickname assigned by the server
    config.irc.nick = message.args[0];
    IRC_TARGET_RE = RegExp('^' + config.irc.nick + ': (.*)$');
});

// On receive IRC message.
ircClient.addListener('message', function(from, to, message) {
  var match;
  match = RESET_RE.exec(message);
  if (match) {
    web.reset();
    return;
  }

  match = IRC_TARGET_RE.exec(message);
  var url;
  if (match) {
    url = match[1];
  } else if (from == 'dashbot') {
    url = message;
  }
  if(url) {
    var msg = web.setUrl(url, -1, function(opts) {
      if (opts['message']) {
        ircClient.say(to, opts['message']);
      }
    });
  }
});

exports = ircClient;
