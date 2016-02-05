/**
 * Created by ccmoralesj on 5/02/16.
 */

module.exports= {
    getUsers: function*(uid){
        this.body = "Hey there user number: " + uid;
    }
};