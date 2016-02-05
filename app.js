/**
 * Created by ccmoralesj on 5/02/16.
 */

var koa = require("koa");

var app = module.exports = koa();

// Fire it up
app.listen(3000);
console.log("App is listening on Port 3000");