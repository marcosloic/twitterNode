var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  Tweet = require('./models/Tweet');

module.exports = {

  index: function(req, res) {
    // On appelle notre modèle Mongo
    Tweet.getTweets(0,0, function(tweets, pages) {

      // On render React dans une string, en lui passant les tweets
      var markup = React.renderComponentToString(
        TweetsApp({
          tweets: tweets
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // On passe le markup React
        state: JSON.stringify(tweets) // On passe le state
      });

    });
  },

  page: function(req, res) {
    // Chercher les tweets par page
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

      // Rendu JSON
      res.send(tweets);

    });
  }

}