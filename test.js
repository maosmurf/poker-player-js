var helper = require('./helper');

exports.testHelp = function(test){
    test.equals(helper.help(), 0);
    test.done();
};

exports.testCountCoolCard = function(test){
    cards = [{
            "rank": "10",
            "suit": "hearts"
        },
        {
            "rank": "7",
            "suit": "spades"
        }
    ]
    test.equals(helper.countCoolCard(cards), 1);
    test.done();
};


exports.testPlayersQuery = function(test){
    players = [
        {

            "id": 0,

            "name": "Albert",
            "status": "active",
            "version": "Default random player",

            "stack": 1010,


            "bet": 320
        },
        {
            "id": 1,
            "name": "Bob",
            "status": "active",
            "version": "Default random player",
            "stack": 1590,
            "bet": 80,
            "hole_cards": [

                {
                    "rank": "10",
                    "suit": "hearts"
                },
                {
                    "rank": "7",
                    "suit": "spades"
                }
            ]
        },
        {
            "id": 2,
            "name": "Chuck",
            "status": "out",
            "version": "Default random player",
            "stack": 0,
            "bet": 0
        }
    ]
    test.equals(helper.countActivePlayers(players), 2);
    test.done();
};

exports.testCountCoolCard = function(test){
    test.equals(helper.betTooLargeForMyStack(610, 1000, 60), false);
    test.equals(helper.betTooLargeForMyStack(610.9, 1000, 60), false);
    test.equals(helper.betTooLargeForMyStack(200, 1000, 60), true);
    test.equals(helper.betTooLargeForMyStack(200.5, 1000, 60), true);
    test.equals(helper.betTooLargeForMyStack(10, 1000, 60), true);
    test.equals(helper.betTooLargeForMyStack(10.1, 1000, 60), true);
    test.equals(helper.betTooLargeForMyStack(0, 1000, 60), true);
    test.equals(helper.betTooLargeForMyStack(2000, 1000, 60), false);
    test.done();
};




