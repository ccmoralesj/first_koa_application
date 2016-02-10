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
        var newUser = new DBUser(user);

        var userSaved = yield newUser.save();


        // Return location of user and HTTP OK
        this.set("location","/users/" + userSaved._id);
        this.status = 200;
    },
    getUsers: function*(uid){

        //var user = yield DBUser.findOne({_id:uid}).select('-_id -__v');
        var user = yield DBUser.findById(uid);
        this.body = user;
        this.status = 200;
    },
    updateUser: function*(uid){

        // Parse incoming user
        var user = yield parse(this);

        yield DBUser.update({_id: uid},{$set:user});

        this.set("location","/users/" + uid);
        this.status = 204;
    },
    deleteUser: function*(uid){
        yield DBUser.remove({_id:uid});
        this.status = 200;
    }
};