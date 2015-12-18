var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when={
      id:"1",
      gameId:"1",
      comm:"CreateGame",
      user : {
        userName:'Halldis',
        side: 'X'
      },
      name:"CreatedGame",
      timeStamp: "2015.12.18T11:29:44"
    };
    then=[{
      id:"1",
      gameId:"2",
      event:"GameCreated",
      user : {
        userName:'Halldis',
        side: 'X'
      },
      name:"CreatedGame",
      timeStamp: "2015.12.18T11:29:44"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with another user another time',function(){
    given= [];
    when={
      id:"2",
      gameId:"2",
      comm:"CreateGame",
      user : {
        userName:'Eva',
        side: 'X'
      },
      name:"CreatedGame",
      timeStamp: "2015.12.18T10:29:44"
    };
    then=[{
      id:"2",
      gameId:"2",
      event:"CreatedGame",
      user : {
        userName:'Eva',
        side: 'X'
      },
      name:"CreatedGame",
      timeStamp: "2015.12.18T10:29:44"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
