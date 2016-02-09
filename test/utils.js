/**
 * Created by ccmoralesj on 9/02/16.
 */
var co = require('co');
var users = require("../routes/users").users;

module.exports = {
    users : users,
    removeAll: function(done){
        co(function*(){
            yield users.remove({});

            done();
        });
    }
};