var http = require('http');
var fs = require('fs');
var helper = require('./helper');

module.exports = {

  VERSION: "Default JavaScript folding player XXX37YY",

  bet_request: function(game_state) {

      var game = JSON.parse(game_state);
      var activePlayers = helper.countActivePlayers(game.players);

      if (activePlayers >= 3) {
          return helper.strategyThreeOrMore(game);
      } else if (activePlayers == 2) {
          return helper.strategyHeadsUp(game);
      } else {
          return 0;
      }
  },

  showdown: function(game_state) {
      return 0;

  }
};

