/** @jsx React.DOM */

var React = require('react');

module.exports = NotificationBar = React.createClass({
  render: function(){
    var count = this.props.count;
    return (
      <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
        <p>Il y a {count} new tweets! <a href="#top" onClick={this.props.onShowNewTweets}>Cliquez pour les afficher</a></p>
      </div>
    )
  }
});