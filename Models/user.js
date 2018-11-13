'use strict'

const sql = require('mssql');
const db = require("../DB_Connection/db");

var exports = module.exports = {};
var request = new sql.Request(db.conn);

exports.getLoginCredentials = function(username,password,callback){
    //create Request object
    request.input('username',username);
    request.input('password',password);

    // query to the database and get the records
    request.query('SELECT user_id,username,password,user_type FROM dbo.[user] WHERE username=@username AND password=@password', function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.getNewUser = function(callback){
    // query to the database and get the records
    request.query('SELECT MAX(user_id) AS user_id FROM dbo.[user]', function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.insertUser = function(reqbody,callback){
    // query to the database and get the records
    var query = "INSERT INTO dbo.[user] (first_name,middle_name,last_name,gender,dob,email,p_addressline1,p_addressline2," +
        "p_city,p_zip,p_country,c_addressline1,c_addressline2,c_city,c_zip,c_country,home_number," +
        "mobile_number,username,password,user_type,isActive) VALUES ('" + reqbody.firstname + "','" + reqbody.middlename
        + "','" + reqbody.lastname + "','" + reqbody.gender + "','" + reqbody.bday + "','" + reqbody.email
        + "','" + reqbody.paddress1 + "','" + reqbody.paddress2 + "','" + reqbody.pcity + "','" + reqbody.pzipcode
        + "','" + reqbody.pcountry + "','" + reqbody.caddress1 + "','" + reqbody.caddress2 + "','" + reqbody.ccity
        + "','" + reqbody.czipcode + "','" + reqbody.ccountry + "','" + reqbody.hometp + "','" + reqbody.mobiletp
        + "','" + reqbody.username + "','" + reqbody.psw + "','" + reqbody.usertype + "',0)";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};


exports.getLoggedUserDetails = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT username FROM dbo.[user] WHERE user_id ="+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.getAllUserDetails = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT * FROM dbo.[user] WHERE user_id ="+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.updateUser = function(userID,reqbody,callback){
    // query to the database and get the records
    var query = "Update dbo.[user] SET first_name='"+reqbody.firstname+"',middle_name='"+reqbody.middlename+"'," +
        "last_name='" + reqbody.lastname +"',nic='"+reqbody.nic+"',gender='" + reqbody.gender + "',dob='" + reqbody.bday + "',email='" + reqbody.email
        +"',p_addressline1='"+ reqbody.paddress1 +"',p_addressline2='"+reqbody.paddress2+"',p_city='" + reqbody.pcity
        +"',p_zip='"+ reqbody.pzipcode+"',p_country='"+reqbody.pcountry+"',c_addressline1='"+reqbody.caddress1
        +"',c_addressline2='"+reqbody.caddress2+"',c_city='"+reqbody.ccity+"',c_zip='"+reqbody.czipcode
        +"',c_country='"+reqbody.ccountry+"',language='"+reqbody.language+"',nationality='"+reqbody.nationality
        +"',religion='"+reqbody.religion+"',home_number='"+reqbody.hometp+"',mobile_number='"+reqbody.mobiletp+"' WHERE user_id='"+userID+"'";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.changePassword = function(userID,reqbody,callback){
    // query to the database and get the records
    var query = "Update dbo.[user] SET password='"+reqbody.password+"' WHERE user_id='"+userID+"'";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

exports.getPassword = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT password FROM dbo.[user] WHERE user_id='"+userID+"'";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback(result.recordset[0]);
        }
    });
};


exports.deactivateAccount = function(userID,callback){
    // query to the database and get the records
    var query = "Update dbo.[user] SET isActive=1 WHERE user_id='"+userID+"'";

    request.query(query, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            callback("success");
        }
    });
};

//get user full name
exports.getUserFullName = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT first_name,middle_name,last_name FROM dbo.[user] WHERE user_id ="+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            var fullname;
            var nameOBJ = recordset.recordset[0];

            if(nameOBJ.middle_name){
                fullname = nameOBJ.first_name+" "+nameOBJ.middle_name+" "+nameOBJ.last_name;
                callback(fullname);
            }
            else{
                fullname = nameOBJ.first_name+" "+nameOBJ.last_name;
                callback(fullname);
            }
        }
    });
};

exports.getCombinedWorkerDetails = function(userID,callback){
    // query to the database and get the records
    var query = "SELECT w.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.email,u.p_city,u.p_country" +
        ",u.language,u.display_picture,w.job_category " +
        "FROM dbo.[worker] w,dbo.[user] u WHERE u.user_id=w.user_id AND u.user_type='worker' AND u.user_id="+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};

exports.getUserCity = function(userID,callback){

    // query to the database and get the records
    var query = "SELECT p_city,c_city FROM dbo.[user] WHERE user_id ="+userID;
    request.query(query, function (err, recordset) {

        if (err){
            console.log(err);
        }
        else{
            callback(recordset.recordset[0]);
        }
    });
};