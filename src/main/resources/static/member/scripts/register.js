function checkAll() {
    if (document.getElementById("chkAll").checked === true) {
        for (let i = 0; i < 3; i++) document.getElementsByName("checkBox")[i].checked = true;
    }
    if (document.getElementById("chkAll").checked === false) {
        for (let i = 0; i < 3; i++) document.getElementsByName("checkBox")[i].checked = false;
    }
}

function checkPart() {
    if (document.getElementById("chkPerson").checked === true || document.getElementById("chkPersonInfo").checked === true) ;
    {
        for (let i = 0; i < 3; i++) document.getElementsByName("all")[i].checked = true;
    }
    if (document.getElementById("chkPerson").checked === false || document.getElementById("chkPersonInfo").checked === false) ;
    for (let i = 0; i < 3; i++) document.getElementsByName("all")[i].checked = false;
}
