'use strict'

const express=require('express');
var router=express.Router();
const session = require('express-session');

const project = require("../Models/project");
const projectstages = require("../Models/ProjectStage");

const successRES = {
    status : "200",
    statusText : "success"
}

const failureRES = {
    status : "500",
    statusText : "failed"
}

router.post('/addproject',(req,res)=>{
    const reqbody = req.body;
    project.insertNewProjectDetails(req.session.client,reqbody,function (data) {
        if(data == "success") {
            project.getNewProject(function (data) {
                var successFlag = false;
                for (var x in reqbody.stages) {
                    if (reqbody.stages[x].selected == true) {
                        projectstages.insertProjectStages(data.project_id,reqbody.stages[x],function (data) {
                            if(data == "success"){
                                successFlag = true;
                            }
                            else{
                                successFlag = false;
                            }
                        });
                    }
                }
                if(successFlag == true){
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
});


module.exports = router;
