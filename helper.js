const ALL_IN = 666 * 666;

module.exports = {
  help: function() {
      return 0;
  },

    getRankLocally: function (allCards)
    {
        var ranks = {};
        var colors = {};

        allCards.forEach(function(card){

            var rank = card.rank;
            var suit = card.suit;

            if (ranks[rank] === undefined) {
                ranks[rank] = 1;
            } else {
                ranks[rank]++;
            }

            if (colors[suit] === undefined)
            {
                colors[suit] = 1;
            } else
            {
                colors[suit]++;
            }



        });

        for (var color in colors) {
            if (colors[color] == 5) return 5;
        }

        for (var rank in ranks) {
            if (ranks[rank] == 2) return 1;
            if (ranks[rank] == 3) return 3;
            if (ranks[rank] == 4) return 7;
        }

        return 0;

    },
    weArePreflop: function (game)
    {
        return game.community_cards === undefined || game.community_cards.length < 1;
    },
    weHavePairsHoleCards: function (holeCards)
    {
        return (holeCards[0].rank === holeCards[1].rank);
    },
    countCoolCard: function (holeCards)
    {
        var coolCards = {ten: '10', J: 'J', Q: 'Q', K: 'K', A: 'A'};

        var myCoolCards = 0;

        // TODO rank cool cards

        holeCards.forEach(function (card)
        {
            for(var coolCard in coolCards) {
                if (coolCards[coolCard] == card.rank) {
                    myCoolCards++;
                }
            }
        });

        return myCoolCards;
    },
    raiseAmount: function (game, me, raiseFactor)
    {
        var currentBuyIn = game.current_buy_in;
        var myBet = me.bet;
        var minimumRaise = game.minimum_raise;

        const raiseAmount = currentBuyIn - myBet + raiseFactor * minimumRaise;

        var debug = {
            method: 'raiseAmount',
            currentBuyIn: currentBuyIn,
            myBet: myBet,
            minimumRaise: minimumRaise,
            raiseAmount: raiseAmount
        };

        console.log(debug);

        return  raiseAmount;
    },
    raiseTimes: function(game, me, raiseFactor) {

        var currentBuyIn = game.current_buy_in;
        var myBet = me.bet;
        var minimumRaise = game.minimum_raise;

        var raiseAmount = Math.round(currentBuyIn - myBet + raiseFactor * minimumRaise);

        var debug = {
            method: 'raiseTimes',
            currentBuyIn: currentBuyIn,
            myBet: myBet,
            minimumRaise: minimumRaise,
            raiseAmount: raiseAmount
        };

        console.log(debug);

        return  raiseAmount;

    },
    callAmount: function(game) {
        var me = game.players[game.in_action];
        return this.raiseAmount(game, me, 0);

    },
    countActivePlayers: function(players) {
        var activePlayers = 0;
        players.forEach(function(player){
            if (player.status == 'active')
            {
                activePlayers++;
            }
        });
        return activePlayers;
    },

    strategyThreeOrMore: function(game) {

        var me = game.players[game.in_action];
        console.log("strat N");
        if (this.weArePreflop(game)) {
            console.log("weArePreflop N");
            if (this.weHavePairsHoleCards(me.hole_cards)) {
                console.log("weHavePairsHoleCards N");
                return ALL_IN;
            }
            if (this.countCoolCard(me.hole_cards) == 2) {
                console.log("2 countCoolCard N");

                const potential = this.raiseTimes(game, me, 4);
                if (this.betTooLargeForMyStack(potential, me.stack, 30)) {
                    console.log("bet too high N, calling");
                    return this.callAmount(game);
                }
                return  potential;
            }
            if (this.countCoolCard(me.hole_cards) == 1) {
                console.log("1 countCoolCard N");
                const potetntialRaise = this.callAmount(game);
                if (this.betTooLargeForMyStack(potetntialRaise, me.stack, 10)) {
                    console.log("bet too high N, folding");
                    return 0;
                }
                return potetntialRaise;
            }
            return 0;
        }

        var allCards = me.hole_cards.concat(game.community_cards);

        const rank = this.getRankLocally(allCards);
        if (rank > 1) {
            console.log("rank " + rank);
            return ALL_IN;
        }
        if (rank > 0) {
            console.log("rank " + rank);
            return this.callAmount(game);
        }


        return 0;
    },
    strategyHeadsUp: function(game) {
        console.log("strat 2");

        var me = game.players[game.in_action];
        if (this.weArePreflop(game)) {
            console.log("weArePreflop 2");
            if (this.weHavePairsHoleCards(me.hole_cards)) {
                console.log("weHavePairsHoleCards 2");
                return  ALL_IN;
            }
            if (this.countCoolCard(me.hole_cards) == 2) {
                console.log("2 countCoolCard 2");
                var potential = this.raiseTimes(game, me, 4);
                if (this.betTooLargeForMyStack(potential, me.stack, 50)) {
                    console.log("bet too high 2, calling");
                    return this.callAmount(game);
                }
                return  potential;
            }
            if (this.countCoolCard(me.hole_cards) == 1) {
                console.log("1 countCoolCard 2");
                var potential = this.callAmount(game);
                if (this.betTooLargeForMyStack(potential, me.stack, 30)) {
                    console.log("bet too high 2, folding");
                    return 0;
                }
                return potetntialRaise;
            }
            return 0;
        }

        var allCards = me.hole_cards.concat(game.community_cards);

        const rank = this.getRankLocally(allCards);
        if (rank > 1) {
            console.log("rank " + rank);
            return ALL_IN;
        }
        if (rank > 0) {
            console.log("rank " + rank);
            return game.current_buy_in;
        }


        return 0;
    },
    betTooLargeForMyStack: function(potentialRaise, stack, percentOfStack) {
        if ((100 / stack * potentialRaise) > percentOfStack) {
            return false
        }
        return true;
    }
};

