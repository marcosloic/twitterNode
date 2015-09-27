var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema({
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , body       : String
  , date       : Date
  , screenname : String
});

// Méthode getTweet qui rcupère les tweets dans la db
schema.statics.getTweets = function(page, skip, callback) {

  var tweets = [],
      start = (page * 10) + (skip * 1);

  // On utilise skip et limit pour charger les tweets par 10
  Tweet.find({},'twid active author avatar body date screenname',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs){

    // Si tout marche…
    if(!err) {
      tweets = docs;  // Houston, we got tweets
      tweets.forEach(function(tweet){
        tweet.active = true; // On les active
      });
    }

    callback(tweets);

  });

};

// On retourne un modèle de tweet basé sur le schéma
module.exports = Tweet = mongoose.model('Tweet', schema);