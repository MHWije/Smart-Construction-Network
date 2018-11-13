'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);


exports.getAllWorkerExprs = function(workerID,callback){
    // query to the database and get the records
    var query = "SELECT * FROM dbo.[experience] WHERE worker_id ="+workerID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset);
        }
    });
};

exports.insertExpr = function(workerID,reqbody,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[experience] (worker_id,experience,year,endorsement_count) VALUES ('"
        + workerID + "','" + reqbody.expr + "','" + reqbody.yearexpr + "',0)";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.deleteExpr = function(reqbody,callback){
    var query = "DELETE FROM dbo.[experience] WHERE experience_id="+reqbody.exprID;
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.endorse = function(reqbody,callback){
    var query1 = "SELECT endorsement_count FROM dbo.[experience] WHERE experience_id="+reqbody.exprID;
    request.query(query1, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            var newCount = result.recordset[0].endorsement_count + 1;
            var query = "UPDATE dbo.[experience] SET endorsement_count='"+newCount+"' WHERE experience_id="+reqbody.exprID;
            request.query(query, function (err, result) {
                if (err){
                    console.log(err);
                }
                else{
                    callback("success");
                }
            });
        };
    });
};