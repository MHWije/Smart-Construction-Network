'use strict'

const express=require('express');
var router=express.Router();

const user = require("../Models/user");
const worker = require("../Models/worker");
const client = require("../Models/client");

const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}

router.post('/signup',(req,res)=>{
    const reqbody = req.body;

    user.insertUser(reqbody,function (data) {
        if(data == "success"){
            user.getNewUser(function (data) {
                if(reqbody.usertype == "worker"){
                    worker.insertWorker(data.user_id,reqbody.jobcategory,function (data) {
                        if(data == "success"){
                            res.json(successRES);
                        }
                        else{
                            res.json(failureRES);
                        }
                    });
                }
                else if(reqbody.usertype == "client"){
                    client.insertClient(data.user_id,reqbody.occupation,function (data) {
                        if(data == "success"){
                            res.json(successRES);
                        }
                        else{
                            res.json(failureRES);
                        }
                    });
                }
                else{
                    res.json(failureRES);
                }
            });
        }
        else{
            res.json(failureRES);
        }
    });
});

module.exports = router;