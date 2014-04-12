function weArePreflop(game)
{
    return game.community_cards === undefined || game.community_cards.length < 1;
}
function weHavePairs(holeCards)
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
    return game.current_buy_in - me.bet + raiseFactor * game.minumum_raise;
}
module.exports = {

  VERSION: "Default JavaScript folding player V7",

  bet_request: function(game_state) {
      var game = JSON.parse(game_state);
      var me = game.players[game.in_action];
      var holeCards = me.hole_cards;
      if (weArePreflop(game))
      {
          if (weHavePairs(holeCards)) {
              return  raiseAmount(game, me, 8);
          }
          if (countCoolCard(holeCards) == 2) {
              return raiseAmount(game, me, 8);
          }
          if (countCoolCard(holeCards) == 1) {
              return raiseAmount(game, me, 5);
          }
          return raiseAmount(game, me, 3);
      }
      return 0;
  },

  showdown: function(game_state) {
      return 0;

  }
};
