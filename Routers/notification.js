'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();

const notify = require("../Models/notification");
const user = require("../Models/user");
const friend = require("../Models/friend_request");

const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}



router.get('/count',(req,res)=>{
    if(req.session.userID){
        notify.getNotificationCount(req.session.userID,function (data) {
            res.json(data);
        });
    }
});

router.get('/pullAll',(req,res)=>{
    if(req.session.userID){
        notify.getAllNotifications(req.session.userID,function (data) {
            res.json(data);
        });
    }
});

router.post('/assinerInfo',(req,res)=>{
    user.getCombinedWorkerDetails(req.body.userID,function (data) {
        res.json(data);
    });
});


router.post('/acceptFriend',(req,res)=>{
    var reqbody = req.body;
    friend.acceptFriend(reqbody.refID,function (data) {
        if(data == "success"){
            notify.acceptNotification(reqbody.notifyID,function (data) {
                res.json(successRES);
            });
        }
        else {
            res.json(failureRES);
        }
    });
});


router.post('/readNotification',(req,res)=>{
    var reqbody = req.body;
    notify.readNotification(reqbody.notifyID,function (data) {
        if (data == "success")
            res.json(successRES);
        else
            res.json(failureRES);
    });
});

router.post('/deleteNotification',(req,res)=>{
    var reqbody = req.body;
    notify.deleteNotification(reqbody.notifyID,function (data) {
        if (data == "success")
            res.json(successRES);
        else
            res.json(failureRES);
    });
});


module.exports = router;