'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function () {

  it('should respond with JSON array with created events for game', function (done) {
    var command =     {
      id : "1",
      gameId : "666",
      comm: "CreateGame",
      user:{
        userName:"Halldis",
        side:"X"
      },
      name: "GameCreated",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .get('/api/gameHistory/666')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1",
                "gameId": "6",
                "event": "GameCreated",
                "user":{
                  "userName": "Halldis",
                  "side" :"X"
                },
                "name": "CreatedGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });
});
