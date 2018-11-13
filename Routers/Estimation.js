'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();
const sql = require('mssql');
const db = require("../DB_Connection/db");
var request = new sql.Request(db.conn);

const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}

/*  Slab Estimation */
router.get('/getAverageSLAB', (req, res) => {
    var sql = "SELECT AVG(w.fee) AS mean FROM dbo.[user] u LEFT JOIN worker w ON u.user_id=w.user_id WHERE  w.fee_type = 'Per Square Feet' AND w.job_category = '" +
        req.query.field + "' AND w.fee > 0";
    var total;
    request.query(sql, function (err, result) {
        if (err) throw err;
        var mean = result.recordset[0].mean;
        total = (req.query.width * req.query.height * req.query.length) * mean;
        res.send({
            data: total
        });
    });
});

router.get('/getAverageTILE', (req, res) => {
    var sql = "SELECT AVG(w.fee) AS mean FROM dbo.[user] u LEFT JOIN worker w ON u.user_id=w.user_id WHERE  w.fee_type = 'Per Square Feet' AND w.job_category = '" +
        req.query.field + "' AND w.fee > 0";
    var total;
    request.query(sql, function (err, result) {
        if (err) throw err;
        var mean = result.recordset[0].mean;
        total = (req.query.width * req.query.length) * mean;
        res.send({
            data: total
        });
    });
});


router.get('/getAverageProof', (req, res) => {
    var sql = "SELECT AVG(w.fee) AS mean FROM dbo.[user] u LEFT JOIN worker w ON u.user_id=w.user_id WHERE  w.fee_type = 'Per Square Feet' AND w.job_category = '" +
        req.query.field + "' AND w.fee > 0";
    var total;
    request.query(sql, function (err, result) {
        if (err) throw err;
        var mean = result.recordset[0].mean;
        total = (req.query.width * req.query.length) * mean;
        res.send({
            data: total
        });
    });
});

module.exports = router;