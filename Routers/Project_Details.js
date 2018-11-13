'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();
const sql = require('mssql');
const db = require("../DB_Connection/db");
var request = new sql.Request(db.conn);

const project = require("../Models/project");
const stage = require("../Models/ProjectStage");
const user = require("../Models/user");


const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}


//
router.get('/workerSearch', (req, res) => {

    var expyears = parseInt(req.query.years);

    user.getUserCity(req.session.userID,function (cityData){
        if (req.query.ex_years == 'true' && (req.query.qualification == 'false' || req.query.qualification == undefined) && (req.query.price == 'false' || req.query.price == undefined)) {
            //console.log("1");
            var sql = "select TOP 3 u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username,u.gender,u.nic," +
                "u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating " +
                "from dbo.[user] u LEFT JOIN worker w ON u.user_id=w.user_id WHERE w.job_category='"+req.query.field+"' " +
                "AND u.p_city='"+cityData.p_city+"' AND w.experience_years='"+expyears+"' AND w.fee_type='Daily' ORDER BY w.rating DESC";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
            });
        }
        else if ((req.query.ex_years == 'false' || req.query.ex_years == undefined) && req.query.qualification == 'true' && (req.query.price == 'false' || req.query.price == undefined)) {
            //console.log("2");
            var sql = "select TOP 3 u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username," +
                "u.gender,u.nic,u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating,c.certification " +
                "FROM dbo.[user] u, worker w LEFT JOIN certification c ON w.worker_id = c.worker_id " +
                "WHERE u.user_id=w.user_id AND w.job_category='"+req.query.field+"' AND w.fee_type='Daily' AND u.p_city='"+cityData.p_city+"' AND c.certification IS NOT NULL " +
                "ORDER BY w.rating DESC ";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
            });
        }

        else if ((req.query.ex_years == 'false' || req.query.ex_years == undefined) && (req.query.qualification == 'false' || req.query.qualification == undefined) && req.query.price == 'true') {
            //console.log("3");
            var sql = "select TOP 3 u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username,u.gender,u.nic," +
                "u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating " +
                "from dbo.[user] u LEFT JOIN worker w ON u.user_id=w.user_id WHERE w.job_category='"+req.query.field+"' " +
                "AND u.p_city='"+cityData.p_city+"' AND w.fee_type='Daily' ORDER BY w.fee ASC ";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
            });
        }

        else if (req.query.ex_years == 'true' && req.query.qualification == 'true' && (req.query.price == 'false' || req.query.price == undefined)) {
            //console.log("4");
            var sql = "select TOP 3 u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username,u.gender,u.nic," +
                "u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating,c.certification " +
                "FROM dbo.[user] u, worker w LEFT JOIN certification c ON w.worker_id = c.worker_id " +
                "WHERE u.user_id=w.user_id AND w.job_category='"+req.query.field+"'  AND u.p_city='"+cityData.p_city+"' " +
                "AND w.experience_years ='"+expyears+"' AND w.fee_type='Daily' AND  c.certification IS NOT NULL ORDER BY w.rating DESC ";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
            });
        }

        else if ((req.query.ex_years == 'false' || req.query.ex_years == undefined) && req.query.qualification == 'true' && req.query.price == 'true') {
            //console.log("5");
            var sql = "select TOP 3 u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username,u.gender," +
                "u.nic,u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating,c.certification " +
                "FROM dbo.[user] u, worker w LEFT JOIN certification c ON w.worker_id = c.worker_id " +
                "WHERE u.user_id=w.user_id AND w.job_category='"+req.query.field+"' AND w.fee_type='Daily' AND u.p_city='"+cityData.p_city+"' " +
                "AND  c.certification IS NOT NULL ORDER BY w.fee ASC ";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
            });
        }

        else if (req.query.ex_years == 'true' && req.query.qualification == 'true' && req.query.price == 'true') {
            //console.log("6");
            var sql = "select TOP 3  u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username,u.gender,u.nic," +
                "u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating,c.certification " +
                "FROM dbo.[user] u, worker w LEFT JOIN certification c ON w.worker_id = c.worker_id " +
                "WHERE u.user_id=w.user_id AND w.job_category='"+req.query.field+"'  AND u.p_city='"+cityData.p_city+"' " +
                "AND w.experience_years ='"+expyears+"' AND w.fee_type='Daily' AND  c.certification IS NOT NULL ORDER BY w.fee ASC ";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
            });
        }
        else if (req.query.ex_years == 'true' && (req.query.qualification == 'false'||req.query.qualification == undefined ) && req.query.price == 'true') {
            //console.log("7");
            var sql = "select TOP 3  u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username,u.gender,u.nic," +
                "u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating,c.certification " +
                "FROM dbo.[user] u, worker w LEFT JOIN certification c ON w.worker_id = c.worker_id " +
                "WHERE u.user_id=w.user_id AND w.job_category='"+req.query.field+"'  AND u.p_city='"+cityData.p_city+"' " +
                "AND w.experience_years ='"+expyears+"' AND w.fee_type='Daily' ORDER BY w.fee ASC ";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
            });
        }

        else {
            //console.log("8");
            var sql = "select TOP 3 u.user_id,w.worker_id,u.first_name,u.middle_name,u.last_name,u.username,u.gender,u.nic," +
                "u.p_city,u.email,u.mobile_number,u.display_picture,w.job_category,w.experience_years,w.fee_type,w.fee,w.rating,c.certification " +
                "FROM dbo.[user] u, worker w LEFT JOIN certification c ON w.worker_id = c.worker_id " +
                "WHERE u.user_id=w.user_id AND w.job_category='"+req.query.field+"' AND w.fee_type='Daily' and u.p_city='"+cityData.p_city+"'" +
                "ORDER BY w.rating DESC ";
            request.query(sql, function (err, recordset) {
                if (err)      // ... error checks
                    console.log('Database connection error :', err);
                res.send(JSON.stringify(recordset.recordset));
                //console.log(recordset.recordset);
            });
        }
    });
});
//


router.get('/projectinfo',(req,res)=>{
    project.getAllProjectetails(req.session.client,function (data) {
        res.json(data);

    });
});
//

router.post('/projectStageInfo',(req,res)=>{
    var reqbody = req.body;
    stage.getProjectStages(reqbody,function (data) {
        res.json(data);
    });
});


module.exports = router;