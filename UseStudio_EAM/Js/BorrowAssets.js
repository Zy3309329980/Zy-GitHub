
Namespace.register("EAM.BA");
//U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/PC/U.MD.UI.Calendar.js" });
//U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/PC/U.MD.UI.Calendar.css", type: "text/css", rel: "stylesheet" });
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Basic/Calendar.js" });
U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/Basic/Calendar.css", type: "text/css", rel: "stylesheet" });
var mysql_address = "http://cd.1473.cn/php";
var mysql_ip = "db.1473.cn";
var mysql_database = "UseStudio_Eam";

window.onload = function () {
    EAM.BA.Select(1);
    EAM.BA.Page();

}
/**
 *函数作用：向数据库发送申请请求
 *
 *
 */
EAM.BA.AddDetails_Button = function () {
    var Type = $("#Text1")[0]; //获取特定的输入框内的值
    var Reason = $("#Text6")[0];
    //var userId = "";
    //var assetId = "";
    var Time = $("#Text4")[0];
    var _date = new Date();

    //var now = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate();
    var now = CurentTime();

    //U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_AddAssetfirst", Type.value, top.EAM.US.UserInfo.Id, now, Time.value, 0, Reason.value]), function (r) {  //将所填的值发送进数据库内
    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_AddAssetfirst", Type.value, top.EAM.US.UserInfo.Id, now, Time.value, 0, Reason.value]), function (r) {  //将所填的值发送进数据库内
        console.log(r.value);  	//控制台返回的值
        U.Alert("发送成功", 30000000000);
        location.replace(location);  //刷新页面
    });

}
/**
 *函数作用：向数据库发送归还请求
 *
 *
 */
EAM.BA.Return_Button = function () {
    var Type = $("#Text2")[0]; //获取特定的输入框内的值
    var Time = $("#Text3")[0];
    var _date = new Date();
    //var now = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate();
    var now = CurentTime();
    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_AddAssetsecond", Type.value, top.EAM.US.UserInfo.Id, now, Time.value, 3]), function (r) {  //将所填的值发送进数据库内
        console.log(r.value);  	//控制台返回的值
        U.Alert("发送成功", 30000000000);
        location.replace(location);  //刷新页面
    });
}
/**
 *函数作用：单击申请按钮时调用弹窗控件生成弹窗
 *
 *
 */
EAM.BA.ButtonApplication = function () {

    var _obj = new U.UF.UI.form("添加详情", $$("div", {
        "id": "first"
    }), {
        "style": {
            "text-align": "center   ",
            "min-width": "25%",
            "width": "500px",
            "height": "50%",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "20%",
            "left": "50%"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    document.getElementById('test').style.zIndex = "0";
    var odiv = $$("div", { "class": "EAM_BA_AddDetails" }, $("#first")[0]);     //这个用来包裹整个div
    var main = $$("div", { "class": "EAM_BA_AddDetails_Details" }, odiv);
    var line = $$("div", { "class": "EAM_BA_AddDetails_Details_Div" }, main);
    $$("label", { "class": "EAM_BA_AddDetails_Details_Word", "for": "EAM_BA_Model", "innerHTML": "资产名称：" }, line);
    var lineselect = $$("select", { "class": "EAM_BA_AddDetails_Details_text", "id": "Text1" }, line);

    $$("option", { "innerHTML": "HP 498 G3 MT", "value": "HP 498 G3 MT" }, lineselect);
    $$("option", { "innerHTML": "HP Elite Desk 880 G1", "value": "HP Elite Desk 880 G1" }, lineselect);
    $$("option", { "innerHTML": "HP Z440", "value": "HP Z440" }, lineselect);
    $$("option", { "innerHTML": "DELL Precision 3620", "value": "DELL Precision 3620" }, lineselect);
    $$("option", { "innerHTML": "DELL Precision Tower 7810", "value": "DELL Precision Tower 7810" }, lineselect);


    var line4 = $$("div", { "class": "EAM_BA_AddDetails_Details_Div" }, main);
    $$("label", { "class": "EAM_BA_AddDetails_Details_Word", "for": "EAM_BA_Model", "innerHTML": "申请理由：" }, line4);
    $$("input", { "class": "EAM_BA_AddDetails_Details_text", "id": "Text6" }, line4);
    var line5 = $$("div", { "class": "EAM_BA_AddDetails_Details_Div" }, main);
    $$("label", { "class": "EAM_BA_AddDetails_Details_Word", "for": "EAM_BA_Model", "innerHTML": "预计归还时间：" }, line5);
    $$("input", { "class": "EAM_BA_AddDetails_Details_text", "id": "Text4" }, line5);
    $('#Text4')[0].onclick = function () { U.MD.UI.Calendar(this); }
    $$("div", { "id": "EAM_BA_AddDetails_Button", "onclick": "EAM.BA.AddDetails_Button()", "innerHTML": "确定" }, odiv);//单击确定按钮之后调用存储过程向数据库发送数据
}
/**
 *函数作用：单击归还按钮时调用弹窗控件生成弹窗
 *
 *
 */
EAM.BA.Return = function () { 
var _obj = new U.UF.UI.form("添加详情", $$("div", {
        "id": "second"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "25%",
            "width": "500px",
            "height": "50%",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "20%",
            "left": "50%"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    document.getElementById('test').style.zIndex = "0";
       var odiv = $$("div", { "class": "EAM_BA_AddDetails" }, $("#second")[0]);     //这个用来包裹整个div
    var main = $$("div", { "class": "EAM_BA_AddDetails_Details" }, odiv);
    var line = $$("div", { "class": "EAM_BA_AddDetails_Details_Div" }, main);
    $$("label", { "class": "EAM_BA_AddDetails_Details_Word", "for": "EAM_BA_Model", "innerHTML":"资产名称：" }, line);
    var lineselect2 = $$("select", { "class": "EAM_BA_AddDetails_Details_text", "id": "Text2" }, line);

    $$("option", { "innerHTML": "HP 498 G3 MT", "value": "HP 498 G3 MT" }, lineselect2);
    $$("option", { "innerHTML": "HP Elite Desk 880 G1", "value": "HP Elite Desk 880 G1" }, lineselect2);
    $$("option", { "innerHTML": "HP Z440", "value": "HP Z440" }, lineselect2);
    $$("option", { "innerHTML": "DELL Precision 3620", "value": "DELL Precision 3620" }, lineselect2);
    $$("option", { "innerHTML": "DELL Precision Tower 7810", "value": "DELL Precision Tower 7810" }, lineselect2);


    var line2 = $$("div", { "class": "EAM_BA_AddDetails_Details_Div" }, main);
    $$("label", { "class": "EAM_BA_AddDetails_Details_Word", "for": "EAM_BA_Model", "innerHTML": "归还日期：" }, line2);
    $$("input", { "class": "EAM_BA_AddDetails_Details_text", "id": "Text3" }, line2);
    $('#Text3')[0].onclick = function () { U.MD.UI.Calendar(this); }
    $$("div", { "id": "EAM_BA_AddDetails_Button", "onclick": "EAM.BA.Return_Button()", "innerHTML": "确定" }, odiv);//单击确定按钮之后调用存储过程向数据库发送数据
}
/**
 *函数作用：生成个人Id下所有数据
 * int      当前用户所处界面
 *
 */
EAM.BA.Select = function (int) {
    $(".EAM_BA_Contentbody")[0].innerHTML = "";
    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectAsset", top.EAM.US.UserInfo.Id, int, "8"]), function (c) {
    //U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_BorrowAssetspageTwo",int, "8"]), function (c) {
        var main = $(".EAM_BA_Contentbody")[0];
        var _c = c.value;
        for (var _i = 0; _i < _c.length; _i++) {
            var main = $$("div", { "className": "EAM_BA_Line" }, $(".EAM_BA_Contentbody")[0]);
            $$("span", { "className": "EAM_BA_types", "innerHTML": _c[_i].FullName }, main);
            $$("span", { "className": "EAM_BA_types type", "innerHTML": _c[_i].Name }, main);
            $$("span", { "className": "EAM_BA_types department", "innerHTML": _c[_i].Department }, main);
            if (_c[_i].Department == "") {
                $(".department")[_i].innerHTML = "无";
            }
            $$("span", { "className": "EAM_BA_types_date", "innerHTML": U.UF.D.getFullTime(_c[_i].ApplyTime, "string") }, main);
            if (_c[_i].PrepareRevertTime == null) {
                _c[_i].PrepareRevertTime = "无";
                $$("span", { "className": "EAM_BA_types_date time", "innerHTML": _c[_i].PrepareRevertTime }, main);
            } else {
                $$("span", { "className": "EAM_BA_types_date time", "innerHTML": U.UF.D.getFullTime(_c[_i].PrepareRevertTime, "string") }, main);
            }


            if (_c[_i].RevertTime == null) {
                _c[_i].RevertTime = "无";
                $$("span", { "className": "EAM_BA_types_date retime", "innerHTML": _c[_i].RevertTime }, main);
            } else {
                $$("span", { "className": "EAM_BA_types_date retime", "innerHTML": U.UF.D.getFullTime(_c[_i].RevertTime, "string") }, main);
            }



            $$("span", { "className": "EAM_BA_types restitution Status" }, main);
            if (_c[_i].Status == "0") {
                $(".Status")[_i].innerHTML = "待审核";
                var fspan = $(".Status")[_i]; //选中每一个申请待审核的框
                fspan.onclick = currying([_c[_i].Id, _c[_i].FullName, _c[_i].Name, _c[_i].Department, _c[_i].ApplyTime, _c[_i].PrepareRevertTime, _c[_i].ReasonForApply, _c[_i].Status], EAM.BA.Frame1); //调用页面最下方的传参方法，向每一个待审核的框所对应的单击事件传不同的参数
            }
            if (_c[_i].Status == "3") {
                $(".Status")[_i].innerHTML = "待审核";
                var rspan = $(".Status")[_i]; //选中每一个归还待审核的框
                rspan.onclick = currying([_c[_i].Id, _c[_i].FullName, _c[_i].Name, _c[_i].Department, _c[_i].ApplyTime, _c[_i].RevertTime, _c[_i].Status], EAM.BA.Frame2);
            }
            if (_c[_i].Status == "1" || _c[_i].Status == "4") {
                $(".Status")[_i].innerHTML = "已通过";
                var _true = $(".Status")[_i]; //选中每一个已通过的框
                _true.onclick = currying([_c[_i].Id, _c[_i].FullName, _c[_i].Name, _c[_i].Department, _c[_i].ReasonForApply, _c[_i].Status, _c[_i].ApplyTime, _c[_i].PrepareRevertTime, _c[_i].RevertTime], EAM.BA.Frame3);
            }
            if (_c[_i].Status == "2" || _c[_i].Status == "5") {
                $(".Status")[_i].innerHTML = "已拒绝";
                var _false = $(".Status")[_i]; //选中每一个已拒绝的框
                _false.onclick = currying([_c[_i].Id, _c[_i].FullName, _c[_i].Name, _c[_i].Department, _c[_i].ReasonForApply, _c[_i].ReasonForRefuse, _c[_i].Status, _c[_i].ApplyTime, _c[_i].PrepareRevertTime, _c[_i].RevertTime], EAM.BA.Frame4);
            }
            $$("span", { "className": "EAM_BA_types status", "innerHTML": _c[_i].Status }, main);
            if (_c[_i].Status == "0" || _c[_i].Status == "1" || _c[_i].Status == "2") {
                $(".status")[_i].innerHTML = "借出申请";
            } else if (_c[_i].Status == "3" || _c[_i].Status == "4" || _c[_i].Status == "5") {
                $(".status")[_i].innerHTML = "归还申请";
            }
        }
    });  
}

/**
*函数作用：生成借出待审核操作弹窗
*/
EAM.BA.Frame1 = function (Id, FullName, Name, Department, ApplyTime, PrepareRevertTime, ReasonForApply, Status) {
    var _obj = new U.UF.UI.form("申请详情", $$("div", {
        "id": "fixcoms1"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "25%",
            "width": "500px",
            "height": "55%",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "20%",
            "left": "50%"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    var modification = $$("div", { "class": "EAM_BA_ModifyDetails" }, $("#fixcoms1")[0]);
    var maininfo = $$("div", { "className": "EAM_BA_Box" }, modification);
    var info1 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div1" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请人：" }, info1);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text1", "innerHTML": FullName }, info1);
    var info2 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div2" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "资产型号：" }, info2);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text2","innerHTML": Name }, info2);
    var info3 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div3" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "使用部门：" }, info3);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text3","innerHTML": Department }, info3);
    var info4 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div4" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "借出日期：" }, info4);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text4",  "innerHTML": U.UF.D.getYearMonthDay(ApplyTime, "string") }, info4);
    var info5 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div5" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "预计归还日期：" }, info5);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text5","innerHTML": U.UF.D.getYearMonthDay(PrepareRevertTime, "string") }, info5);
    var info6 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div6" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请理由：" }, info6);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text6", "innerHTML": ReasonForApply }, info6);
    var info7 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div7" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请操作：" }, info7);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text7",  "innerHTML": Status }, info7);
    if (Status == "0") {
        $(".EAM_BA_ModifyDetails_Details_text7")[0].innerHTML = "借出";
    }
    

}
/**
*函数作用：生成归还待审核弹窗
*/
EAM.BA.Frame2 = function (Id, FullName, Name, Department, ApplyTime, RevertTime, Status) {
    var _obj = new U.UF.UI.form("申请详情", $$("div", {
        "id": "fixcoms2"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "25%",
            "width": "500px",
            "height": "50%",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "20%",
            "left": "50%"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    var modification = $$("div", { "class": "EAM_BA_ModifyDetails" }, $("#fixcoms2")[0]);
    var maininfo = $$("div", { "className": "EAM_BA_Box" }, modification);
    var info1 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div1" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请人：" }, info1);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text1",  "innerHTML": FullName }, info1);
    var info2 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div2" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "资产型号：" }, info2);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text2", "innerHTML": Name }, info2);
    var info3 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div3" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "使用部门：" }, info3);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text3 department", "innerHTML": Department }, info3);
    if (Department == "") {
        $(".EAM_BA_ModifyDetails_Details_text3").innerHTML = "无";
    }
    var info4 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div4" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "借出日期：" }, info4);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text4", "innerHTML": U.UF.D.getYearMonthDay(ApplyTime, "string") }, info4);
    var info5 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div5" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "归还日期：" }, info5);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text5", "innerHTML": U.UF.D.getYearMonthDay(RevertTime, "string") }, info5);
    var info6 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div6" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请操作：" }, info6);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text6", "innerHTML": Status }, info6);
    if (Status == 0) {
        $(".EAM_BA_ModifyDetails_Details_text6")[0].innerHTML = "借出";
    } else {
        $(".EAM_BA_ModifyDetails_Details_text6")[0].innerHTML = "归还";
    }

}
/**
*函数作用：生成已通过弹窗
*/
EAM.BA.Frame3 = function (Id, FullName, Name, Department, ReasonForApply, Status, ApplyTime, PrepareRevertTime, RevertTime) {
    var _obj = new U.UF.UI.form("申请详情", $$("div", {
        "id": "fixcoms3"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "25%",
            "width": "500px",
            "height": "50%",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "20%",
            "left": "50%"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    var modification = $$("div", { "class": "EAM_BA_ModifyDetails" }, $("#fixcoms3")[0]);
    var maininfo = $$("div", { "className": "EAM_BA_Box" }, modification);
    var info1 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div1" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请人：" }, info1);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text1", "type": "text", "innerHTML": FullName }, info1);
    var info2 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div2" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "资产型号：" }, info2);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text2", "type": "text", "innerHTML": Name }, info2);
    var info3 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div3" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "使用部门：" }, info3);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text3", "type": "text", "innerHTML": Department }, info3);
    var info4 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div4" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请理由：" }, info4);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text4", "type": "text", "innerHTML": ReasonForApply }, info4);
    var info5 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div5" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请操作：" }, info5);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text5", "type": "text", "innerHTML": Status }, info5);
    if (Status == 0) {
        $(".EAM_BA_ModifyDetails_Details_text5")[0].innerHTML = "借出";
    } else {
        $(".EAM_BA_ModifyDetails_Details_text5")[0].innerHTML = "归还";
    }
    var info6 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div6" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请时间：" }, info6);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text5", "type": "text", "innerHTML": U.UF.D.getYearMonthDay(ApplyTime, "string") }, info6);
    if (Status == 1) {
        var info7 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div7" }, maininfo);
        $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "预计归还时间：" }, info7);
        $$("div", { "className": "EAM_BA_ModifyDetails_Details_text7", "type": "text", "innerHTML": U.UF.D.getYearMonthDay(PrepareRevertTime, "string") }, info7);
    } else if (Status == 4) {
        var info8 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div8" }, maininfo);
        $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "归还时间：" }, info8);
        $$("div", { "className": "EAM_BA_ModifyDetails_Details_text8", "type": "text", "innerHTML": U.UF.D.getYearMonthDay(RevertTime, "string") }, info8);
    }
}
/**
*函数作用：生成已拒绝弹窗
*/
EAM.BA.Frame4 = function (Id, FullName, Name, Department, ReasonForApply, ReasonForRefuse, Status, ApplyTime, PrepareRevertTime, RevertTime) {
    var _obj = new U.UF.UI.form("申请详情", $$("div", {
        "id": "fixcoms4"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "25%",
            "width": "500px",
            "height": "50%",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "20%",
            "left": "50%"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    var modification = $$("div", { "class": "EAM_BA_ModifyDetails" }, $("#fixcoms4")[0]);
    var maininfo = $$("div", { "className": "EAM_BA_Box" }, modification);
    var info1 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div1" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请人：" }, info1);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text1", "type": "text", "innerHTML": FullName }, info1);
    var info2 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div2" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "资产型号：" }, info2);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text2", "type": "text", "innerHTML": Name }, info2);
    var info3 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div3" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "使用部门：" }, info3);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text3", "type": "text", "innerHTML": Department }, info3);
    var info4 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div4" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请理由：" }, info4);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text4", "type": "text", "innerHTML": ReasonForApply }, info4);
    var info5 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div5" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "拒绝理由：" }, info5);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text5", "type": "text", "innerHTML": ReasonForRefuse }, info5);
    var info6 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div6" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请操作：" }, info6);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text6", "type": "text", "innerHTML": Status }, info6);
    if (Status == 0) {
        $(".EAM_BA_ModifyDetails_Details_text6")[0].innerHTML = "借出";
    } else {
        $(".EAM_BA_ModifyDetails_Details_text6")[0].innerHTML = "归还";
    }
    var info7 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div7" }, maininfo);
    $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "申请时间：" }, info7);
    $$("div", { "className": "EAM_BA_ModifyDetails_Details_text5", "type": "text", "innerHTML": U.UF.D.getYearMonthDay(ApplyTime, "string") }, info7);
    if (Status == 2) {
        var info8 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div8" }, maininfo);
        $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "预计归还时间：" }, info8);
        $$("div", { "className": "EAM_BA_ModifyDetails_Details_text8", "type": "text", "innerHTML": U.UF.D.getYearMonthDay(PrepareRevertTime, "string") }, info8);
    } else if (Status == 5) {
        var info9 = $$("div", { "className": "EAM_BA_ModifyDetails_Details_Div9" }, maininfo);
        $$("span", { "className": "EAM_BA_ModifyDetails_Details_Word", "innerHTML": "归还时间：" }, info9);
        $$("div", { "className": "EAM_BA_ModifyDetails_Details_text9", "type": "text", "innerHTML": U.UF.D.getYearMonthDay(RevertTime, "string") }, info9);
    }
}
/**
 *函数作用：调用分页控件
 *
 *
 */

//EAM.BA.Page = function () {
    //var _leng = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectAsset", 1)).value.length;   //引用分页控件
   // var _div;
    //new U.UF.P.PPage(".EAM_BA_Bottombuttons", _leng, 8, 1,
    //function (page) {
       // EAM.BA.Select(page);     //传递当前所处的页数至生成数据的函数内
   // });
//}


EAM.BA.Page = function () {
    var _leng = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_BorrowAssetspage", top.EAM.US.UserInfo.Id])).value.length;   //引用分页控件
    var _div;
    new U.UF.P.PPage(".EAM_BA_Bottombuttons", _leng, 8, 1,
    function (page) {
        EAM.BA.Select(page);     //传递当前所处的页数至生成数据的函数内
   });
}




/**
*函数作用：传值方法
*
*
*/
var currying = function (arg, fn) {
    return function () {
        fn.apply(this, arg);
    }
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
