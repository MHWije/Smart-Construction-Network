'use strict'

//import sql server
var sql = require('mssql');

//import important files
var dbconfig = require("../Configs/Config");


// connect to your database
exports.conn = sql.connect(dbconfig.config, function (err) {

    //if error, log the error to console else log successful message
    if (err){
        console.log(err);
    }
    else {
        console.log("Database Connection Successful !!...")
    }

});