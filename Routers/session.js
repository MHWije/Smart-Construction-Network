'use strict'

const express=require('express');
const session = require('express-session');
var router=express.Router();

const user = require("../Models/user");

router.get('/loggeduser',(req,res)=>{
    if(req.session.userID){
        user.getLoggedUserDetails(req.session.userID,function (LoggedUserDetails) {
            var data ={
                status : "200",
                statusText : "authenticated",
                username : LoggedUserDetails.username
            }
            res.json(data);
        });
    }
    else{
        var data ={
            status : "401",
            statusText : "unauthenticated"
        }
        res.json(data);
    }

});


router.get('/logout',(req,res)=>{
    if(req.session.userID){
        req.session.destroy(function (err) {
            if(err){
                var data ={
                    status : "500",
                    statusText : "server error"
                }
                res.json(data);
            }
            var data ={
                status : "200",
                statusText : "success",
            }
            res.json(data);
        });
    }

});

module.exports = router;