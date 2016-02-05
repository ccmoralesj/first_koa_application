/**
 * Created by ccmoralesj on 5/02/16.
 */
var parse = require("co-body");

var monk = require("monk");
var wrap = require("co-monk");

var db = monk("localhost/firstKoaAPI");
var users = wrap(db.get("users"));


module.exports= {
    users   : users,
    getUsers: function*(uid){
        this.body = "Hey there user number: " + uid;
    },
    addUser: function*(){
        // Parse incoming user
        var user = yield parse(this);

        // Store in DB
        var userSaved = yield users.insert(user);

        // Return location of user and HTTP OK
        this.set("location","/users/" + userSaved._id);
        this.status = 200;
    }
};