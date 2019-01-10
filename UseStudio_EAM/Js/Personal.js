Namespace.register("EAM.P");


EAM.P.mysql_address = "http://cd.1473.cn/php";
EAM.P.mysql_ip = "db.1473.cn";
EAM.P.mysql_database = "UseStudio_Eam";

window.onload = function () {
    //EAM.P.Select();
    if (EAM.P.getCookie("usestudiosso") == "") {
        window.location.href = "http://eam.1473.cn/Login.htm";
        return;
    } else {
        EAM.P.SelectData();
    }

}
EAM.P.geturl = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
EAM.P.getCookie = function (c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
EAM.P.delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = EAM.P.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
EAM.P.SelectData = function () {
    //    var _uid = EAM.P.geturl("id");
    //    if (_uid == null) {
    //        window.location.href = "http://eam.1473.cn/Login.htm";
    //        return;
    //    }
    var _uid = EAM.P.getCookie("usestudiosso");
    var _id = U.UF.Cookie.get("usestudiosso", "userid")[0];
    var _value = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectUserInfo", _id])).value;
    var _user = _value[0].UserName,
            _name = _value[0].FullName,  //add
            _class = _value[0].Class,
            _phone = _value[0].Telephone,
            _dept = _value[0].Department,
            _admin = _value[0].IsAdmin;
    var _navchange = top.$(".EAM_I_Nav_Change")[0];
    var _bgchange = top.$(".EAM_I_Nav2_Change")[0];
    if (_class == "") {
        _class = "暂无班级";
        EAM.P.Show();
    }
    if (_phone == "") {
        _phone = "暂无电话";
    }
    if (_dept == "") {
        _dept = "暂无部门";
    }

    var _uip = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectSeatingIP", _id])).value;
    if (_uip == 0 || _uip[0].Ip == "") {
        var _ip = "暂无IP";
    } else {
        var _ip = _uip[0].Ip;
    }
    var _utype = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectType", _user])).value;
    if (_utype == 0 || _utype[0].Type == "") {
        var _type = "暂无电脑型号";
    } else {
        var _type = _utype[0].Type;
    }
    var _nameSpan = $("#uname")[0],
        _classSpan = $("#uclass")[0],
        _phoneSpan = $("#uphone")[0],
        _deptSpan = $("#udepartment")[0],
        _ipSpan = $("#uip")[0],
        _typeSpan = $("#umodel")[0],
        _uimg = $(".userimg")[0],
        _headname = top.$(".EAM_I_Nav_Nav_UserName")[0];
    //_nameSpan.innerHTML = _user;
    _nameSpan.innerHTML = _name; //add
    _headname.innerHTML = _user;
    _classSpan.innerHTML = _class;
    _phoneSpan.innerHTML = _phone;
    _deptSpan.innerHTML = _dept;
    _ipSpan.innerHTML = _ip;
    _typeSpan.innerHTML = _type;
    var _img = EAM.P.getCookie("eamimg");
    if (_img == "null" || _img == "") {
        _uimg.src = "http://www.1473.cn/img/UserHead/UseHead.jpg";
    } else if (_img.substring(0, 4) == "http") {
        _uimg.src = _img;
    } else {
        _uimg.src = "http://fs.1473.cn/" + _img;
    }
}
EAM.P.Logout = function () {
    document.cookie = "usestudiosso=;path=/;domain=.1473.cn";
    window.location.href = "http://eam.1473.cn/Login.htm";
}


/*生成编辑框uform*/
EAM.P.Show = function () {//获取所需要的相应数据
    var _uid = EAM.P.getCookie("usestudiosso");
    var _id = U.UF.Cookie.get("usestudiosso", "userid")[0];
    var _value = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectUserInfo", _id])).value;
    var _user = _value[0].UserName,
        _name = _value[0].FullName,
        _class = _value[0].Class,
        _phone = _value[0].Telephone,
        _dept = _value[0].Department,
        _admin = _value[0].IsAdmin;
    var _utype = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectType", _user])).value;
    if (_utype == 0 || _utype[0].Type == "") {
        var _type = "暂无电脑型号";
    } else {
        var _type = _utype[0].Type;
    }
    var _valueIp = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectSeatingIP", _id])).value;
    _uip = _valueIp[0].Ip;


    var _obj = new U.UF.UI.form("信息修改", $$("div", {
        "id": "fixcoms1"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "25%",
            "width": "497px",
            "height": "618px",
            "maxHeight": "85%",
            "position": "fixed",
            "top": "10%",
            "left": "50%"

        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    var complie = $$("div", { "class": "EAM_P_complie" }, $("#fixcoms1")[0]);  //编辑
    var maininfo = $$("div", { "className": "EAM_B_Box", "style":{"margin-top":"70px"}}, complie);
    var info1 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo); //姓名
    $$("span", { "className": "EAM_P_complie_Word", "innerHTML": "姓名" }, info1);
    $$("input", { "className": "EAM_P_complie_text1", "style": { "border-radius": "5px", "border": "1px solid #bdc1cc" }, "type": "text", "value": _name }, info1);

    var info2 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo); //班级
    $$("span", { "className": "EAM_P_complie_Word", "innerHTML": "班级" }, info2);
    $$("input", { "className": "EAM_P_complie_text2", "type": "text", "value": _class }, info2);

    var info3 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo); //电话
    $$("span", { "className": "EAM_P_complie_Word", "innerHTML": "联系电话" }, info3);
    $$("input", { "className": "EAM_P_complie_text3", "type": "text", "value": _phone }, info3);

    var info4 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo); //部门
    $$("span", { "className": "EAM_P_complie_Word", "innerHTML": "所属部门" }, info4);
    $$("input", { "className": "EAM_P_complie_text4", "type": "text", "value": _dept }, info4);

    var info5 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo); //IP
    $$("span", { "className": "EAM_P_complie_Word", "innerHTML": "我的IP" }, info5);
    $$("input", { "className": "EAM_P_complie_text5", "type": "text", "value": _uip }, info5);
    var _uip = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectSeatingIP", _id])).value;


    var info6 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo); //型号
    $$("span", { "className": "EAM_P_complie_Word", "innerHTML": "电脑型号" }, info6);
    $$("input", { "className": "EAM_P_complie_text6", "type": "text", "value": _type }, info6);

//    var info7 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo); //管理员
//    var superUser = $$("input", { "className": "EAM_P_complie_radio", "type": "radio"}, info7);
//    $$("span", { "className": "EAM_P_complie_Word2", "innerHTML": "管理员" }, info7);

    var info8 = $$("div", { "className": "EAM_P_complie_Div1" }, maininfo);
    $$("input", { "className": "EAM_P_complie_radio2", "type": "submit", "onclick": "EAM.P.Update()" }, info8);
    var _value = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectUserInfo", _id])).value;
    if (_admin == 1) {
       superUser.setAttribute("checked", "checked");
    } else {
       superUser.setAttribute("disabled", "disabled");
    }
}

EAM.P.Update = function () {
    var _id = U.UF.Cookie.get("usestudiosso", "userid")[0];
    var _upname = $(".EAM_P_complie_text1")[0].value,
        _upclass = $(".EAM_P_complie_text2")[0].value,
        _upphone = $(".EAM_P_complie_text3")[0].value,
        _updept = $(".EAM_P_complie_text4")[0].value,
        _upip = $(".EAM_P_complie_text5")[0].value,
        _upmode = $(".EAM_P_complie_text6")[0].value,
        _upadmin = 0;
    if (_upclass == "暂无班级" || _upphone == "暂无电话" || _updept == "暂无部门" || _upip == "暂无IP" || _upname == "" || _upclass == "" || _upphone == "" || _updept == "" || _upip == "" || _upmode == "") {
        U.Alert("请填写完整信息！");
        return;
    } else {
        U.Alert("修改成功！");
        $("#test")[0].style.display = "none";
    }
    var _value = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectUserInfo", _id])).value;
    var _user = _value[0].UserName;
    var _utype = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectType", _user])).value;
    U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "EAM_UpdateUserInfo", _id, _upname, _upclass, _upphone, _updept]));
    //U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateOneUser", _user, _upname]));
    U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateSeatingIp", _id, _upip]));
    U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdatePCMode", _user, _upmode]));
    //U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateUserAdmin", _id, _upadmin]));
    EAM.P.SelectData();
}

//}


/*  114-208代码为点击编辑窗口
EAM.P.Show = function () {
    document.getElementById("EAM_P_Div2").style.display = "block";
    var _upname = $("#name")[0],
        _upclass = $("#class")[0],
        _upphone = $("#phone")[0],
        _updept = $("#department")[0],
        _upip = $("#ip")[0],
        _upmode = $("#model")[0];
    var _id = U.UF.Cookie.get("usestudiosso", "userid")[0];
    var _value = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectUserInfo", _id])).value;
    var _user = _value[0].UserName,
            _class = _value[0].Class,
            _phone = _value[0].Telephone,
            _dept = _value[0].Department,
            _admin = _value[0].IsAdmin;
    if (_class == "") {
        _class = "暂无班级";
    }
    if (_phone == "") {
        _phone = "暂无电话";
    }
    if (_dept == "") {
        _dept = "暂无部门";
    }

    var _uip = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectSeatingIP", _id])).value;
    if (_uip == "" || _uip[0].Ip == "") {
        var _ip = "暂无IP";
    } else {
        var _ip = _uip[0].Ip;
    }
    var _utype = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectType", _user])).value;
    if (_utype == 0 || _utype[0].Type == "") {
        var _type = "暂无电脑型号";
    } else {
        var _type = _utype[0].Type;
    }
    if (_admin == 1) {
        $(".EAM_P_Admin_Click")[0].style.display = "block";
    } else {
        $(".EAM_P_Admin_Click")[0].style.display = "none";
    }
    _upname.value = _user,
        _upclass.value = _class,
        _upphone.value = _phone,
        _updept.value = _dept,
        _upip.value = _ip,
        _upmode.value = _type;
}
EAM.P.Admin = function () {
    if ($(".EAM_P_Admin_Click")[0].style.display == "block") {
        $(".EAM_P_Admin_Click")[0].style.display = "none";
    } else {
        $(".EAM_P_Admin_Click")[0].style.display = "block";
    }
}
EAM.P.Update = function () {
    var _id = U.UF.Cookie.get("usestudiosso", "userid")[0];
    var _upname = $("#name")[0].value,
        _upclass = $("#class")[0].value,
        _upphone = $("#phone")[0].value,
        _updept = $("#department")[0].value,
        _upip = $("#ip")[0].value,
        _upmode = $("#model")[0].value,
        _upadmin = 0;
    if (_upclass == "暂无班级" || _upphone == "暂无电话" || _updept == "暂无部门" || _upip == "暂无IP" || _upname == "" || _upclass == "" || _upphone == "" || _updept == "" || _upip == "" || _upmode == "") {
        U.Alert("请填写完整信息！");
        return;
    } else {
        if ($(".EAM_P_Admin_Click")[0].style.display == "block") {
            _upadmin = 1;
            top.$(".EAM_I_Nav_Change")[0].style.display = "block";
            top.$(".EAM_I_Nav2_Change")[0].style.display = "block";
        } else {
            _upadmin = 0;
            top.$(".EAM_I_Nav_Change")[0].style.display = "none";
            top.$(".EAM_I_Nav2_Change")[0].style.display = "none";
        }
        var _value = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectUserInfo", _id])).value;
        var _user = _value[0].UserName;
        var _utype = U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectType", _user])).value;
        U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "EAM_UpdateUserInfo", _id, _upname, _upclass, _upphone, _updept]));
        //U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateOneUser", _user, _upname]));
        U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateSeatingIp", _id, _upip]));
        U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdatePCMode", _user, _upmode]));
        U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateUserAdmin", _id, _upadmin]));
        document.getElementById("EAM_P_Div2").style.display = "none";
        EAM.P.SelectData();
    }

}
EAM.P.Hide = function () {
    document.getElementById("EAM_P_Div2").style.display = "none";
}
*/



/*
EAM.P.Select = function () {
var _name = $("#uname")[0].innerHTML;
var _class = $("#uclass")[0].innerHTML;
var _phone = $("#uphone")[0].innerHTML;
var _department = $("#udepartment")[0].innerHTML;
var _ip = $("#uip")[0].innerHTML;
var _model = $("#umodel")[0].innerHTML;
var _id = "5a2a7e69-6eea-dc0f-7632-4d5074ede9bc";
U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectUserInfo", _id]), function (set) {
var _value = set.value;
_name = _value[0].UserName;
document.getElementById("uname").innerHTML = _name;
document.getElementById("name").value = _name;

_class = _value[0].Class;
document.getElementById("uclass").innerHTML = _class;
document.getElementById("class").value = _class;

_phone = _value[0].Telephone;
document.getElementById("uphone").innerHTML = _phone;
document.getElementById("phone").value = _phone;

_department = _value[0].Department;
document.getElementById("udepartment").innerHTML = _department;
document.getElementById("department").value = _department;

U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectServerIP"]), function (i) {
var _vlalue2 = i.value;
_ip = _vlalue2[0].Ip;
document.getElementById("uip").innerHTML = _ip;
document.getElementById("ip").value = _ip;
})
U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_SelectAssetDerailsAll", _id]), function (r) {
var _vlalue2 = r.value;
_model = _vlalue2[0].Type;
document.getElementById("umodel").innerHTML = _model;
document.getElementById("model").value = _model;
})
});
}
*/
/*
EAM.P.Submit = function () {
var _name = document.getElementById("name").value;
var _class = document.getElementById("class").value;
var _phone = document.getElementById("phone").value;
var _department = document.getElementById("department").value;
var _ip = document.getElementById("ip").value;
var _model = document.getElementById("model").value;
var _myDate = new Date();
var _time = _myDate.getFullYear() + "-" + _myDate.getMonth() + "-" + _myDate.getDate() + " " + _myDate.getHours() + ":" + _myDate.getSeconds() + ":" + _myDate.getMinutes();
var _id = "5a2a7e69-6eea-dc0f-7632-4d5074ede9bc";
var _old = document.getElementsByClassName("EAM_P_Name_Content_Value");
var _old2 = document.getElementsByClassName("EAM_P_Name1_Content_Value");
var _arr = new Array();
for (var j = 0; j < _old2.length; j++) {
if (_old2[j].value == "") {
_arr.push(_old2[j].value);
continue;
} else if (j == 5) {
if (_arr.length != 0) {
alert(_arr.length + "个为空,请输入内容");
} else {
U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateUserInfo", _name, "", "", _class, _phone, _department, "", "", "", _time, _id])).value;
U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_UpdateServerIP", "", "", _ip, _id])).value;
U.A.Request(EAM.P.mysql_address, ([EAM.P.mysql_ip, EAM.P.mysql_database, "Eam_updateAssetDerails", "", _model, "", "", "", "", _id])).value;
for (var i = 0; i < _old.length; i++) {
if (_old[i].innerHTML == _old2[i].value) {
var a = (_old[i].innerHTML == _old2[i].value);
if (a = true) {
while (i == 5) {
alert("目前并无修改，请确认");
break;
}
continue;
} else {
break;
}
}
else {
alert("修改成功");
document.getElementById("EAM_P_Div2").style.display = "none";
break;
}
}
break;
}
} else {
continue;
}
}
if (_arr.length == 6 || _old2[5].value == "") {
alert(_arr.length + "个为空,请输入内容");
} 
EAM.P.Select();
}
*/
