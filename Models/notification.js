'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);

exports.insertNotification = function(userID,workerName,reqID,reqbody,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[notification] (nt_id,notify_assigner_id,notify_assigner_name,notify_assignee_id,notification,status,linked_reference)" +
        " VALUES (1,'"+userID+"','"+workerName+"','"+reqbody.user_id+"','"+reqbody.notification+"','new','"+reqID+"')";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.getAllNotifications = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT * FROM dbo.[notification] WHERE status='new' AND notify_assignee_id='"+userID+"'";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback(result.recordset);
        }
    });
};

exports.getNotificationCount = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT COUNT(notification_id) AS count FROM dbo.[notification] WHERE status='new' AND notify_assignee_id='"+userID+"'";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback(result.recordset[0]);
        }
    });
};

exports.readNotification = function(notifyID,callback){
    // query to the database and get the records
    var query = "UPDATE dbo.[notification] SET status='opened' WHERE notification_id='"+notifyID+"'";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};


exports.deleteNotification = function(notifyID,callback){
    // query to the database and get the records
    var query = "UPDATE dbo.[notification] SET status='removed' WHERE notification_id='"+notifyID+"'";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.acceptNotification = function(notifyID,callback){
    // query to the database and get the records
    var query = "UPDATE dbo.[notification] SET status='accepted' WHERE notification_id='"+notifyID+"'";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};