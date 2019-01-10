Namespace.register("EAM.US");
EAM.US.UserInfo = null;
EAM.US.mysql_address = "http://cd.1473.cn/php";
EAM.US.mysql_ip = "db.1473.cn";
EAM.US.mysql_database = "UseStudio_Eam";
EAM.US.GetUser = function () {
    //var _id = document.cookie.split('=')[0];
    //EAM.userInfo = {};
    //var res = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectUserInfo",_id])).value;
    //EAM.userInfo = res;
    var _uid = U.UF.Cookie.get("usestudiosso", "userid")[0];
    var _val = U.A.Request(EAM.US.mysql_address, ([EAM.US.mysql_ip, EAM.US.mysql_database, "EAM_qt_SelectUserName", _uid])).value;
    EAM.US.UserInfo = _val[0].UserName;
    window.paramFromParent = EAM.US.UserInfo; //将变量存至window以便其他frame调用
}
EAM.US.GetUser();
