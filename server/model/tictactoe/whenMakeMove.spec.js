var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"1",
      event:"GameCreated",
      name:"CreatedGame",
      user : {
        userName:'Halldis',
        side: 'X'
      },
      timeStamp: "2015.12.18T11:29:44"
    }, {
      id:"2",
      event:"GameJoined",
      user : {
        userName:'Eva',
        side: 'O'
      },
      timeStamp: "2015.12.18T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"2",
        comm:"MakeMove",
        user:{
          userName : "Eva",
          side:'O'
        },
        x:0,
        y:1,
        timeStamp: "2015.12.18T11:30:50"
      };
      then=[{
        id:"2",
        event:"MoveMade",
        user:{
          userName:"Eva",
          side:'O'
        },
        name:"CreatedGame",
        x:0,
        y:1,
        timeStamp: "2015.12.18T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });

  describe("one previous move", function(){
    it('placing move in same place should be illegal',function(){
      given.push({
        id:"2",
        event:"MoveMade",
        user:{
          userName:"Eva",
          side:'O'
        },
        name:"CreatedGame",
        x:0,
        y:1,
        timeStamp: "2015.12.18T11:30:50"
      });

      when={
        id:"2",
        comm:"MakeMove",
        user:{
          userName:"Eva",
          side:'O'
        },
        x:0,
        y:1,
        timeStamp: "2015.12.18T11:30:50"
      };

      then=[{
        id:"2",
        event:"IllegalMove",
        user:{
          userName:"Eva",
          side:'O'
        },
        name:"CreatedGame",
        x:0,
        y:1,
        timeStamp: "2015.12.18T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });
  describe("on win", function(){
    it('having three in a column should result in a win event', function(){
      given.push({
         id:"2",
         event:"MoveMade",
         user:{
           userName:"Halldis",
           side:'X'
         },
         name:"CreatedGame",
         x:0,
         y:2,
         timeStamp: "2015.12.18T11:30:50"
      },
      { 
         id:"2",
         event:"MoveMade",
         user:{
           userName:"Halldis",
           side:'X'
         },
         name:"CreatedGame",
         x:1,
         y:2,
         timeStamp: "2015.12.18.T11:30:52"  
      });
      when={
        id:"2",
        comm:"MakeMove",
        user:{
          userName:"Halldis",
          side:'X'
        },
        x:2,
        y:2,
        timeStamp: "2015.12.18.T11.30.54"
      };
      then=[{
        id:"2",
        event:"Winner",
        user:{
          userName:"Halldis",
          side:'X'
        },
        name:"CreatedGame",
        timeStamp: "2015.12.18.T11.30.54"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

  it('having three in a row should result in a win event', function(){
      given.push({
         id:"2",
         event:"MoveMade",
         user:{
           userName:"Halldis",
           side:'X'
         },
         name:"CreatedGame",
         x:0,
         y:1,
         timeStamp: "2015.12.18T11:30:50"
      },
      { 
         id:"2",
         event:"MoveMade",
         user:{
           userName:"Halldis",
           side:'X'
         },
         name:"CreatedGame",
         x:1,
         y:1,
         timeStamp: "2015.12.18.T11:30:52"  
      });
      when={
        id:"2",
        comm:"MakeMove",
        user:{
          userName:"Halldis",
          side:'X'
        },
        x:2,
        y:1,
        timeStamp: "2015.12.18.T11.30.54"
      };
      then=[{
        id:"2",
        event:"Winner",
        user:{
          userName:"Halldis",
          side:'X'
        },
        name:"CreatedGame",
        timeStamp: "2015.12.18.T11.30.54"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
it('having three in a diagonal should result in a win event', function(){
      given.push({
         id:"2",
         event:"MoveMade",
         user:{
           userName:"Halldis",
           side:'X'
         },
         name:"CreatedGame",
         x:0,
         y:0,
         timeStamp: "2015.12.18T11:30:50"
      },
      { 
         id:"2",
         event:"MoveMade",
         user:{
           userName:"Halldis",
           side:'X'
         },
         name:"CreatedGame",
         x:1,
         y:1,
         timeStamp: "2015.12.18.T11:30:52"  
      });
      when={
        id:"2",
        comm:"MakeMove",
        user:{
          userName:"Halldis",
          side:'X'
        },
        x:2,
        y:2,
        timeStamp: "2015.12.18.T11.30.54"
      };
      then=[{
        id:"2",
        event:"Winner",
        user:{
          userName:"Halldis",
          side:'X'
        },
        name:"CreatedGame",
        timeStamp: "2015.12.18.T11.30.54"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
});

})
