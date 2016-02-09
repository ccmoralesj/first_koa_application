/**
 * Created by ccmoralesj on 5/02/16.
 */
"use strict";
var co = require('co');
var users = require("./routes/users").users;

var app = require('./app.js');
var request = require('supertest').agent(app.listen());

describe('First KOA app.',function(){
    var test_user = { name: "Cristian", city:"Medellín, Colombia"};

    function removeAll(done){
        co(function*(){
            yield users.remove({});

            done();
        });
    }

    beforeEach(function(done){
        removeAll(done);
    });

    afterEach(function(done){
        removeAll(done);
    });

    it('POST new user',function(done){
        // POST
        request
            .post("/users")
            .send(test_user)
            .expect('location',/^\/users\/[0-9a-fA-F]{24}$/) // Mongo Object ID /users/2342
            .expect(200,done);
    });


    it('GET existing user',function(done){

        co(function*(){
            // Insert test user in database
            var user = yield users.insert(test_user);

            var userURL = '/users/' + user._id;

            // GET
            request
                .get(userURL)
                .set('Accept','application/json')
                .expect('Content-Type',/json/)
                .expect(/Cristian/)
                .expect(/Medellín, Colombia/)
                .expect(200,done);
        });
    });

});

