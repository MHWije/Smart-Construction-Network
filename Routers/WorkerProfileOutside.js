'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();

const sql = require('mssql');
const db = require("../DB_Connection/db");
var request = new sql.Request(db.conn);

//sentimentalAnalys
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

const user = require("../Models/user");
const worker = require("../Models/worker");
const skill = require("../Models/skill");
const expr = require("../Models/experience");
const feedback = require("../Models/feedback");
const friend = require("../Models/friend_request");
const notify = require("../Models/notification");
const certification = require("../Models/certification");

const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}

router.post('/userinfo',(req,res)=>{
        user.getAllUserDetails(req.body.user_id,function (userData) {
            worker.getAllWorkerDetails(req.body.user_id,function (workerData) {
                var data = {
                    "userdata" : userData,
                    "workerdata" : workerData
                }
                res.json(data);
            });
        });
});

//Skills
router.post('/skills',(req,res)=>{
        skill.getAllWorkerSkills(req.body.worker_id,function (data) {
            if(data)
                res.json(data);
        });
});


router.post('/endorseSkill',(req,res)=>{
    var reqbody = req.body;
    skill.endorse(reqbody,function (data) {
        if(data == "success")
            res.json(successRES);
        else
            res.json(failureRES);
    });
});


//Experience
router.post('/experience',(req,res)=>{
        expr.getAllWorkerExprs(req.body.worker_id,function (data) {
            if(data)
                res.json(data);
        });
});

router.post('/endorseExperience',(req,res)=>{
    var reqbody = req.body;
    expr.endorse(reqbody,function (data) {
        if(data == "success")
            res.json(successRES);
        else
            res.json(failureRES);
    });
});

// Feedbacks related
router.post('/feedbacks',(req,res)=>{
        feedback.getAllWorkerFeedbacks(req.body.worker_id,function (data) {
            if(data)
                res.json(data);
        });
});


router.post('/addCustomerFeedback', (req, res) => {

    const result = req.body;
    var commentAnalyse = sentiment.analyze(result.comment);
    var totalRate = result.rate + commentAnalyse.score;
    console.dir(totalRate,'   ',result);

    var sql = "INSERT INTO feedback(worker_id,client_id,customer_rate,comment) VALUES ('"+result.workerID+"','"+req.session.client+"','"+result.rate+"','"+result.comment+"')";
    request.query(sql, function (err, recordset) {
        if (err)      // ... error checks
            console.log('Database connection error :', err);
        res.send( {token: 'success'});
    });

    request.query(`UPDATE worker SET rating = rating + ${totalRate} WHERE worker_id=${result.workerID} `, function (err, recordset) {
        if (err)      // ... error checks
            console.log('Database connection error');

        console.dir('Updated rate value');
    });
});




//Friend Request Handling
router.post('/addFriend',(req,res)=>{
    friend.insertFriendRequest(req.session.worker,req.body,function (data) {
        if(data == "success"){
            friend.getNewRequest(function (requestData) {
                user.getUserFullName(req.session.userID,function (fullname) {
                    notify.insertNotification(req.session.userID,fullname,requestData.request_id,req.body,function (notifyData) {
                        if(notifyData == "success"){
                            res.json(successRES);
                        }
                        else {
                            res.json(failureRES);
                        }
                    })
                });
            });
        }
        else
            res.json(failureRES);
    });
});


router.post('/friendStatus',(req,res)=>{
    friend.getFriendStatus(req.session.worker,req.body,function (data) {
            res.json(data);
    });
});

router.post('/unFriend',(req,res)=>{
    friend.UnFriend(req.body.reqID,function (data) {
        if(data == "success")
            res.json(successRES);
    });
});



// Certifications related
router.post('/certifications',(req,res)=>{
        certification.getAllWorkerCertification(req.body.worker_id,function (data) {
            if(data)
                res.json(data);
        });
});


module.exports = router;