'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);



exports.insertStageWorkerRequestDetails = function(clientID,reqbody,callback) {
    // query to the database and get the records
    var query = "INSERT INTO dbo.[stage_worker_request] (ps_id,client_id,worker_id,status) VALUES ('" + reqbody.ps_id + "','"
        + clientID + "','" + reqbody.worker_id + "','new')";

    request.query(query, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback("success");
        }
    });
};


