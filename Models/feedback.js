'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);


exports.getAllWorkerFeedbacks = function(workerID,callback){

    var query = "SELECT * FROM dbo.[feedback] WHERE worker_id ="+workerID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset);
        }
    });
};