var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.user.side;
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
          timeStamp: cmd.timeStamp
        }]
      }
      //win
        //column
        if((gameState.board[0][cmd.y]===cmd.user.side && gameState.board[1][cmd.y]===cmd.user.side ) ||
           (gameState.board[1][cmd.y]===cmd.user.side && gameState.board[2][cmd.y]===cmd.user.side ) || 
           (gameState.board[2][cmd.y]===cmd.user.side && gameState.board[0][cmd.y]===cmd.user.side )){
           return [{
	     id:cmd.id,
             event: "Winner",
	     user: cmd.user,
             name:gameState.gameCreatedEvent.name,
	     timeStamp: cmd.timeStamp
          }]
        } 
        //row
        if((gameState.board[cmd.x][0]===cmd.user.side && gameState.board[cmd.x][1]===cmd.user.side) ||
           (gameState.board[cmd.x][1]===cmd.user.side && gameState.board[cmd.x][2]===cmd.user.side) || 
           (gameState.board[cmd.x][2]===cmd.user.side && gameState.board[cmd.x][0]===cmd.user.side)){
           return [{
	     id:cmd.id,
             event: "Winner",
	     user: cmd.user,
             name:gameState.gameCreatedEvent.name,
	     timeStamp: cmd.timeStamp
          }]
        } 
        //diagonal
        var diagonal = 0;
        if((cmd.x===0 && cmd.y===0)|| (cmd.x===2 && cmd.y===2))
        {
               if((gameState.board[0][0]===cmd.user.side && gameState.board[1][1]===cmd.user.side) ||
               (gameState.board[1][1]===cmd.user.side && gameState.board[2][2]===cmd.user.side) || 
               (gameState.board[2][2]===cmd.user.side && gameState.board[0][0]===cmd.user.side))
               {
                   diagonal = 1;
               }
        }
        
        if((cmd.x===2 && cmd.y===0)|| (cmd.x===0 && cmd.y===2))
        {
               if((gameState.board[0][2]===cmd.user.side && gameState.board[1][1]===cmd.user.side) ||
               (gameState.board[1][1]===cmd.user.side && gameState.board[2][0]===cmd.user.side) || 
               (gameState.board[0][2]===cmd.user.side && gameState.board[2][0]===cmd.user.side))
               {
                   diagonal = 1;
               }
        }
 
         
        if(diagonal ===1)
        {
           return [{
	     id:cmd.id,
             event: "Winner",
	     user: cmd.user,
             name:gameState.gameCreatedEvent.name,
	     timeStamp: cmd.timeStamp
          }]
        } 
      //draw
      var counter = 0;
      for(var i=0;i<3;i++)
      {
         for(var j=0;j<3;j++)
         {
            if(gameState.board[i][j] !=='')
            {
              counter++;
            }
         }
      }
      if(counter===8)
      {
        return[{
         id:cmd.id,
         event: "Draw",
         user: cmd.user,
         name:gameState.gameCreatedEvent.name,
         timeStamp: cmd.timeStamp
      }]}
      //move made
      return [{
        id: cmd.id,
        event: "MoveMade",
        user: cmd.user,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
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
  }
};
