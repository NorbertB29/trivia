require('./gameLogger.js');
require('./gameRunner.js');


exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function(logger) {
  var log = logger ? logger.log : console.log;

  var players          = new Array();
  var places           = new Array(6);
  var purses           = new Array(6);
  var inPenaltyBox     = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var currentCategory = function(){
    if(places[currentPlayer] == 0)
      return 'Pop';
    if(places[currentPlayer] == 4)
      return 'Pop';
    if(places[currentPlayer] == 8)
      return 'Pop';
    if(places[currentPlayer] == 1)
      return 'Science';
    if(places[currentPlayer] == 5)
      return 'Science';
    if(places[currentPlayer] == 9)
      return 'Science';
    if(places[currentPlayer] == 2)
      return 'Sports';
    if(places[currentPlayer] == 6)
      return 'Sports';
    if(places[currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  this.createRockQuestion = function(index){
    return "Rock Question "+index;
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push(this.createRockQuestion(i));
  };

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    log(playerName + " was added");
    log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function(){
    return players.length;
  };


  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      log(popQuestions.shift());
    if(currentCategory() == 'Science')
      log(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      log(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      log(rockQuestions.shift());
  };

  this.roll = function(roll){
    log(players[currentPlayer] + " is the current player");
    log("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;

        log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if(places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        log("The category is " + currentCategory());
        askQuestion();
      }else{
        log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function(){
    if(inPenaltyBox[currentPlayer]){
      if(isGettingOutOfPenaltyBox){
        log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      }else{
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }



    }else{

      log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function(){
		log('Question was incorrectly answered');
		log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if(currentPlayer == players.length)
      currentPlayer = 0;
		return true;
  };
};

var notAWinner = false;

// var logger = new GameLogger();
// var game = new Game(logger);

// game.add('User1');
// game.add('User2');

// runner(game);
// logger.writeResult(1);

