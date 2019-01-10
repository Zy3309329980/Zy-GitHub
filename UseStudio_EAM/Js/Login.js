Namespace.register("EAM.L");
var mysql_address = "http://cd.1473.cn/php";    //后台地址
var mysql_ip = "db.1473.cn";    //mysql地址
var mysql_database = "UseStudio_Eam";   //数据库名
window.onload = function () {
    if (EAM.L.getCookie("usestudiosso") != "") {    //判断用户是否登录  不为空则已登录
        window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn";   //跳转到个人信息页面再做判断

    } else {
        EAM.L.delCookie("eamuserid");   //删除eamuserid cookie
        var _navname = top.$(".EAM_I_Nav_Nav_UserName")[0];     //获取顶部导航用户名
        _navname.innerHTML = "未登录";     //默认未登录
        var _headimg = top.$(".EAM_I_Nav_Nav_UserImg")[0];  //获取顶部用户头像
        _headimg.src = "http://www.1473.cn/img/UserHead/UseHead.jpg";   //默认用户头像
        U.UF.CD.loadPageCrossDomain(function () {       //跨域
            U.MD.U.L.setLoginCallBack(function () {     //登录回调
                var start = new Date().getTime(); // PS:代码运行时间测试  开始时间
                var _id = US.userInfo.UserId;   //登录回调的获取的用户信息
                var _uname = US.userInfo.TrueName;
                var _upassword = US.userInfo.UserPassword;
                var _img = US.userInfo.UserThumbnailImageHead;
                EAM.L.Login(_id, _uname, _upassword, _img);     //调用EAM.L.Login方法
                var end = new Date().getTime(); // 代码结束时间
                console.log(end - start);
            });
        });
    }
}
EAM.L.Login = function (_id, _uname, _upassword, _img) {
    var _navname = top.$(".EAM_I_Nav_Nav_UserName")[0]; //获取顶部导航用户名
    var _headimg = top.$(".EAM_I_Nav_Nav_UserImg")[0]; //获取顶部用户头像
    var _bgname = top.$(".EAM_I_Nav2_Username")[0];  //bgname 后台显示用户名
    var _nav1 = top.$(".EAM_I_Nav")[0];     //前台页面显示的导航
    var _list1 = top.$(".EAM_I_List")[0];
    var _nav2 = top.$(".EAM_I_Nav2")[0];    //后台页面显示的导航
    var _list2 = top.$(".EAM_I_List2")[0];
    var _iframe = top.$(".EAM_I_Iframe_Cent")[0];   //获取页面iframe
    var _navchange = top.$(".EAM_I_Nav_Change")[0];    //为跳转前后台页面做准备
    var _bgchange = top.$(".EAM_I_Nav2_Change")[0];
    var _value = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_CheckUser", _id])).value;  //判断1473用户是否存在用户表
    if (_value == 0) {  //如果用户不存在则插入用户信息
        U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_InsertUser", _id, _uname]));
        U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_InsertIpFirst", _id]));
        U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_InsertFirstAsset", _id]));
        //$$("div", { "class": "EAM_P_Hint", "innerHTML": "提示：第一次登录请录入您的信息" }, window.frames["EAM_I_Iframe_Cent"].$("#EAM_P_Div2")[0]);
    }
    top.EAM.UserInfo = US.userInfo;     //存一个全局变量
    EAM.L.setCookie('eamuserid', _id, 365);     //设置一个eamuserid
    if (_img == "null" || _img == "" || _img == null) {     //判断用户图片类型
        _headimg.src = "http://www.1473.cn/img/UserHead/UseHead.jpg";   //为空则使用默认头像
    } else if (_img.substring(0, 4) == "http") {    //QQ登录的头像判断
        _headimg.src = _img;
    } else {    //用户自定义头像判断
        _headimg.src = "http://fs.1473.cn/" + _img;
    }
    EAM.L.AddDropMenu();    //添加下拉菜单
    EAM.L.setCookie('eamimg', _img, 365);   //图片存cookie
    var _ret = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectUserInfo", _id])).value;   //获取用户信息
    console.log(_ret);
    _navname.innerHTML = _ret[0].UserName;  //导航条部分添加用户名
    _bgname.innerHTML = _ret[0].UserName;
    if (_ret[0].IsAdmin == 0) {     //判断是否为管理员 0:普通用户 1:管理员
        /*前台导航显示 后台导航隐藏*/
        _nav1.style.display = "block";
        _list1.style.display = "block";
        _nav2.style.display = "none";
        _list2.style.display = "none";
        _navchange.style.display = "none";
        _bgchange.style.display = "none";
        setTimeout(function () { _iframe.src = "Html/Assetapplicationstatus.htm"; }, 800);    //跳转个人信息页面
    } else {
        /*后台导航显示 前台导航隐藏*/
        _nav1.style.display = "none";
        _list1.style.display = "none";
        _nav2.style.display = "block";
        _list2.style.display = "block";
        _navchange.style.display = "block";
        _bgchange.style.display = "block";
        setTimeout(function () { _iframe.src = "admin/Html/Query.htm"; }, 800);     //跳转后台管理页面
        _navname.onclick = function () {    //管理员点击用户名跳转
            /*前台跳后台*/
            _nav1.style.display = "none";
            _list1.style.display = "none";
            _nav2.style.display = "block";
            _list2.style.display = "block";
            _iframe.src = "admin/Html/Query.htm";
        }
        _bgname.onclick = function () {
            /*后台跳前台*/
            _nav1.style.display = "block";
            _list1.style.display = "block";
            _nav2.style.display = "none";
            _list2.style.display = "none";
            _iframe.src = "Html/Assetapplicationstatus.htm";
            EAM.L.AddDropMenu();    //添加下拉菜单
        }
    }
}
EAM.L.AddDropMenu = function () {
    var _headimg = top.$(".EAM_I_Nav_Nav_UserImg")[0];  //获取顶部导航用户头像
    var _menu = top.$(".EAM_I_Menu")[0];    //获取顶部下拉菜单
    var _menulist = top.document.getElementsByClassName("EAM_I_DropDown_Menu");     //下拉菜单里的列表
    _headimg.onclick = function () {    //点击头像显示下拉菜单
        _menu.style.display = "block";  //显示下拉菜单
        for (var i = 0; i < _menulist.length; i++) {    //遍历下拉列表
            _menulist[i].onmouseover = function () {
                _menu.style.display = "block";
            }
            _menulist[i].onmouseout = function () {
                _menu.style.display = "none";
            }
        }
    }
}
EAM.L.getCookie = function (c_name) {   //获取cookie
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
EAM.L.delCookie = function (name) {     //删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = EAM.L.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
EAM.L.setCookie = function (c_name, value, expiredays) {    //设置cookie
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

EAM.L.Logout = function () {
    U.MD.U.LO.logout();     //注销接口
}

/*登录窗口注册跳转页面 废弃*/
EAM.L.RegHref = function () {
    var _reg = $(".UD_SYCOSM")[0];
    _reg.onclick = function () {
        window.location.href = "http://eam.1473.cn/Register.htm";
    }
}
//EAM.L.user = function(){
//	$("#identifyingcode")[0].style.cssText = "display:none";
//	$(".form .input input")[0].style.cssText = "width: 100%;"
//	$(".form .input input")[1].style.cssText = "width: 100%;"
//	$(".user")[0].innerHTML = "账户";
//	$(".password")[0].innerHTML = "密码";
//	$(".userlogin")[0].id = 0;
//	$("#0")[0].style.cssText = "color: rgb(34,90,216)";
//	$(".messagelogin")[0].style.cssText = "color: #333";
//	setTimeout("document.getElementById('identifyingcode').innerHTML='验证码'",0);
//	clearTimeout(t);
//	var _list = 60;
//	_lists= _list;
//}

//EAM.L.message = function(){
//	$("#identifyingcode")[0].style.cssText = "display:block;width: 30%;";
//	$(".form .input input")[1].style.cssText = "width: 70%;"
//	$(".user")[0].innerHTML = "手机号";
//	$(".password")[0].innerHTML = "验证码";
//	$(".userlogin")[0].id = 1;
//	$(".messagelogin")[0].id = 2;
//	$("#1")[0].style.cssText = "color: #333";
//	$("#2")[0].style.cssText = "color: rgb(34,90,216)";
//}
//EAM.L.code = function(){
//	if($("#username")[0].value == "") {
//		alert("请输入手机号或邮箱号和密码");
//	}else{
//	_lists = _lists-1;
//	if(_lists < 61 || _lists > 0 || _lists !=59)
//	{
//	$("#identifyingcode")[0].innerHTML = _lists;
//	$("#identifyingcode")[0].onclick = "";
//	t=setTimeout("EAM.L.code()",1000);
//	}
//	if(_lists == 59)
//	{
//		var _username = $("#username")[0].value;
//		EAM.L.getPhoneCode(_username);
//	}
//   	if(_lists == 0)
//	{
//		clearInterval(t);
//		$("#identifyingcode")[0].innerHTML = "再次点击重发";
//		_lists = 60;
//		$("#identifyingcode")[0].onclick = function() {
//				EAM.L.code()
//			};
//	}
//	var _username = $("#username")[0].value;
//	}
//}
//EAM.L.login = function(){
//	if($(".userlogin")[0].id == 0)
//	{
//		var _username = $("#username")[0].value;
//		var _password = $("#passwords")[0].value;
//		if(_username == "" || _password == "")
//		{
//			alert("请输入账号或密码")
//		}
//		else
//		{
//			var res = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectloginUserInformation",'1',_username,_password])).value
//			if(res == "")
//			{
//				alert("您输入的账号密码错误")
//			}
//			else
//			{
//				EAM.L.setCookie(res[0].Id,_username);
//			}
//		}
//	}
//	else
//	{
//		var _username = $("#username")[0].value;
//		var _password = $("#passwords")[0].value;        
//		if(_username == "" || _password == "")
//		{
//			alert("请输入手机号或验证码")
//		}
//        else
//		{
//			if($("#password")[0].value == _identifyingcode )
//	        {
//	        	alert("输入正确")
//	        	var res = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_SelectloginUserInformation",'0',_username,null])).value
//				if(res == "")
//				{
//					alert("您输入的手机号错误")
//				}
//				else
//				{
//					alert("输入正确");
//					window.location.href = "index.htm";
//				}
//	        }
//	        else
//	        {
//	        	alert("请重新输入验证码")	
//	        }
//			
//		}
//	  }
//}
//EAM.L.getPhoneCode = function (mobile, callback) {
//    U.A.Post({ "url": "http://short.1473.cn", parame: { mobile: "手机号", "templateid": "3032374", "params": "密码", "id": "3"} })
//    function state_Change() {
//        if (xmlhttp.readyState == 4) {// 4 = "loaded"
//            if (xmlhttp.status == 200) {// 200 = OK
//                console.log(xmlhttp.responseText)
//                console.log(xmlhttp.responseText.code,xmlhttp.responseText.obj)
//                var _xmlhttp_responseTexts = JSON;
//                _xmlhttp_responseTexts = JSON.parse(xmlhttp.responseText);
//            	_identifyingcode = _xmlhttp_responseTexts.obj;
//            }
//            else {
//               	alert("发送失败，请重新尝试...");
//                alert("Problem retrieving XML data");
//            }
//        }
//    }
//    
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange = state_Change;
//    xmlhttp.open("GET", 'http://short.1473.cn/?mobile=' + mobile, true);
//    xmlhttp.send(null);
//    
//};
///**
// *函数作用：根据数据库的区域位置和列表位置判断自动生成位置
// *@param val            {string}               需匹配字符
// *
// */
//EAM.L.cookie =function(){
//	var _cookies = document.cookie;
//	_id = document.cookie.split('=')[0];
//	var _name= document.cookie.split('=')[1].split(';')[0];
//	if(_cookies != "")
//	{
//		var _cok = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_LoginCookie",_id,_name])).value;
//		if(_cok !="")
//		{
//			alert("登录成功");
//			window.location.href = "index.htm";
//		}
//	}
//}
//EAM.L.setCookie = function(name,value)
//{
//var Days = 30;
//var exp = new Date();
//exp.setTime(exp.getTime() + Days*24*60*60*1000);
//document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
//}
///**
// *函数作用：写入cookie
// *@param val            {string}               需匹配字符
// *
// */
