var Tweet = require('../models/Tweet');

module.exports = function(stream, io){

  // Quand on recoit un tweet …
  stream.on('data', function(data) {

    // On consturit un nouvel objet tweet
    var tweet = {
      twid: data['id'],
      active: false,
      author: data['user']['name'],
      avatar: data['user']['profile_image_url'],
      body: data['text'],
      date: data['created_at'],
      screenname: data['user']['screen_name']
    };

    // On l'instancie
    var tweetEntry = new Tweet(tweet);

    // On le sauvegarde
    tweetEntry.save(function(err) {
      if (!err) {
        // On demande à socket.io d'émettre un événement
        io.emit('tweet', tweet);
      }
    });

  });

};