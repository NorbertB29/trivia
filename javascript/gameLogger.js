exports = typeof window !== "undefined" && window !== null ? window : global;

exports.GameLogger = function() {
    this.logs = [];
    
    var logger = function(message) {
        console.log(message);
        this.logs.push(message);
    }
    
    this.log = logger.bind(this);
};
