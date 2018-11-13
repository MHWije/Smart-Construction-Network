'use strict'

const express=require('express');
var router=express.Router();
const session = require('express-session');

const stageWRequest = require("../Models/stage_worker_request");


const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}

router.post('/workerRequest',(req,res)=>{
    const reqbody = req.body;
    stageWRequest.insertStageWorkerRequestDetails(req.session.client,reqbody,function (data) {
        if(data == "success") {
            res.json(successRES);
        }
        else{
            res.json(failureRES);
        }
    });
});


module.exports = router;