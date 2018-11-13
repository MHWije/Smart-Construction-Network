/////////////// Error Handling //////////////////////////////////////////////////////////////////

function SetError(errorList,elementID,errortxt){
    var node = document.createElement("LI");
    if(elementID === "")
        var textnode = document.createTextNode(errortxt);
    else
        var textnode = document.createTextNode(elementID +" : "+errortxt);
    node.appendChild(textnode);
    document.getElementById(errorList).appendChild(node);
}

function RemoveErrors(errorList) {
    var list = document.getElementById(errorList);
    while (list.hasChildNodes()) {
        list.removeChild(list.childNodes[0]);
    }
}

function HasErrors(errorList){
    var hasErrs = document.getElementById(errorList).hasChildNodes();
    return hasErrs;
}

/////////////// Error Handling //////////////////////////////////////////////////////////////////

/////////////// Successful messages //////////////////////////////////////////////////////////////////

function SetSuccessMsg(successMsgList,elementID,msg){
    var node = document.createElement("LI");
    if(elementID === "")
        var textnode = document.createTextNode(msg);
    else
        var textnode = document.createTextNode(elementID +" : "+msg);
    node.appendChild(textnode);
    document.getElementById(successMsgList).appendChild(node);
}

function RemoveSuccessMsg(successMsgList) {
    var list = document.getElementById(successMsgList);
    while (list.hasChildNodes()) {
        list.removeChild(list.childNodes[0]);
    }
}
/////////////// Successful messages //////////////////////////////////////////////////////////////////

function onloading(){
    document.getElementById("section2").style.display = "none";
    document.getElementById("section3").style.display = "none";
    document.getElementById("section4").style.display = "none";
    document.getElementById("section5").style.display = "none";
    document.getElementById("section6").style.display = "none";

    //fill years datalist
    for (var i = 1990; i < 2100; i++) {
        var option = document.createElement('option');
        option.value = i;
        document.getElementById('years').appendChild(option);
    };
}

function ToggleProfileNav(show,hide1,hide2,hide3,hide4,hide5) {
    //remove messages
    RemoveErrors("errorList1");
    //RemoveErrors("errorList2");
    RemoveErrors("errorList4");
    RemoveErrors("errorList6");
    RemoveSuccessMsg("successmsgList");

    //list items
    document.getElementById("list"+show).classList.add("active");
    document.getElementById("list"+hide1).classList.remove("active");
    document.getElementById("list"+hide2).classList.remove("active");
    document.getElementById("list"+hide3).classList.remove("active");
    document.getElementById("list"+hide4).classList.remove("active");
    document.getElementById("list"+hide5).classList.remove("active");

    //sections
    document.getElementById("section"+show).style.display = "block";
    document.getElementById("section"+hide1).style.display = "none";
    document.getElementById("section"+hide2).style.display = "none";
    document.getElementById("section"+hide3).style.display = "none";
    document.getElementById("section"+hide4).style.display = "none";
    document.getElementById("section"+hide5).style.display = "none";
}

var app = angular.module('WorkerProfileApp',[]);

//Session Handling Controller
app.controller('HeaderController',function ($scope,$http){

    /////////////////  User Login and Authentication /////////////////////////////////
    $http.get('/session/loggeduser')
        .then(function(res){
            if(res.data.status == "200"){
                $scope.loggedUsername = res.data.username;
            }
            if(res.data.status == "401"){
                window.location.href = "index.html";
                alert("Your session is expired. Please sign in");
            }
        });

    $scope.logout = function () {
        $http.get('/session/logout')
            .then(function(res){
                if(res.data.status == "200"){
                    window.location.href = "index.html";
                }
                if(res.data.status == "500"){
                    alert("Logout process failed due to some problems. Please be patient.");
                }
            });
    }
    //////////////////  User Login and Authentication /////////////////////////////////

    /////////// Notifications ///////////////////
    $http.get('/notify/count')
        .then(function(res){
            if(res.data){
                var x = document.getElementById("notifyCount").setAttribute('data-badge',res.data.count);
            }
        });
    /////////// Notifications ///////////////////
});
//End Session Handling controller

//Summary
app.controller('WPUserSummaryController',function ($scope,$http) {
    $http.get('/profile/userinfo')
        .then(function (res) {
            if (res.data != "") {
                var usersummarydetails = res.data.userdata;
                var workersummarydetails = res.data.workerdata;
                $scope.summaryfname = usersummarydetails.first_name;
                $scope.summarymname = usersummarydetails.middle_name;
                $scope.summarylname = usersummarydetails.last_name;
                $scope.summarydisplaypic = usersummarydetails.display_picture;
                $scope.summaryjobcategory = workersummarydetails.job_category;
                $scope.summaryrating = workersummarydetails.rating;
                if (workersummarydetails.allocated)
                    $scope.summaryallocated = "Allocated";
                else
                    $scope.summaryallocated = "Not-Allocated";

            }
            else {
                alert("Something went wrong !");
            }
        });


    //Image uploading
    $scope.fd = new FormData();
    $scope.createFormData = function (files) {
        $scope.fd.append('file', files[0]);
    }

    $scope.UploadImage = function () {
        var data = {
            'file' : $scope.fd
        }
        $http({
            method : "POST",
            url : "/profile/profilepic",
            data: data
        }).then(function mySuccess(response) {
            window.scrollTo(0, 300);
        }, function myError(response) {
            alert("Something went wrong !!");
        });
    }
});


//Basic info section related
app.controller('WPUserInfoController',function ($scope,$http){

    $http.get('/profile/userinfo')
        .then(function(res){
            if(res.data != ""){
                var userdetails = res.data.userdata;
                var workerdetails = res.data.workerdata;
                $scope.Wfirstname = userdetails.first_name;
                $scope.Wmiddlename = userdetails.middle_name;
                $scope.Wlastname = userdetails.last_name;
                $scope.Wgender = userdetails.gender;
                $scope.Wbday = (userdetails.dob).substring(0,10);
                document.getElementById("Wbday").value = (userdetails.dob).substring(0,10);
                $scope.Wnic = userdetails.nic;
                $scope.Wemail = userdetails.email;
                $scope.Wjobcategory = workerdetails.job_category;
                //document.getElementById("Wyrsexperince").value = workerdetails.experience_years;
                $scope.Wyrsexperince = ""+workerdetails.experience_years;
                $scope.Wfeetype = workerdetails.fee_type;
                $scope.Wfee = workerdetails.fee;
                $scope.Wfeecurrency = workerdetails.fee_currency;
                //document.getElementById("Wworkinghours").value = workerdetails.working_hours_per_day;
                $scope.Wworkinghours = ""+workerdetails.working_hours_per_day;
                $scope.Wcaddressline1 = userdetails.c_addressline1;
                $scope.Wcaddressline2 = userdetails.c_addressline2;
                $scope.Wccity = userdetails.c_city;
                $scope.Wccountry = userdetails.c_country;
                $scope.Wczipcode = userdetails.c_zip;
                $scope.Wpaddressline1 = userdetails.p_addressline1;
                $scope.Wpaddressline2 = userdetails.p_addressline2;
                $scope.Wpcity = userdetails.p_city;
                $scope.Wpcountry = userdetails.p_country;
                $scope.Wpzipcode = userdetails.p_zip;
                $scope.Wmobile = userdetails.mobile_number;
                $scope.Whome = userdetails.home_number;
                $scope.Wcollege = workerdetails.college;
                $scope.Wschool = workerdetails.high_school;
                $scope.Wlanguage = userdetails.language;
                $scope.Wnationality = userdetails.nationality;
                $scope.Wreligion = userdetails.religion;
                $scope.Wbio = workerdetails.bio;
            }
            else{
                alert("Something went wrong !");
            }
        });


    $scope.SaveUserInfo = function () {
        RemoveErrors("errorList1");
        if(!$scope.Wfirstname)
            SetError("errorList1","First Name","This field is required");
        if(!$scope.Wlastname)
            SetError("errorList1","Last Name","This field is required");
        if(!$scope.Wgender)
            SetError("errorList1","Gender","This field is required");
        if(!$scope.Wbday)
            SetError("errorList1","Birth Date","This field is required");
        if(!$scope.Wemail)
            SetError("errorList1","Email","This field is required");
        if(!$scope.Wjobcategory)
            SetError("errorList1","Job Category","This field is required");
        if(!$scope.Wcaddressline1)
            SetError("errorList1","Current Address Line 1","This field is required");
        if(!$scope.Wccity)
            SetError("errorList1","Current Address City","This field is required");
        if(!$scope.Wccountry)
            SetError("errorList1","Current Address Country","This field is required");
        if(!$scope.Wczipcode)
            SetError("errorList1","Current Address Zip Code","This field is required");
        if(!$scope.Wmobile)
            SetError("errorList1","Mobile Phone","This field is required");
        if(isNaN($scope.Wmobile))
            SetError("errorList1","Mobile Phone","Only numbers allowed");
        if($scope.Whome && isNaN($scope.Whome))
            SetError("errorList1","Home Phone","Only numbers allowed");
        if($scope.Wfee && isNaN($scope.Wfee))
            SetError("errorList1","Fee","Only numbers allowed");


        if(HasErrors("errorList1")==true){
            window.scrollTo(0, 300);
        }
        else{
            var data={
                'firstname': $scope.Wfirstname,
                'middlename': $scope.Wmiddlename,
                'lastname': $scope.Wlastname,
                'gender': $scope.Wgender,
                'bday': $scope.Wbday,
                'nic' :$scope.Wnic,
                'email': $scope.Wemail,
                'jobcategory': $scope.Wjobcategory,
                'experienceyrs' : $scope.Wyrsexperince,
                'feetype' : $scope.Wfeetype,
                'fee' : $scope.Wfee,
                'feecurrecy' : $scope.Wfeecurrency,
                'workinghrs' : $scope.Wworkinghours,
                'caddress1': $scope.Wcaddressline1,
                'caddress2': $scope.Wcaddressline2,
                'ccity': $scope.Wccity,
                'ccountry': $scope.Wccountry,
                'czipcode': $scope.Wczipcode,
                'paddress1': $scope.Wpaddressline1,
                'paddress2': $scope.Wpaddressline2,
                'pcity': $scope.Wpcity,
                'pcountry': $scope.Wpcountry,
                'pzipcode': $scope.Wpzipcode,
                'mobiletp': $scope.Wmobile,
                'hometp': $scope.Whome,
                'college' : $scope.Wcollege,
                'school' : $scope.Wschool,
                'language' : $scope.Wlanguage,
                'nationality' : $scope.Wnationality,
                'religion' : $scope.Wreligion,
                'bio' : $scope.Wbio
            }
            $http({
                method : "POST",
                url : "/profile/userinfo",
                data: data
            }).then(function mySuccess(response) {
                SetSuccessMsg("successmsgList","","Successfully saved");
                window.scrollTo(0, 300);
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        }

    }
});

//Account settings related
app.controller('WPAccountController',function ($scope,$http){
    $scope.ChangePSW = function () {
        RemoveErrors("errorList6");
        if(!$scope.Wcurrentpsw)
            SetError("errorList6","Current Password","This field is required");
        if(!$scope.Wpsw)
            SetError("errorList6","Password","This field is required");
        if(!$scope.Wpswrepeat)
            SetError("errorList6","Re-Password","This field is required");
        if($scope.Wpsw != $scope.Wpswrepeat)
            SetError("errorList6","Passwords","Do not match");

        if(HasErrors("errorList6")==true){
            window.scrollTo(0, 300);
        }
        else{
            var data = {
                'currentpsw' : $scope.Wcurrentpsw,
                'password' : $scope.Wpsw
            }
            $http({
                method : "POST",
                url : "/profile/changepassword",
                data: data
            }).then(function mySuccess(response) {
                if(response.data == "Incorrect CurrentPSW"){
                    SetError("errorList6","Current Password","Incorrect !!");
                }
                else {
                    SetSuccessMsg("successmsgList","","Successfully saved");
                    window.scrollTo(0, 300);
                    $scope.Wcurrentpsw = "";
                    $scope.Wpsw = "";
                    $scope.Wpswrepeat = "";
                }
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        };

        $scope.DeactivateAccount = function () {
            $http.get('/profile/deactivate')
                .then(function(res){
                    if(res.data != ""){
                        window.location.href = "index.html";
                    }
                    else{
                        alert("Something went wrong !");
                    }
                });
        }
    }
});

//Skill related
app.controller('WPSkillsController',function ($scope,$http){

    $http.get('/profile/skills')
        .then(function(res){
            if(res.data){
                $scope.skills = res.data;
            }
            else{
                alert("Something went wrong !");
            }
        });

    function loadSkills(){
        $http.get('/profile/skills')
            .then(function(res){
                if(res.data){
                    $scope.skills = res.data;
                }
                else{
                    alert("Something went wrong !");
                }
            });
    };


    $scope.AddSkill = function (){
        if($scope.Wskill){
            var data = {
                'skill' : $scope.Wskill
            }
            $http({
                method : "POST",
                url : "/profile/addskill",
                data: data
            }).then(function mySuccess(response) {
                loadSkills();
                $scope.Wskill = "";
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        };
    };

    $scope.DeleteSkill = function (ID){
        if (confirm("Are you sure, you want to delete ?")) {
            var data = {
                'skillID' : ID
            }
            $http({
                method : "POST",
                url : "/profile/deleteskill",
                data: data
            }).then(function mySuccess(response) {
                loadSkills();
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        };
    };
});


//Experience related
app.controller('WPExprController',function ($scope,$http){

    $http.get('/profile/experience')
        .then(function(res){
            if(res.data){
                $scope.exprs = res.data;
            }
            else{
                alert("Something went wrong !");
            }
        });

    function loadExprs(){
        $http.get('/profile/experience')
            .then(function(res){
                if(res.data){
                    $scope.exprs = res.data;
                }
                else{
                    alert("Something went wrong !");
                }
            });
    };


    $scope.AddExperience = function (){
        RemoveErrors("errorList4");
        if(!$scope.Wexpr)
            SetError("errorList4","Experience","This field is required");
        if(!$scope.Wyearexpr)
            SetError("errorList4","Year","This field is required");

        if(HasErrors("errorList4")==true){
            window.scrollTo(0, 450);
        }
        else{
            var data = {
                'expr' : $scope.Wexpr,
                'yearexpr' : $scope.Wyearexpr
            }
            $http({
                method : "POST",
                url : "/profile/addexperience",
                data: data
            }).then(function mySuccess(response) {
                loadExprs();
                $scope.Wexpr = "";
                $scope.Wyearexpr = "";
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        };
    };

    $scope.DeleteExperience = function (ID){
        if (confirm("Are you sure, you want to delete ?")) {
            var data = {
                'exprID' : ID
            }
            $http({
                method : "POST",
                url : "/profile/deleteexperience",
                data: data
            }).then(function mySuccess(response) {
                loadExprs();
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        };
    };
});

//Feedback related
app.controller('WPFeedbackController',function ($scope,$http) {

    $http.get('/profile/feedbacks')
        .then(function (res) {
            if (res.data) {
                $scope.feedbacks = res.data;
            }
            else {
                alert("Something went wrong !");
            }
        });

    function loadSkills() {
        $http.get('/profile/feedbacks')
            .then(function (res) {
                if (res.data) {
                    $scope.feedbacks = res.data;
                }
                else {
                    alert("Something went wrong !");
                }
            });
    };
});

//certificate related

app.controller('WPCertificationcontroler',function ($scope,$http){

    $http.get('/profile/certifications')
        .then(function(res){
            if(res.data){
                $scope.certifications = res.data;
            }
            else{
                alert("Something went wrong !");
            }
        });

    function loadCertificate(){
        $http.get('/profile/certifications')
            .then(function(res){
                if(res.data){
                    $scope.certifications = res.data;
                }
                else{
                    alert("Something went wrong !");
                }
            });
    };


    $scope.AddCertification = function (){
        RemoveErrors("errorList2");
        if(!$scope.Wcertification)
            SetError("errorList2","Certification","This field is required");
        if(!$scope.Wprovider)
            SetError("errorList2","Provider","This field is required");
        if(!$scope.Wfromdate)
            SetError("errorList2","From Date","This field is required");
        if(!$scope.Wtodate)
            SetError("errorList2","To Date","This field is required");

        if(HasErrors("errorList2")==true){
            window.scrollTo(0, 450);
        }
        else{
            $scope.date = new Date();


            var diffDays = $scope.Wtodate - $scope.date;
            console.log(' Date  :'  ,diffDays);
            var expirestatus = (diffDays<0) ? true : false;
            var data = {
                'certification' : $scope.Wcertification,
                'provider' : $scope.Wprovider,
                'fromdate' : $scope.Wfromdate,
                'todate' : $scope.Wtodate,
                'expire' : expirestatus,
                'path' :  $scope.Wpath,
            }
            $http({
                method : "POST",
                url : "/profile/addCertificate",
                data: data
            }).then(function mySuccess(response) {
                loadCertificate();
                $scope.Wcertification = "";
                $scope.Wprovider = "";
                $scope.Wfromdate = "";
                $scope.Wtodate = "" ;
                $scope.Wpath = "";
            }, function myError(response) {
                alert("Something went wrong !");
            });
        };
    };

    $scope.DeleteCertification = function (ID){
        if (confirm("Are you sure, you want to delete ?")) {
            var data = {
                'certificateID' : ID
            }
            $http({
                method : "POST",
                url : "/profile/deleteCertificate",
                data: data
            }).then(function mySuccess(response) {
                loadCertificate();
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        };
    };
});