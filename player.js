function weArePreflop(game)
{
    return game.community_cards === undefined || game.community_cards.length < 1;
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

module.exports = {

  VERSION: "Default JavaScript folding player V 0.0.4",

  bet_request: function(game_state) {
      var game = JSON.parse(game_state);
      var me = game.players[game.in_action];
      var holeCards = me.hole_cards;
      if (weArePreflop(game))
      {
          return game.current_buy_in - me.bet + 3 * game.minumum_raise;
      }
      if (countCoolCard(holeCards) == 2) {
          return game.current_buy_in - me.bet + 8 * game.minumum_raise;
      }
      if (countCoolCard(holeCards) == 1) {
          return game.current_buy_in - me.bet + 5 * game.minumum_raise;
      }
      return 0;
  },

  showdown: function(game_state) {
      return 0;

  }
};
