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


var app = angular.module('ConnectionsApp',[]);

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
