/**
 * Created by ccmoralesj on 9/02/16.
 */
var co = require('co');
var DBUser = require('mongoose').model('User');

module.exports = {
    DBUser : DBUser,
    removeAll: function(done){
        co(function*(){
            yield DBUser.remove({});

            done();
        });
    }
};