exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Timer = function() {
    this.difference = 0;
    this.startTime = (new Date().getTime() / 1000) / 60;

    var setTimeDifference = function(newDifference) {
        this.difference = newDifference;
    }

    var get = function() {
        return startTime + this.difference;
    }

    this.get = get.bind(this);
    this.setTimeDifference = setTimeDifference.bind(this);
}
