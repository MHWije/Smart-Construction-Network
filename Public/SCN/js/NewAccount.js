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


var app = angular.module('NewAccountApp',[]);

//Worker functionality
app.controller('WorkerController',function ($scope,$http){

    $scope.Wfirstname = "";
    $scope.Wmiddlename = "";
    $scope.Wlastname = "";
    $scope.Wgender = "";
    $scope.Wbday = "";
    $scope.Wemail = "";
    $scope.Wjobcategory = "";
    $scope.Wcaddressline1 = "";
    $scope.Wcaddressline2 = "";
    $scope.Wccity = "";
    $scope.Wccountry = "";
    $scope.Wczipcode = "";
    $scope.Wpaddressline1 = "";
    $scope.Wpaddressline2 = "";
    $scope.Wpcity = "";
    $scope.Wpcountry = "";
    $scope.Wpzipcode = "";
    $scope.Wmobile = "";
    $scope.Whome = "";
    $scope.Wusername = "";
    $scope.Wpsw = "";
    $scope.Wpswrepeat = "";


    $scope.WRegister = function(){
        RemoveErrors("errorList1");
        if($scope.Wfirstname === "")
            SetError("errorList1","First Name","This field is required");
        if($scope.Wlastname === "")
            SetError("errorList1","Last Name","This field is required");
        if($scope.Wgender === "")
            SetError("errorList1","Gender","This field is required");
        if($scope.Wbday === "")
            SetError("errorList1","Birth Date","This field is required");
        if($scope.Wemail === "")
            SetError("errorList1","Email","This field is required");
        if($scope.Wjobcategory === "")
            SetError("errorList1","Job Category","This field is required");
        if($scope.Wcaddressline1 === "")
            SetError("errorList1","Current Address Line 1","This field is required");
        if($scope.Wccity === "")
            SetError("errorList1","Current Address City","This field is required");
        if($scope.Wccountry === "")
            SetError("errorList1","Current Address Country","This field is required");
        if($scope.Wczipcode === "")
            SetError("errorList1","Current Address Zip Code","This field is required");
        if($scope.Wmobile === "")
            SetError("errorList1","Mobile Phone","This field is required");
        if(isNaN($scope.Wmobile))
            SetError("errorList1","Mobile Phone","Only numbers allowed");
        if($scope.Whome && isNaN($scope.Whome))
            SetError("errorList1","Home Phone","Only numbers allowed");
        if($scope.Wusername === "")
            SetError("errorList1","Username","This field is required");
        if($scope.Wpsw === "")
            SetError("errorList1","Password","This field is required");
        if($scope.Wpswrepeat === "")
            SetError("errorList1","Re-Password","This field is required");
        if($scope.Wpsw != $scope.Wpswrepeat)
            SetError("errorList1","Passwords","Do not match");


        if(HasErrors("errorList1")==true){
            window.scrollTo(0, 0);
        }
        else{
            var data={
                'firstname': $scope.Wfirstname,
                'middlename': $scope.Wmiddlename,
                'lastname': $scope.Wlastname,
                'gender': $scope.Wgender,
                'bday': $scope.Wbday,
                'email': $scope.Wemail,
                'jobcategory': $scope.Wjobcategory,
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
                'username': $scope.Wusername,
                'psw':  $scope.Wpsw,
                'usertype' : "worker"
            }
            $http({
                method : "POST",
                url : "/account/signup",
                data: data
            }).then(function mySuccess(response) {
                window.location.href = "Login.html";
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        }

    }

});


//Client Functionality
app.controller('ClientController',function ($scope,$http){

    $scope.Cfirstname = "";
    $scope.Cmiddlename = "";
    $scope.Clastname = "";
    $scope.Cgender = "";
    $scope.Cemail = "";
    $scope.Coccupation = "";
    $scope.Cpaddressline1 = "";
    $scope.Cpaddressline2 = "";
    $scope.Cpcity = "";
    $scope.Cpcountry = "";
    $scope.Cpzipcode = "";
    $scope.Cmobile = "";
    $scope.Chome = "";
    $scope.Cusername = "";
    $scope.Cpsw = "";
    $scope.Cpswrepeat = "";

    $scope.CRegister = function(){
        RemoveErrors("errorList2");
        if($scope.Cfirstname === "")
            SetError("errorList2","First Name","This field is required");
        if($scope.Clastname === "")
            SetError("errorList2","Last Name","This field is required");
        if($scope.Cgender === "")
            SetError("errorList2","Gender","This field is required");
        if($scope.Cemail === "")
            SetError("errorList2","Email","This field is required");
        if($scope.Coccupation === "")
            SetError("errorList2","Occupation","This field is required");
        if($scope.Cpaddressline1 === "")
            SetError("errorList2","Permanent Address Line 1","This field is required");
        if($scope.Cpcity === "")
            SetError("errorList2","Permanent Address City","This field is required");
        if($scope.Cpcountry === "")
            SetError("errorList2","Permanent Address Country","This field is required");
        if($scope.Cpzipcode === "")
            SetError("errorList2","Permanent Address Zip Code","This field is required");
        if($scope.Cmobile === "")
            SetError("errorList2","Mobile Phone","This field is required");
        if($scope.Cusername === "")
            SetError("errorList2","Username","This field is required");
        if($scope.Cpsw === "")
            SetError("errorList2","Password","This field is required");
        if($scope.Cpswrepeat === "")
            SetError("errorList2","Re-Password","This field is required");
        if($scope.Cpsw != $scope.Cpswrepeat)
            SetError("errorList2","Passwords","Do not match");


        if(HasErrors("errorList2")==true){
            window.scrollTo(0, 0);
        }
        else{

            var data={
                'firstname': $scope.Cfirstname,
                'middlename': $scope.Cmiddlename,
                'lastname': $scope.Clastname,
                'gender': $scope.Cgender,
                'email': $scope.Cemail,
                'occupation': $scope.Coccupation,
                'paddress1': $scope.Cpaddressline1,
                'paddress2': $scope.Cpaddressline2,
                'pcity': $scope.Cpcity,
                'pcountry': $scope.Cpcountry,
                'pzipcode': $scope.Cpzipcode,
                'mobiletp': $scope.Cmobile,
                'hometp': $scope.Chome,
                'username': $scope.Cusername,
                'psw':  $scope.Cpsw,
                'usertype' : "client"
            }
            $http({
                method : "POST",
                url : "/account/signup",
                data: data
            }).then(function mySuccess(response) {
                window.location.href = "Login.html";
            }, function myError(response) {
                alert("Something went wrong !!");
            });
        }
    }
});