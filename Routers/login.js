'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();

const user = require("../Models/user");
const worker = require("../Models/worker");
const client = require("../Models/client");


router.get('/authenticateUser/:username/:password',(req,res)=>{

    var username = req.params.username;
    var password = req.params.password;

    user.getLoginCredentials(username,password,function (data) {
        if(data){
            if(data.user_type == "worker"){
                worker.getWorkerID(data.user_id,function (workerdata) {
                    req.session.userID = data.user_id;
                    req.session.worker = workerdata.worker_id;
                    res.json(data);
                });
            }
            else if(data.user_type == "client"){
                client.getClientID(data.user_id,function (clientdata) {
                    req.session.userID = data.user_id;
                    req.session.client = clientdata.client_id;
                    res.json(data);
                });
            }
        }
        else{
            res.json("incorrectpsw");
        }
    });

});

module.exports = router;