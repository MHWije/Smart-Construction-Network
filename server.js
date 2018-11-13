'use strict'

//packages
const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const session = require('express-session');


var login = require("./Routers/login");
var newaccount = require("./Routers/newaccount");
var sessiondetails = require("./Routers/session");
var profile = require("./Routers/profile");
var connection = require("./Routers/connection");
var workerprofileoutside = require("./Routers/WorkerProfileOutside");
var notify = require("./Routers/notification");
var project=require("./Routers/New_Project");
var projectDetails=require("./Routers/Project_Details");
var stageWorker=require("./Routers/StageWorkerRequest");
var estimation=require("./Routers/Estimation");

//use bodyparser to the app
app.use(bodyParser.json());
//session registration
app.use(session({secret:'SCNsessions'}));

//set the root directory
app.use(express.static(__dirname+"/Public/", {index: 'index.html'}));

//routes
app.use('/login',login);
app.use('/account',newaccount);
app.use('/session',sessiondetails);
app.use('/profile',profile);
app.use('/connection',connection);
app.use('/viewprofile',workerprofileoutside);
app.use('/notify',notify);
app.use('/project',project);
app.use('/manageproject',projectDetails);
app.use('/stageworker',stageWorker);
app.use('/estimation',estimation);

module.exports = app;

app.listen(3000);
console.log("Server running on port 3000");