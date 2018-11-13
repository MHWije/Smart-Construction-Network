'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);

exports.insertWorker = function(userID,jobCategory,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[worker] (user_id,job_category) VALUES ('" + userID + "','" + jobCategory + "')";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.getWorkerID = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT worker_id FROM dbo.[worker] WHERE user_id = "+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.getAllWorkerDetails = function(userID,callback){

    // query to the database and get the records
    var query = "SELECT * FROM dbo.[worker] WHERE user_id ="+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.updateWorker = function(userID,reqbody,callback){
    // query to the database and get the records
    var query = "Update dbo.[worker] SET job_category='"+reqbody.jobcategory+"',fee_type='"+reqbody.feetype+"'," +
        "fee='" + reqbody.fee +"',fee_currency='"+reqbody.feecurrecy+"',bio='" + reqbody.bio + "',experience_years='" + reqbody.experienceyrs
        + "',working_hours_per_day='" + reqbody.workinghrs+"',college='"+ reqbody.college +"',high_school='"+reqbody.school
        +"' WHERE user_id='"+userID+"'";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};



exports.getAllWorkers = function(workerID,userData,workerData,callback){
    // query to the database and get the records
    var query = "SELECT TOP 15 w.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.email,u.display_picture,w.job_category " +
        "FROM dbo.[worker] w,dbo.[user] u " +
        "WHERE u.user_id=w.user_id AND u.user_type='worker' AND u.gender='"+userData.gender+"' AND u.p_city LIKE '"+userData.p_city+"' " +
        "AND w.job_category LIKE '"+workerData.job_category+"' AND worker_id !="+workerID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
            callback("fail");
        }
        else{
            callback(recordset.recordset);
        }
    });
};

exports.getNewWorkers = function(workerID,userData,workerData,callback){
    // query to the database and get the records
    var query = "SELECT TOP 15 w.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.email,u.display_picture,w.job_category " +
        "FROM dbo.[worker] w,dbo.[user] u " +
        "WHERE u.user_id=w.user_id AND u.user_type='worker' AND u.gender='"+userData.gender+"' AND u.p_city NOT LIKE '"+userData.p_city+"' " +
        "AND w.job_category!='"+workerData.job_category+"' AND worker_id !='"+workerID+"' ORDER BY w.rating DESC ";
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
            callback("fail");
        }
        else{
            callback(recordset.recordset);
        }
    });
};