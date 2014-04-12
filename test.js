var helper = require('./helper');

exports.testHelp = function(test){
    test.equals(helper.help(), 0);
    test.done();
};
