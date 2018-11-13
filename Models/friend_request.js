'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);

exports.insertFriendRequest = function(workerID,reqbody,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[friend_request] (sender_id,receiver_id,status) VALUES ('" + workerID + "','" + reqbody.receiver + "','new')";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};


exports.getFriendStatus = function(workerID,reqbody,callback){
    // query to the database and get the records
    var query = "SELECT request_id,status FROM dbo.[friend_request] WHERE (sender_id='"+workerID+"' AND receiver_id='"+reqbody.worker_id+"')" +
        " OR (sender_id='"+reqbody.worker_id+"' AND receiver_id='"+workerID+"')";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback(result.recordset[0]);
        }
    });
};

exports.UnFriend = function(reqID,callback){
    // query to the database and get the records
    var query = "DELETE FROM dbo.[friend_request] WHERE request_id='"+reqID+"'";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.getNewRequest = function(callback){
    // query to the database and get the records
    request.query('SELECT MAX(request_id) AS request_id FROM dbo.[friend_request]', function (err, recordset) {
        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.acceptFriend = function(reqID,callback){
    // query to the database and get the records
    var query = "UPDATE dbo.[friend_request] SET status='friend' WHERE request_id='"+reqID+"'";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};