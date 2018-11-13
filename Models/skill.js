'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);


exports.getAllWorkerSkills = function(workerID,callback){
    // query to the database and get the records
    var query = "SELECT * FROM dbo.[skill] WHERE worker_id ="+workerID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset);
        }
    });
};

exports.insertSkill = function(workerID,reqbody,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[skill] (worker_id,skill,endorsement_count) VALUES ('" + workerID + "','" + reqbody.skill + "',0)";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.deleteSkill = function(reqbody,callback){

    var query = "DELETE FROM dbo.[skill] WHERE skill_id="+reqbody.skillID;
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
    var query1 = "SELECT endorsement_count FROM dbo.[skill] WHERE skill_id="+reqbody.skillID;
    request.query(query1, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            var newCount = result.recordset[0].endorsement_count + 1;
            var query = "UPDATE dbo.[skill] SET endorsement_count='"+newCount+"' WHERE skill_id="+reqbody.skillID;
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