/**
 * Created by ccmoralesj on 10/02/16.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var mongooseCachebox = require('mongoose-cachebox');
var DBUser = require('./User/User');

mongoose.connect('mongodb://localhost/firstKoaAPI');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {
    console.log("Connection with MongoDB established");
});

var schemas = {};

schemas.mongoose = mongoose;

module.exports = schemas;

