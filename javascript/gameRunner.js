exports = typeof window !== "undefined" && window !== null ? window : global;

var state0 = 1; // SEED - change these to affect the apparent randomness of the outcome
var state1 = 2; // SEED - change these to affect the apparent randomness of the outcome

exports.runner = function(game) {
    state0 = 1;
    state1 = 2;
    do {
        game.roll(Math.floor(xorshift()*6) + 1);
        
        if (Math.floor(xorshift()*10) == 7){
            notAWinner = game.wrongAnswer();
        } else {
            notAWinner = game.wasCorrectlyAnswered();
        }
        
    } while(notAWinner);
};

function xorshift() {
    var s1 = state0; 
    var s0 = state1; 
    state0 = s0;  

    /* SHIFTS - Just as with the seed values, the shift values (23, 17, and 26 here) must be 
    carefully chosen to lengthen the algorithm's period (the number of iterations before you 
    encounter repetition). Try changing these to see how the outcome is affected. */

    s1 ^= s1 << 23;  // SHIFT
    s1 ^= s1 >> 17;  // SHIFT
    s1 ^= s0;
    s1 ^= s0 >> 26;  // SHIFT
    state1 = s1;

   return +((state0 + state1).toString()[0]) / 10;
}
