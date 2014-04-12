// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var httpsync = require('httpsync');

function weArePreflop(game)
{
    return game.community_cards === undefined || game.community_cards.length < 1;
}
function weHavePairsHoleCards(holeCards)
{
    return (holeCards[0] === holeCards[1]);
}
function countCoolCard(holeCards)
{
    var coolCards = {J: 'J', Q: 'Q', K: 'K', A: 'A'};

    var myCoolCards = 0;

    holeCards.forEach(function (card)
    {
        for(var coolCard in coolCards) {
            if (coolCard == card) {
                myCoolCards++;
            }
        }
    });

    return myCoolCards;
}

function raiseAmount(game, me, raiseFactor)
{
    var currentBuyIn = game.current_buy_in;
    var bet = me.bet;
    var minimumRaise = game.minimum_raise;
    return currentBuyIn - bet + raiseFactor * minimumRaise;
}
function getRank(game, holeCards)
{
    var allCards = holeCards.concat(game.community_cards);

    var req = httpsync.request({
        url: "http://localhost:2048/",
          method: "POST"
    });

    req.write(JSON.stringify(allCards));
     var rank = req.end();
    return rank;
}

module.exports = {

  VERSION: "Default JavaScript folding player V12",

  bet_request: function(game_state) {

      var game = JSON.parse(game_state);
      var me = game.players[game.in_action];
      if (weArePreflop(game)) {
          if (weHavePairsHoleCards(me.hole_cards)) {
              return  raiseAmount(game, me, 8);
          }
          if (countCoolCard(me.hole_cards) == 2) {
              return raiseAmount(game, me, 8);
          }
          if (countCoolCard(me.hole_cards) == 1) {
              return raiseAmount(game, me, 5);
          }
          return 0;
      }
      if (weHavePairsHoleCards(me.hole_cards)) {
          return  raiseAmount(game, me, 2);
      }
      if (countCoolCard(me.hole_cards) == 2) {
          return raiseAmount(game, me, 1);
      }
      console.log('rank');
      var rank = getRank(game, me.hole_cards);
      console.log(rank);

      return 0;
  },

  showdown: function(game_state) {
      return 0;

  }
};

