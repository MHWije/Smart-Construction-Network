'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);


exports.getAllWorkerCertification = function(workerID,callback){
    //query to the database and get the records
    var query = "SELECT * FROM dbo.[certification] WHERE worker_id ="+workerID;
    request.query(query, function (err, recordset) {
        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset);
        }
    });
};

exports.insertCertification = function(workerID,reqbody,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[certification] (worker_id,certification,provider," +
        "from_date,to_date,expire_status,certification_path,endorsement_count) VALUES ('"
        + workerID + "','" + reqbody.certification + "','" + reqbody.provider + "','"
        + reqbody.fromdate + "','" + reqbody.todate + "','" + reqbody.expire + "','"+ reqbody.path + "',0)";
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            request.query("UPDATE dbo.[worker] SET rating = rating + 5 WHERE worker_id='"+workerID+"'", function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error');

            });
            callback("success");
        }
    });
};

exports.deleteCertification = function(reqbody,callback){

    var query = "DELETE FROM dbo.[certification] WHERE certification_id="+reqbody.certificateID;
    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};