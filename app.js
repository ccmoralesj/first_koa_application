/**
 * Created by ccmoralesj on 5/02/16.
 */
"use strict";

var koa = require("koa");

var app = module.exports = koa();
var routes = require("koa-route");

var mongoose = require('./app/Schemas');


// Routes
var userRoutes = require("./routes/users");

app.use(routes.post("/users",userRoutes.addUser));
app.use(routes.get("/users/:uid",userRoutes.getUsers));
app.use(routes.put("/users/:uid",userRoutes.updateUser));
app.use(routes.del("/users/:uid",userRoutes.deleteUser));


// Fire it up
app.listen(3000);
console.log("App is listening on Port 3000");