'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);



exports.insertNewProjectDetails = function(clientID,reqbody,callback) {
    // query to the database and get the records
    var query = "INSERT INTO dbo.[project] (owner_id,category,planned_start,planned_end,description,status) VALUES ('" + clientID + "','" + reqbody.category
        + "','" + reqbody.planned_date + "','" + reqbody.planned_end_date + "','" + reqbody.desc + "','new')";

    request.query(query, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback("success");
        }
    });
};

exports.getNewProject = function(callback){
    // query to the database and get the records
    request.query('SELECT MAX(project_id) AS project_id FROM dbo.[project]', function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

///
exports.getAllProjectetails = function(client_ID,callback){


    // query to the database and get the records
    var query = "SELECT * FROM dbo.[project] WHERE owner_id ="+client_ID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset);
        }
    });
};
