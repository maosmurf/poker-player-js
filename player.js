function weArePreflop(game)
{
    return game.community_cards === undefined || game.community_cards.length < 1;
}
module.exports = {
    

  VERSION: "Default JavaScript folding player V 0.0.2",

  bet_request: function(game_state) {
      var game = JSON.parse(game_state);
      var me = game.players[game.in_action];
      if (weArePreflop(game))
      {
          return game.current_buy_in - me.bet + 3 * game.minumum_raise;
      }
    return 50;
  },

  showdown: function(game_state) {
      return 0;

  }
};
