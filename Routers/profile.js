'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();

const user = require("../Models/user");
const worker = require("../Models/worker");
const skill = require("../Models/skill");
const expr = require("../Models/experience");
const feedback = require("../Models/feedback");
const certification = require("../Models/certification");

const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}

router.get('/userinfo',(req,res)=>{
    if(req.session.userID){
        user.getAllUserDetails(req.session.userID,function (userData) {
            worker.getAllWorkerDetails(req.session.userID,function (workerData) {
                var data = {
                    "userdata" : userData,
                    "workerdata" : workerData
                }
                res.json(data);
            });
        });
    }
});

router.post('/userinfo',(req,res)=>{
    const reqbody = req.body;
    user.updateUser(req.session.userID,reqbody,function (data) {
        if(data == "success"){
            worker.updateWorker(req.session.userID,reqbody,function (data) {
                if(data == "success")
                    res.json(successRES);
                else
                    res.json(failureRES);
            });
        }
        else
            res.json(failureRES);
    });
});

router.post('/changepassword',(req,res)=>{
    const reqbody = req.body;
    user.getPassword(req.session.userID,function (data) {
        if(reqbody.currentpsw == data.password){
            user.changePassword(req.session.userID,reqbody,function (data) {
                if(data == "success")
                    res.json(successRES);
                else
                    res.json(failureRES);
            });
        }
        else {
            res.json("Incorrect CurrentPSW");
        }
    });

});

router.get('/deactivate',(req,res)=>{
    user.deactivateAccount(req.session.userID,function (data) {
        if(data == "success")
            res.json(successRES);
        else
            res.json(failureRES);
    });
});


router.get('/skills',(req,res)=>{
    if(req.session.worker){
        skill.getAllWorkerSkills(req.session.worker,function (data) {
            if(data)
                res.json(data);
        });
    }
});


router.post('/addskill',(req,res)=>{
    const reqbody = req.body;
    skill.insertSkill(req.session.worker,reqbody,function (data) {
        if(data == "success"){
            res.json(successRES);
        }
        else {
            res.json(failureRES);
        }
    });
});

router.post('/deleteskill',(req,res)=>{
    const reqbody = req.body;
    skill.deleteSkill(reqbody,function (data) {
        if(data == "success"){
            res.json(successRES);
        }
        else {
            res.json(failureRES);
        }
    });
});


router.get('/experience',(req,res)=>{
    if(req.session.worker){
        expr.getAllWorkerExprs(req.session.worker,function (data) {
            if(data)
                res.json(data);
        });
    }
});


router.post('/addexperience',(req,res)=>{
    const reqbody = req.body;
    expr.insertExpr(req.session.worker,reqbody,function (data) {
        if(data == "success"){
            res.json(successRES);
        }
        else {
            res.json(failureRES);
        }
    });
});

router.post('/deleteexperience',(req,res)=>{
    const reqbody = req.body;
    expr.deleteExpr(reqbody,function (data) {
        if(data == "success"){
            res.json(successRES);
        }
        else {
            res.json(failureRES);
        }
    });
});


// Feedbacks related
router.get('/feedbacks',(req,res)=>{
    if(req.session.worker){
        feedback.getAllWorkerFeedbacks(req.session.worker,function (data) {
            if(data)
                res.json(data);
        });
    }
});

//Upload Profile Pic
router.post('/profilepic',(req,res)=>{
    console.log(req.files);
});

//Certificate related
router.get('/certifications',(req,res)=>{
    if(req.session.worker){
        certification.getAllWorkerCertification(req.session.worker,function (data) {
            if(data)
                res.json(data);
        });
    };
});


router.post('/addCertificate',(req,res)=>{
    if(req.session.worker){
        const reqbody = req.body;
        certification.insertCertification(req.session.worker,reqbody,function (data) {
            if(data == "success"){
                res.json(successRES);
            }
            else {
                res.json(failureRES);
            }
        });
    };
});

router.post('/deleteCertificate',(req,res)=>{
    if(req.session.worker){
        const reqbody = req.body;
        certification.deleteCertification(reqbody,function (data) {
            if(data == "success"){
                res.json(successRES);
            }
            else {
                res.json(failureRES);
            }
        });
    };
});


module.exports = router;