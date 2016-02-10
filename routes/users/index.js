/**
 * Created by ccmoralesj on 5/02/16.
 */
var parse = require("co-body");

var monk = require("monk");
var wrap = require("co-monk");

var db = monk("localhost/firstKoaAPI");
var users = wrap(db.get("users"));

var DBUser = require('mongoose').model('User');


module.exports= {
    users   : users,
    addUser: function*(){

        // Parse incoming user
        var user = yield parse(this);

        // Store in DB
        var userSaved = yield users.insert(user);

        // Return location of user and HTTP OK
        this.set("location","/users/" + userSaved._id);
        this.status = 200;
    },
    getUsers: function*(uid){

        var user = yield users.findById(uid);
        this.body = user;
        this.status = 200;
    },
    updateUser: function*(uid){

        // Parse incoming user
        var user = yield parse(this);

        yield users.updateById(uid,user);

        this.set("location","/users/" + uid);
        this.status = 204;
    },
    deleteUser: function*(uid){
        yield users.remove({_id:uid});
        this.status = 200;
    },
    addUserMongoose: function*(){

        // Parse incoming user
        var user = yield parse(this);

        // Store in DB
        var newUser = new DBUser(user);

        var userSaved = yield newUser.save();

        console.log("userSaved",userSaved);
        // Return location of user and HTTP OK
        this.set("location","/users/" + userSaved._id);
        this.status = 200;
    }
};