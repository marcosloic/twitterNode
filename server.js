
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('twitter'),
  routes = require('./routes'),
  config = require('./config'),
  streamHandler = require('./utils/streamHandler');


var app = express();
var port = process.env.PORT || 8888;


app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.disable('etag');

mongoose.connect('mongodb://test:test@ds035674.mongolab.com:35674/twitternode');

var twit = new twitter(config.twitter);

// Routes
app.get('/', routes.index);
app.get('/page/:page/:skip', routes.page);

// Dossier public pour servir des assets statiques
app.use("/", express.static(__dirname + "/public/"));

// 3…2…1…Démarrage
var server = http.createServer(app).listen(port, function() {
  console.log('Serveur Express sur le port ' + port);
});

// Initalise socket.io
var io = require('socket.io').listen(server);

// Ici, on écoute les tweets qui correspondent au mot-clé "javascript"
twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
  streamHandler(stream,io);
});
