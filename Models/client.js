'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);

exports.insertClient = function(userID,Occupation,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[client] (user_id,occupation) VALUES ('" + userID + "','" + Occupation + "')";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.getClientID = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT client_id FROM dbo.[client] WHERE user_id = "+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};