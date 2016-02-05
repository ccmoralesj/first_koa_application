/**
 * Created by ccmoralesj on 5/02/16.
 */
var co = require('co');
var users = require("./routes/users").users;

var app = require('./app.js');
var request = require('supertest').agent(app.listen());

describe('First KOA app.',function(){
    var test_user = { name: "Cristian", city:"Medellín, Colombia"};

    it('POST new user',function(done){
        // POST
        request
            .post("/users")
            .send(test_user)
            .expect('location',/^\/users\/[0-9a-fA-F]{24}$/) // Mongo Object ID /users/2342
            .expect(200,done);
    });

});
