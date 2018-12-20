const fs = require('fs');

exports = typeof window !== "undefined" && window !== null ? window : global;

exports.GameLogger = function() {
    this.logs = [];
    
    var logger = function(message) {
        console.log(message);
        this.logs.push(message);
    }

    var writeResult = function(index) {
        // this.logs to file
        fs.writeFile('golden_master_' + index + '.txt', this.logs, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log('golden_master saved!')
        });
    }
    
    this.log = logger.bind(this);
    this.writeResult = writeResult.bind(this);
};
