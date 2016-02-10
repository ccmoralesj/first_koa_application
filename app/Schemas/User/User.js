/**
 * Created by ccmoralesj on 10/02/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name        :   {type: String},
    city        :   {type: String},
    created_at  :   {type: Date, default: Date.now}
});

UserSchema.statics.findById = function(id){
    return this.findOne({_id:id}).select('-_id -__v');
};

module.exports = mongoose.model('User', UserSchema);