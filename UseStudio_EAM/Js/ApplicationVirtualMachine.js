Namespace.register("EAM.AV");
var mysql_address = "http://cd.1473.cn/php";
var mysql_ip = "db.1473.cn";
var mysql_database = "UseStudio_Eam";

window.onload = function () {


}
/*申请虚拟机*/
EAM.AV.Insert = function () {

    //username
    var _username = "";

    var _id = Guid.newGuid();
    var _userid = $("#userid")[0].value;
    var _server = $("#server")[0].value;
    var _system = $("#system")[0].value;
    //var _ip = $("#ip")[0].value;
    var _ip = "";
    //var _mainUse = ""; //用途
    var _mainUse = $("#mainUse")[0].value;
    var _udp = "";
    var _apply = "0";
    var _applytime = CurentTime()
    var _reverttime = CurentTime() //_applytime;
    var _status = "2";
    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectVirtualMachine"]), function (c) {
        var a = c.value;
        var j = 0;
        for (var i = 0; i < a.length; i++) {
            while (_userid == a[i].UserId) {
                U.UF.UI.Confirm("您已申请过虚拟机！", function () { location.replace(location); }, function () { });
                j = 1;

                break;
            }

        }
        if (j == 0) {
            if (_userid) {

                U.UF.UI.Confirm("确认提交", function () { U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_AddVirtualMachine", _id, _username, _userid, _server, _system, _ip, _mainUse, _udp, _apply, _applytime, _reverttime, _status])).value; location.replace(location); }, function () { });

            } else {
                U.UF.UI.Confirm("请输入信息", function () { }, function () { });
            }
        }
    });

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
