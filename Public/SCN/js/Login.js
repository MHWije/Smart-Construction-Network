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

var app = angular.module('loginApp',[]);

//login
app.controller('loginController',function ($scope,$http){

    $scope.username="";
    $scope.password="";

    $scope.login = function(){
        RemoveErrors("errorList");
        if($scope.username == "" || $scope.password == ""){
            if($scope.username == "")
                SetError("errorList","Username","Please enter username");
            if($scope.password == "")
                SetError("errorList","Password","Please enter password");
        }
        else{

            $http.get('/login/authenticateUser/'+$scope.username+'/'+$scope.password)
                .then(function(res){
                    if(res.data != "incorrectpsw"){
                        if(res.data.user_type == "worker"){
                            window.location.href = "Connections.html";
                        }
                        if(res.data.user_type == "client"){
                            window.location.href = "OurProjects.html";
                        }
                        if(res.data.user_type == "admin"){
                            window.location.href = "AdminHome.html";
                        }
                    }
                    else{
                        SetError("errorList","","Username or Password is incorrect !");
                    }
                });
        }
    }
});