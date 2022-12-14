function checkAll() {
    if(document.getElementById("chkAll").checked === true) {
        for(let i = 0; i < 3; i++)document.getElementsByName("checkBox")[i].checked = true;
    }
    if(document.getElementById("chkAll").checked === false) {
        for(let i = 0; i < 3; i++)document.getElementsByName("checkBox")[i].checked = false;
    }
}