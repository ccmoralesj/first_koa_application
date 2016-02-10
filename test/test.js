/**
 * Created by ccmoralesj on 5/02/16.
 */
"use strict";
var co = require('co');

var app = require('./../app.js');
var request = require('supertest').agent(app.listen());

var utils = require('./utils.js');

describe('First KOA app.',function(){

    // Test User for every unit testing
    var test_user = { name: "Cristian Camilo", city:"Medellín, Colombia"};

    // Hooks before and after every Test
    beforeEach(function(done){
        utils.removeAll(done);
    });

    afterEach(function(done){
        utils.removeAll(done);
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
            var newUser = new utils.DBUser(test_user);

            var user = yield newUser.save();

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

    it('PUT updating some user data',function(done){
        co(function*(){
            // Insert test user in database
            var newUser = new utils.DBUser(test_user);

            var user = yield newUser.save();

            var userURL = '/users/' + user._id;

            // PUT
            request
                .put(userURL)
                .send({name: 'Cristian V2', city:'Bello, Colombia'})
                .expect('location',userURL)
                .expect(204,done);
        });
    });

    it.only('DELETE Deleting some user from the database',function(done){
        co(function*(){
            // Insert test user in database
            var newUser = new utils.DBUser(test_user);

            var user = yield newUser.save();

            var userURL = '/users/' + user._id;

            // DELETE
            request
                .del(userURL)
                .expect(200,done);
        });
    });
});

