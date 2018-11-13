var app = angular.module('myApp', []);

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

app.controller('searchCtrl', function ($scope, $http) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.records = []


	
	/* Estimations */
    $scope.calculateSlab = function () {
        $http({
            method: "GET",
            url: "/estimation/getAverageSLAB",
            params: { field: 'Mason', width: $scope.width, height: $scope.height, length: $scope.length }
        }).then(function mySuccess(response) {
           $scope.totalCost = response.data.data;
        }, function myError(response) {
            $scope.error = response.statusText;
        });
        console.log('Result :', $scope.totalCost)        
    }
	
	$scope.calculateTiling = function () {
        $http({
            method: "GET",
            url: "/estimation/getAverageTILE",
            params: { field: 'Tile', width: $scope.width, length: $scope.length }
        }).then(function mySuccess(response) {
           $scope.totalCost = response.data.data;
        }, function myError(response) {
            $scope.error = response.statusText;
        });
        console.log('Result :', $scope.totalCost)        
    }

    $scope.calculateProofing = function () {
        $http({
            method: "GET",
            url: "/estimation/getAverageProof",
            params: { field: 'Carpenter', width: $scope.width, length: $scope.length }
        }).then(function mySuccess(response) {
            $scope.totalCost = response.data.data;
        }, function myError(response) {
            $scope.error = response.statusText;
        });
        console.log('Result :', $scope.totalCost)
    }

});