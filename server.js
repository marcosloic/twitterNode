
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

// Connexion à Mongolab
mongoose.connect('mongodb://twitternode:twitternode@ds035563.mongolab.com:35563/twitternode');

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

// Ici, on écoute les tweets qui correspondent au mot-clé "frontend"
twit.stream('statuses/filter',{ track: 'frontend'}, function(stream){
  streamHandler(stream,io);
});
