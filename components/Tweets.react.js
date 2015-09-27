/** @jsx React.DOM */

var React = require('react');
var Tweet = require('./Tweet.react.js');

module.exports = Tweets = React.createClass({

  // Render les tweets
  render: function(){

    // On construit des tweets uniques en mappant
    var content = this.props.tweets.map(function(tweet){
      return (
        <Tweet key={tweet._id} tweet={tweet} />
      )
    });

    return (
      <ul className="tweets">{content}</ul>
    )

  }

}); 