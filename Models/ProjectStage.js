'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);



exports.insertProjectStages = function(projID,reqbody,callback) {
    var query = "INSERT INTO dbo.[project_stage] (project_id,stage_id,stage_order,status,percentage) VALUES ('" + projID +
        "','" + reqbody.id + "','" + reqbody.order + "','new', 0)";
    request.query(query, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback("success");
        }
    });
};

exports.getProjectStages = function(reqbody,callback){
    // query to the database and get the records
    var query = "SELECT * FROM dbo.[stage] s FULL OUTER JOIN dbo.[project_stage] p ON s.stage_id = p.stage_id WHERE p.project_id="+reqbody.pid;
    request.query(query, function (err, recordset) {
        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset);
        }
    });
};
