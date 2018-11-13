'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();

const worker = require("../Models/worker");
const user = require("../Models/user");


const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}

router.get('/friendsuggestions',(req,res)=>{
    if(req.session.userID){
        user.getAllUserDetails(req.session.userID,function (userData) {
            worker.getAllWorkerDetails(req.session.userID,function (workerData) {
                worker.getAllWorkers(req.session.worker,userData,workerData,function (data) {
                    res.json(data);
                });
            });
        });
    }
});

router.get('/newsuggestions',(req,res)=>{
    if(req.session.userID){
        user.getAllUserDetails(req.session.userID,function (userData) {
            worker.getAllWorkerDetails(req.session.userID,function (workerData) {
                worker.getNewWorkers(req.session.worker,userData,workerData,function (data) {
                    res.json(data);
                });
            });
        });
    }
});

module.exports = router;