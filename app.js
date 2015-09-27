/** @jsx React.DOM */

var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');

// On récupère l'état initial rendu du côté du serveur
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)

// On render les components à partir de l'état renvoyé par le serveur
React.renderComponent(
  <TweetsApp tweets={initialState}/>,
  document.getElementById('react-app')
);