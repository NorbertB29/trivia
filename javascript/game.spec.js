require('./game.js');
require('./gameLogger.js');
require('./gameRunner.js');
const fs = require('fs');

// describe("The test environment", function() {
//   it("should pass", function() {
//     expect(true).toBe(true);
//   });

//   it("should access game", function() {
//     expect(Game).toBeDefined();
//   });
// });

describe("Your specs...", function() {
  var logs = [];
  var game, logger;
  
  console.log = function(message) {
    logs.push(message);
  }
  
  function logger(index) {
    console.warn('Logs:' + logs.length);
    console.warn('Log from test:' + logs[index]);
  }

  beforeEach(() => {
    logs = [];
    gameLogger = new GameLogger();
    game = new Game(gameLogger);
  });
  
  it("should add user by name", function() {
    game.add('user1');
    expect(logs[0]).toBe('user1 was added');
  });

  it("should return new rock question", function() {
    var newQ = game.createRockQuestion(0);
    expect(newQ).toBe('Rock Question 0');
  });

  it("should return false if less than 2", function() {
    const result = game.isPlayable(1);
    expect(result).toBeFalsy();
  });

  // it("should return false if more than 6", function() {
  //   const result = game.isPlayable(7);
  //   expect(result).toBeFalsy();
  // });

  it("should move to next step", function() {
    game.add('User');
    game.roll(2);
    expect(logs[4]).toBe('User\'s new location is 2');
  });

  it('golden master test 1', function() {
    game.add('Chet');
    game.add('Pat');
    game.add('Sue');
    runner(game);

    const result = fs.readFileSync('golden_master_0.txt', { encoding: 'utf8' });
    const parsedData = String(result).split(',');

    expect(gameLogger.logs).toEqual(parsedData);
  });

  it('golden master test 2', function() {
    game.add('User1');
    game.add('User2');
    runner(game);

    const result = fs.readFileSync('golden_master_1.txt', { encoding: 'utf8' });
    const parsedData = String(result).split(',');

    expect(gameLogger.logs).toEqual(parsedData);
  });

});
