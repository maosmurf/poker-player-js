// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

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

    function normalSyncRank()
    {
        var options = {
            host: 'localhost',
            port: 2048,
            path: '/',
            method: 'POST'
        };

        var rank = -1;

        console.log("get rank?");

        var req = http.request(options, function(res){
            res.setEncoding('utf8');
            res.on('data', function(chunk){
                console.log("got response chunk: " + chunk);
                var response = JSON.parse(chunk);
                rank = response.rank;
                console.log("rank: " + rank);
            });
        });

        var data = JSON.stringify(allCards);

        console.log("get rank write?");
        req.write(data);
        console.log("get rank end?");
        req.end();
        console.log("get rank while?");

        while(rank < 0) {
            continue;
        }
        console.log("get rank ?" + rank);

        return rank;
    }
//    function httpSyncRank()
//    {
//        var req = httpsync.request({
//            url: "http://localhost:2048/",
//            method: "POST"
//        });
//        req.write(JSON.stringify(allCards));
//        var rank = req.end();
//        return rank;
//    }

    return normalSyncRank();
}

module.exports = {

  VERSION: "Default JavaScript folding player V15",

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

