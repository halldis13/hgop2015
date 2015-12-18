var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

  var given, when, then;

  it('should join game',function(){
    given= [{
      id:"1",
      event:"GameCreated",
      userName: "Halldis",
      timeStamp: "2015.12.18T11:29:44"
    }];
    when={
      id:"2",
      comm:"JoinGame",
      user:{
        userName : "Eva",
        side:'O'
      },
      name:"CreatedGame",
      timeStamp: "2015.12.18T11:30:50"
    };
    then=[{
      id:"2",
      event:"GameJoined",
      user:{
        userName : "Eva",
        side:'O'
      },
      timeStamp: "2015.12.18T11:30:50"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject joining of a non-existing game',function(){
    given= [];
    when={
      id:"2",
      comm:"JoinGame",
      user:{
        userName : "Eva",
        side: 'O'
      },
      name:"CreatedGame",
      timeStamp: "2015.12.18T11:30:55"
    };
    then=[{
      id:"2",
      event:"GameDoesNotExist",
      user:{
        userName : "Eva",
        side: 'O'
      },
      timeStamp: "2015.12.18T11:30:55"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
