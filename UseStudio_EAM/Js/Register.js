Namespace.register("EAM.RE");
var mysql_address = "http://cd.1473.cn/php";
var mysql_ip = "db.1473.cn";
var mysql_database = "UseStudio_Eam";
_lists = 60;
var t;
var _identifyingcode = 0;
window.onload = function () {
    //EAM.RE.phone();
    if (EAM.RE.getCookie("usestudiosso") != "") {
        setTimeout(function () { window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn"; }, 1000);
    } else {
        EAM.RE.delCookie("eamuserid");
        U.UF.CD.loadPageCrossDomain(function () {
            U.MD.U.R.register(
                function () {
                    alert("0");
                }
            );
            EAM.RE.LoginHref();
            //EAM.RE.Logout();
        });
    }
}
EAM.RE.Logout = function () {
    U.MD.U.LO.logout();
}
EAM.RE.getCookie = function (c_name) {
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
EAM.RE.setCookie = function (c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
EAM.RE.delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = EAM.RE.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
/*
EAM.RE.InsertUser = function () {
    var _insert = $("#UD_SYCOD")[0];
    _insert.onclick = function () {
        U.Alert("注册成功");
        setTimeout(function () { window.location.href = "http://eam.1473.cn/Login.htm"; }, 1000);
        
    }
}
*/
EAM.RE.LoginHref = function () {
    var logbtn = document.getElementsByClassName("UD_SYCOSPO")[0],
        logspan = logbtn.children[0];
    console.log(logbtn);
    console.log(logspan);
    logspan.onclick = function () {
        window.location.href = 'Login.htm';
    }
    //EAM.RE.InsertUser();
}
//window.onmessage = function(e)
//{
//	e =e || event;
//	alert(e.data);
//}
//EAM.RE.email = function() {
//	$(".phonenumber")[0].innerHTML = "邮箱号";
//	$(".phonenumber")[0].id = 0;
//	$(".email")[0].style.cssText = "color:rgb(34,90,216) ;"
//	$(".phone")[0].style.cssText = "color: #333;";

//	clearInterval(t);
//	_lists = 60;
//	$("#identifyingcode")[0].innerHTML = "验证码";
//	$("#identifyingcode")[0].onclick = function() {
//		EAM.RE.code()
//	};
//}
//EAM.RE.phone = function() {
//	$(".phonenumber")[0].innerHTML = "手机号";
//	$(".phonenumber")[0].id = 1;
//	$(".phone")[0].style.cssText = "color:rgb(34,90,216) ;";
//	$(".email")[0].style.cssText = "color:#333 ;";

//	clearInterval(t);
//	_lists = 60;
//	$("#identifyingcode")[0].innerHTML = "验证码";
//	$("#identifyingcode")[0].onclick = function() {
//		EAM.RE.code()
//	};
//}
//EAM.RE.code = function() {
//	if($("#usernames")[0].value == "" && $("#passwords")[0].value == "") {
//		alert("请输入手机号或邮箱号和密码");
//	} else {
//		_lists = _lists - 1;
//		if(_lists < 61 || _lists > 0) {
//			$("#identifyingcode")[0].innerHTML = _lists;
//			$("#identifyingcode")[0].onclick = "";
//			t = setTimeout("EAM.RE.code()", 1000);
//		}
//		if(_lists == 59) {
//			var _username = $("#usernames")[0].value;
//			EAM.RE.getPhoneCode(_username);
//		}
//		if(_lists == 0) {
//			clearInterval(t);
//			$("#identifyingcode")[0].innerHTML = "再次点击重发";
//			_lists = 60;
//			$("#identifyingcode")[0].onclick = function() {
//				EAM.RE.code()
//			};
//		}
//		var _username = $("#usernames")[0].value;
//	}
//}
///*手机号正则*/
//EAM.RE.checkMobile = function (sMobile) {
//    if (!(/^1[3|5][0-9]\d{4,8}$/.test(sMobile))) {
//        return false;
//    }
//}
///*邮箱正则*/
//EAM.RE.checkEamil = function (sEamil) {
//    if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(sEamil))) {
//        return false;
//    }
//}
//EAM.RE.getPhoneCode = function(mobile, callback) {
//	//U.A.Post({ "url": "http://short.1473.cn", parame: { mobile: "手机号", "templateid": "3032374", "params": "密码", "id": "3"} })
//	function state_Change() {
//		if(xmlhttp.readyState == 4) { // 4 = "loaded"
//			if(xmlhttp.status == 200) { // 200 = OK
//				console.log(xmlhttp.responseText)
//				console.log(xmlhttp.responseText.code, xmlhttp.responseText.obj)
//				var _xmlhttp_responseTexts = JSON;
//				_xmlhttp_responseTexts = JSON.parse(xmlhttp.responseText);
//				_identifyingcode = _xmlhttp_responseTexts.obj;
//			} else {
//				alert("发送失败，请重新尝试...");
//				//alert("Problem retrieving XML data");
//			}
//		}
//	}

//	var xmlhttp = new XMLHttpRequest();
//	xmlhttp.onreadystatechange = state_Change;
//	xmlhttp.open("GET", 'http://short.1473.cn/?mobile=' + mobile, true);
//	xmlhttp.send(null);

//};
//EAM.RE.login = function () {
//    if ($(".phonenumber")[0].innerHTML == "手机号") {
//        if ($("#password")[0].value == _identifyingcode) {
//            var _id = Guid.newGuid();
//            var _phone = $("#usernames")[0].value;
//            var _passwords = $("#passwords")[0].value;
//            if (_phone == "") {
//                alert("手机号不能为空");
//                return;
//            } else if (EAM.RE.checkMobile(_phone) == false) {
//                alert("手机格式不正确");
//                return;
//            } else if (_passwords == "") {
//                alert("密码不能为空");
//                return;
//            } else {
//                U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_UpdateUserInfoRegister", _id, '0']), function (r) {
//                    alert("注册成功")
//                    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_AddUserInfoRegister", _id, _phone, _passwords])).value;
//                })
//            }
//        } else {
//            alert("请重新输入验证码")
//        }
//    } else {
//        if ($("#password")[0].value == _identifyingcode) {
//            var _id = Guid.newGuid(); ;
//            var _eamil = $("#usernames")[0].value;
//            var _passwords = $("#passwords")[0].value;
//            if (_eamil == "") {
//                alert("邮箱不能为空");
//                return;
//            } else if (EAM.RE.checkEamil(_eamil) == false) {
//                alert("邮箱格式不正确");
//                return;
//            } else if (_passwords == "") {
//                alert("密码不能为空");
//                return;
//            } else {
//                U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_UpdateUserInfoRegister", _id, '1']), function (r) {
//                    alert("注册成功")
//                    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_AddUserInfoRegister", _id, _eamil, _passwords])).value;
//                })
//            }
//        } else {
//            alert("请重新输入验证码")
//        }

//    }
//}