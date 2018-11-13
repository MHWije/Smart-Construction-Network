var app = angular.module('myStagesApp',[]);


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


//var url = "";


app.controller('StagesCtrl',function ($scope,$http){
    //window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    //}

    var reqBody = {
        'pid': data.project_id
    };
    $http({
        method: "POST",
        url: "/manageproject/projectStageInfo",
        data: reqBody
    }).then(function mySuccess(response) {
        $scope.projectStages = response.data;
    }, function myError(response) {
        alert("Something went wrong !!");
    });
});


//Search Control
app.controller('searchCtrl', function ($scope, $http) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.records = [];
    var field = "";

    $scope.init = function(id){
        if($scope.projectStages[id].name == "Foundation Stage"){
            field = "Concrete";
        }
        else if($scope.projectStages[id].name == "Flooring Stage"){
            field = "Mason";
        }
        else if($scope.projectStages[id].name == "Roofing Stage"){
            field = "Carpenter";
        }
        else if($scope.projectStages[id].name == "Tiling Stage"){
            field = "Tile";
        }
        else if($scope.projectStages[id].name == "Painting Stage"){
            field = "Painter";
        }

        $http({
            method: "GET",
            url: "/manageproject/workerSearch",
            params: {
                field: field,
                ex_years: $scope.ex_years,
                years: $scope.years,
                qualification: $scope.qualification,
                price: $scope.price
            }
        }).then(function mySuccess(res) {
            if (res.data.length == 0) {
                $scope.errorMsg = "No workers in this city or this filed";
            }
            else {
                $scope.records = res.data
            }
        }, function myError(res) {
            $scope.error = res.statusText;
        });
    };


    $scope.search = function () {
        $scope.records = "";
        $http({
            method: "GET",
            url: "/manageproject/workerSearch",
            params: {
                field: field,
                ex_years: $scope.ex_years,
                years: $scope.years,
                qualification: $scope.qualification,
                price: $scope.price
            }
        }).then(function mySuccess(res) {
            if (res.data.length == 0) {
                $scope.errorMsg = "No workers in this city or this filed";
            }
            else {
                $scope.records = res.data
            }
        }, function myError(res) {
            $scope.error = res.statusText;
        });
    }
///
    $scope.SendRequest = function (psID,workerID) {
        var data ={
            'ps_id' : psID,
            'worker_id' : workerID
        }

        $http({
            method: "POST",
            url: "/stageworker/workerRequest",
            data: data
        }).then(function mySuccess(response) {
            window.location.href = document.location.href;
        }, function myError(response) {
            alert("Something went wrong !!");
        });
    }

    $scope.ViewProfile = function (user_id,worker_id) {
        var url = 'ViewProfileClient.html?user_id=' + encodeURIComponent(user_id)+'&worker_id='+encodeURIComponent(worker_id);
        window.location.href = url;
    };

});