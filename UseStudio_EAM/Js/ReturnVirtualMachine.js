Namespace.register("EAM.R");
var mysql_address = "http://cd.1473.cn/php";
var mysql_ip = "db.1473.cn";
var mysql_database = "UseStudio_Eam";



window.onload = function () {


}
/*申请归还虚拟机*/
EAM.R.Return = function () {
    var _id = null;
    var _userid = $("#userid")[0].value;
    var _server = $("#server")[0].value;
    var _system = $("#system")[0].value;
    //var _ip = $("#ip")[0].value;
    var _ip = "";
    var _udp = "";
    var _apply = "1";
    var _applytime = null;
    //var _reverttime = $("#time")[0].value;
    var _reverttime = CurentTime();
    var _status = "2";


    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectVirtualMachine"]), function (c) {
        var a = c.value;
        var j = 0;
        for (var i = 0; i < a.length; i++) {

            if (_userid == a[i].UserId) {
                if (_apply == a[i].Apply) {

                    U.UF.UI.Confirm("申请中", function () { location.replace(location); }, function () { });
                    j = 1;

                } else {
                    _id = a[i].Id;
                    _server = a[i].TheServer;
                    _system = a[i].System;
                    _ip = a[i].IP;
                    _udp = a[i].UseDepartment;
                    _apply = "1";
                    _applytime = Test(a[i].ApplyTime);
                    _reverttime = CurentTime();
                    _status = a[i].Status;

                    U.UF.UI.Confirm("确认提交", function () { U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_ModifyVirtualMachine", _id, _userid, _server, _system, _ip, _udp, _apply, _applytime, _reverttime, _status])).value; location.replace(location); }, function () { });
                    j = 1;

                }
            }
        }
        if (j == 0) {
            if (_userid) {
                U.UF.UI.Confirm("没有找到该用户", function () { location.replace(location); }, function () { });

            } else {
                U.UF.UI.Confirm("请输入信息", function () { }, function () { });
            }
        }
    });
}
/*格式化时间*/
function formatDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
/*调用格式、转型*/
function Test(time) {
    var t = time.slice(6, 19)
    var NewDtime = new Date(parseInt(t));
    return formatDate(NewDtime);
}
function CurentTime() {
    var now = new Date();
    var year = now.getFullYear();         
    var month = now.getMonth() + 1;       
    var day = now.getDate();             
    var hh = now.getHours();             
    var mm = now.getMinutes();          
    var ss = now.getSeconds();          
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}  