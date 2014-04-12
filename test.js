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




