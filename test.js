/**
 * Created by ccmoralesj on 5/02/16.
 */
var co = require('co');
var users = require("./routes/users").users;

var app = require('./app.js');
var request = require('supertest').agent(app.listen());