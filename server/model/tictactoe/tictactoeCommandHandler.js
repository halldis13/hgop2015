var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          user: cmd.user,
          name: cmd.name,
          timeStamp: cmd.timeStamp

        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            user: cmd.user,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          user: cmd.user,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      //illegal move
      if(gameState.board[cmd.x][cmd.y]!==''){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          user: cmd.user,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }
      //win
        //column
         if((gameState.board[0][cmd.y]===cmd.side && gameState.board[1][cmd.y]===cmd.side) ||
           (gameState.board[1][cmd.y]===cmd.side && gameState.board[2][cmd.y]===cmd.side) || 
           (gameState.board[2][cmd.y]===cmd.side && gameState.board[0][cmd.y]===cmd.side)){
           return [{
	     id:cmd.id,
             event: "Winner",
	     user: cmd.user,
             name:gameState.gameCreatedEvent.name,
	     timeStamp: cmd.timeStamp
          }]
        }  
        //row
        if((gameState.board[cmd.x][0]===cmd.side && gameState.board[cmd.x][1]===cmd.side) ||
           (gameState.board[cmd.x][1]===cmd.side && gameState.board[cmd.x][2]===cmd.side) || 
           (gameState.board[cmd.x][2]===cmd.side && gameState.board[cmd.x][0]===cmd.side)){
           return [{
	     id:cmd.id,
             event: "Winner",
	     user: cmd.user,
             name:gameState.gameCreatedEvent.name,
	     timeStamp: cmd.timeStamp
          }]
        } 
        //diagonal
        if((gameState.board[0][2]===cmd.side && gameState.board[2][0]===cmd.side) ||
           (gameState.board[1][1]===cmd.side && gameState.board[0][2]===cmd.side) || 
           (gameState.board[1][1]===cmd.side && gameState.board[2][0]===cmd.side) ||
           (gameState.board[0][0]===cmd.side && gameState.board[1][1]===cmd.side) ||
           (gameState.board[0][0]===cmd.side && gameState.board[2][2]===cmd.side) || 
           (gameState.board[1][1]===cmd.side && gameState.board[2][2]===cmd.side)){
           return [{
	     id:cmd.id,
             event: "Winner",
	     user: cmd.user,
             name:gameState.gameCreatedEvent.name,
	     timeStamp: cmd.timeStamp
          }]
        } 
      //check if full
      //draw
      //move made
      return [{
        id: cmd.id,
        event: "MoveMade",
        user: cmd.user,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
        side:cmd.side,
        timeStamp: cmd.timeStamp
      }]
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
