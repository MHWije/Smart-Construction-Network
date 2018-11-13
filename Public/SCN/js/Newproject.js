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


var app = angular.module('NewProjectApp',[]);


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




//Worker functionality
app.controller('NewProjectCtrl',function ($scope,$http) {

    $scope.category = "";
    $scope.description = "";
    $scope.pdate = "";
    $scope.pedate = "";
    $scope.stage_1 = "";
    $scope.orderstage1 = "";
    $scope.stage_2 = "";
    $scope.orderstage2 = "";
    $scope.stage_3 = "";
    $scope.orderstage3 = "";
    $scope.stage_4 = "";
    $scope.orderstage4 = "";
    $scope.stage_5 = "";
    $scope.orderstage5 = "";


    $scope.AddProject = function () {

        RemoveErrors("errorList1");
        if ($scope.category === "")
            SetError("errorList1", "Category", "This field is required");
        if ($scope.description === "")
            SetError("errorList1", "Description", "This field is required");
        if ($scope.pdate === "")
            SetError("errorList1", "Planned Date", "This field is required");
        if ($scope.pedate === "")
            SetError("errorList1", "Planned End Date", "This field is required");


        if (HasErrors("errorList1") == true) {
            window.scrollTo(0, 0);
        }
        else {
            var data = {
                'owner': 2,
                'category': $scope.category,
                'planned_date': $scope.pdate,
                'planned_end_date': $scope.pedate,
                'desc': $scope.description,
                'stages': [
                    {
                        "id": "1",
                        "name": "stage1",
                        "selected": $scope.stage_1,
                        "order": $scope.orderstage1,

                    },
                    {
                        "id": "2",
                        "name": "stage2",
                        "selected": $scope.stage_2,
                        "order": $scope.orderstage2,
                    },
                    {
                        "id": "3",
                        "name": "stage3",
                        "selected": $scope.stage_3,
                        "order": $scope.orderstage3,
                    },
                    {
                        "id": "4",
                        "name": "stage4",
                        "selected": $scope.stage_4,
                        "order": $scope.orderstage4,
                    },
                    {
                        "id": "5",
                        "name": "stage5",
                        "selected": $scope.stage_5,
                        "order": $scope.orderstage5,
                    }
                ]
            }
            $http({
                method: "POST",
                url: "/project/addproject",
                data: data
            }).then(function mySuccess(response) {
                window.location.href = "OurProjects.html";
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        }
    }
});