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