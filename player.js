// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var helper = require('./helper');

const ALL_IN = 666 * 666;



module.exports = {

  VERSION: "Default JavaScript folding player V22",

  bet_request: function(game_state) {

      var game = JSON.parse(game_state);
      var me = game.players[game.in_action];
      if (helper.weArePreflop(game)) {
          console.log("weArePreflop");
          if (helper.weHavePairsHoleCards(me.hole_cards)) {
              console.log("weHavePairsHoleCards");
              return  ALL_IN;
          }
          if (helper.countCoolCard(me.hole_cards) == 2) {
              console.log("2 countCoolCard");
              return helper.raiseAmount(game, me, 8);
          }
          if (helper.countCoolCard(me.hole_cards) == 1) {
              console.log("1 countCoolCard");
              return helper.raiseAmount(game, me, 5);
          }
          return 0;
      }

      var allCards = me.hole_cards.concat(game.community_cards);

      const rank = helper.getRankLocally(allCards);
      if (rank > 0) {
          console.log("rank " + rank);
          return ALL_IN;
      }

      return 0;
  },

  showdown: function(game_state) {
      return 0;

  }
};

