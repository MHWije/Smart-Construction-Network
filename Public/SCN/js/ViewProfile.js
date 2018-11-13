function onloading(){
    document.getElementById("section2").style.display = "none";
    document.getElementById("section3").style.display = "none";
    document.getElementById("section4").style.display = "none";
    document.getElementById("section5").style.display = "none";
    document.getElementById("section6").style.display = "none";
}

function ToggleProfileNav(show,hide1,hide2,hide3,hide4,hide5) {
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

var app = angular.module('ViewProfileApp',[]);

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

var user_id = "";
var worker_id = "";

//Summary
app.controller('WPSummaryController',function ($scope,$http) {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    user_id = data.user_id;
    worker_id = data.worker_id;


    var data = {
        'user_id' : user_id,
        'worker_id' : worker_id
    }

    $http({
        method : "POST",
        url : "/viewprofile/userinfo",
        data: data
    }).then(function mySuccess(res) {
        if (res.data) {
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
    }, function myError(res) {
        alert("Something went wrong !!");
    });
    var reqID = "";
    //get friend status
    function FriendStatus(){
        $http({
            method : "POST",
            url : "/viewprofile/friendStatus",
            data: data
        }).then(function mySuccess(res) {
            var btnFriendRequest = document.getElementById("btnFriendRequest");
            var btnUnfriend = document.getElementById("btnUnfriend");
            var PendingFriend = document.getElementById("PendingFriend");
            reqID = res.data.request_id;
            if(res.data){
                if(res.data.status == "new"){
                    btnFriendRequest.style.display = "none";
                    btnUnfriend.style.display = "none";
                    PendingFriend.style.display = "block";
                }
                else if(res.data.status == "friend"){
                    btnFriendRequest.style.display = "none";
                    btnUnfriend.style.display = "block";
                    PendingFriend.style.display = "none";
                }
                else {
                    btnFriendRequest.style.display = "block";
                    btnUnfriend.style.display = "none";
                    PendingFriend.style.display = "none";
                }
            }
            else {
                btnFriendRequest.style.display = "block";
                btnUnfriend.style.display = "none";
                PendingFriend.style.display = "none";
            }

        }, function myError(res) {
            alert("Something went wrong !!");
        });
    };

    FriendStatus();

    $scope.AddFriend = function (){
        var data = {
            'user_id' : user_id,
            'receiver' : worker_id,
            'notification' : "has requested to connect with you."
        }
        $http({
            method : "POST",
            url : "/viewprofile/addFriend",
            data: data
        }).then(function mySuccess(res) {
            FriendStatus();
        }, function myError(res) {
            alert("Something went wrong !!");
        });
    };

    $scope.UnFriend = function (){
        var data = {
            'reqID' : reqID
        }
        $http({
            method : "POST",
            url : "/viewprofile/unFriend",
            data: data
        }).then(function mySuccess(res) {
            FriendStatus();
        }, function myError(res) {
            alert("Something went wrong !!");
        });
    };

});


//Basic info section related
app.controller('WPUserInfoController',function ($scope,$http) {

    var data = {
        'user_id' : user_id,
        'worker_id' : worker_id
    }

    $http({
        method : "POST",
        url : "/viewprofile/userinfo",
        data: data
    }).then(function mySuccess(res) {
        if (res.data) {
            var userdetails = res.data.userdata;
            var workerdetails = res.data.workerdata;
            $scope.Wfirstname = "First Name : "+userdetails.first_name;
            $scope.Wmiddlename = "Middle Name : "+userdetails.middle_name;
            $scope.Wlastname = "Last Name : "+userdetails.last_name;
            $scope.Wgender = userdetails.gender;
            $scope.Wbday = (userdetails.dob).substring(0, 10);
            document.getElementById("Wbday").value = (userdetails.dob).substring(0, 10);
            $scope.Wnic = "NIC : "+userdetails.nic;
            $scope.Wemail = "Email : "+userdetails.email;
            $scope.Wjobcategory = "Job Category : "+workerdetails.job_category;
            $scope.Wyrsexperince = "Years of Experience : "+workerdetails.experience_years;
            $scope.Wfeetype = "Fee Type : "+workerdetails.fee_type;
            $scope.Wfee = "Fee : "+workerdetails.fee;
            $scope.Wfeecurrency = "Fee Currency : "+workerdetails.fee_currency;
            $scope.Wworkinghours = "Working Hours : "+workerdetails.working_hours_per_day;
            $scope.Wcaddressline1 = "Address Line 1 : "+userdetails.c_addressline1;
            $scope.Wcaddressline2 = "Address Line 2 : "+userdetails.c_addressline2;
            $scope.Wccity = "City : "+userdetails.c_city;
            $scope.Wccountry = "Country : "+userdetails.c_country;
            $scope.Wczipcode = "Zip Ccode : "+userdetails.c_zip;
            $scope.Wpaddressline1 = "Address Line 1 : "+userdetails.p_addressline1;
            $scope.Wpaddressline2 = "Address Line 2 : "+userdetails.p_addressline2;
            $scope.Wpcity = "City : "+userdetails.p_city;
            $scope.Wpcountry = "Country : "+userdetails.p_country;
            $scope.Wpzipcode = "Zip Code : "+userdetails.p_zip;
            $scope.Wmobile = "Mobile Number : "+userdetails.mobile_number;
            $scope.Whome = "Home Number : "+userdetails.home_number;
            $scope.Wcollege = "College : "+workerdetails.college;
            $scope.Wschool = "High School : "+workerdetails.high_school;
            $scope.Wlanguage = "Language : "+userdetails.language;
            $scope.Wnationality = "Nationality : "+userdetails.nationality;
            $scope.Wreligion = "Religion : "+userdetails.religion;
            $scope.Wbio = "Bio : "+workerdetails.bio;
        }
    }, function myError(res) {
        alert("Something went wrong !!");
    });
});


//Skill related
app.controller('WPSkillsController',function ($scope,$http) {

    var data = {
        'user_id' : user_id,
        'worker_id' : worker_id
    }

    $http({
        method : "POST",
        url : "/viewprofile/skills",
        data: data
    }).then(function mySuccess(res) {
        if (res.data) {
            $scope.skills = res.data;
        }
    }, function myError(res) {
        alert("Something went wrong !!");
    });

    function loadSkills(){
        $http({
            method : "POST",
            url : "/viewprofile/skills",
            data: data
        }).then(function mySuccess(res) {
            if (res.data) {
                $scope.skills = res.data;
            }
        }, function myError(res) {
            alert("Something went wrong !!");
        });
    }

    $scope.EndorseSkill = function (ID){
            var data = {
                'skillID' : ID
            }
            $http({
                method : "POST",
                url : "/viewprofile/endorseSkill",
                data: data
            }).then(function mySuccess(response) {
                loadSkills();
            }, function myError(response) {
                alert("Something went wrong !!");
            });
    };


});

//Experience related
app.controller('WPExprController',function ($scope,$http) {

    var data = {
        'user_id' : user_id,
        'worker_id' : worker_id
    }
    $http({
        method : "POST",
        url : "/viewprofile/experience",
        data: data
    }).then(function mySuccess(res) {
        if (res.data) {
            $scope.exprs = res.data;
        }
    }, function myError(res) {
        alert("Something went wrong !!");
    });

    function loadExprs(){
        $http({
            method : "POST",
            url : "/viewprofile/experience",
            data: data
        }).then(function mySuccess(res) {
            if (res.data) {
                $scope.exprs = res.data;
            }
        }, function myError(res) {
            alert("Something went wrong !!");
        });
    };

    $scope.EndorseExperience = function (ID){
        var data = {
            'exprID' : ID
        }
        $http({
            method : "POST",
            url : "/viewprofile/endorseExperience",
            data: data
        }).then(function mySuccess(response) {
            loadExprs();
        }, function myError(response) {
            alert("Something went wrong !!");
        });
    };
});


//Feedback related
app.controller('WPFeedbackController',function ($scope,$http) {

    var data = {
        'user_id' : user_id,
        'worker_id' : worker_id
    }

    $http({
        method : "POST",
        url : "/viewprofile/feedbacks",
        data: data
    }).then(function mySuccess(res) {
        if (res.data) {
            $scope.feedbacks = res.data;
        }
    }, function myError(res) {
        alert("Something went wrong !!");
    });
});


//certificate related

app.controller('WPCertificationcontroler',function ($scope,$http){

    var data = {
        'user_id' : user_id,
        'worker_id' : worker_id
    }
    $http({
        method : "POST",
        url : "/viewprofile/certifications",
        data: data
    }).then(function mySuccess(res) {
        if (res.data) {
            $scope.certifications = res.data;
        }
    }, function myError(res) {
        alert("Something went wrong !!");
    });
});