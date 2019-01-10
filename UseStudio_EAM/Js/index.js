Namespace.register("EAM.I");
EAM.I.mysql_address = "http://cd.1473.cn/php";
EAM.I.mysql_ip = "db.1473.cn";
EAM.I.mysql_database = "UseStudio_Eam";
EAM.I.UserInfo = new Array(); //定义一个全局变量 用于储存用户个人信息 包括userid 用户名

/**
*函数作用：页面初始化
* '乄' - 当前功能有bug
* '√' - 当前功能可实现
* '×' - 当前功能未实现或已废弃
*/
window.onload = function () {

    if (EAM.I.getCookie("usestudiosso") == "") {    //判断用户是否存在
        window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn";
//        return;
    }

    EAM.I.GetUser();    //获取用户信息
    EAM.I.Admin();      //判断是否为管理员
    EAM.I.DropMenu();   //判断是否添加下拉菜单
}

/**
*函数作用：显示前台页面
* 
*/
EAM.I.Hide = function () {
    /*默认显示前台页面隐藏后台页面*/
    var _nav1 = $(".EAM_I_Nav")[0];
    var _list1 = $(".EAM_I_List")[0];
    var _nav2 = $(".EAM_I_Nav2")[0];
    var _list2 = $(".EAM_I_List2")[0];
    _nav1.style.display = "block";
    _list1.style.display = "block";
    _nav2.style.display = "none";
    _list2.style.display = "none";
}



/**
* 函数作用：跳转至前台页面 
* 
*/
EAM.I.FrontEnd = function () {
    var _listli = $(".EAM_I_List_li");
    var _iframe = top.$(".EAM_I_Iframe_Cent")[0];
    var _nav1 = $(".EAM_I_Nav")[0];
    var _list1 = $(".EAM_I_List")[0];
    var _nav2 = $(".EAM_I_Nav2")[0];
    var _list2 = $(".EAM_I_List2")[0];
    //将每个按钮都初始化为未点击状态
    for (var i = 0; i < _listli.length; i++) {
        var ImgSrc1 = (_listli[i].childNodes[1].src).split('/')[4];
        if (ImgSrc1.split('1').length == 1) {
            _listli[i].childNodes[1].src = "Img/" + ImgSrc1.split('.')[0] + "1.png";
            _listli[i].childNodes[3].style.color = "#999";
            _listli[i].childNodes[5].src = "Img/Selected1.png";
        }
    }
    _nav1.style.display = "block";
    _list1.style.display = "block";
    _nav2.style.display = "none";
    _list2.style.display = "none";
    // 默认列表第一个按钮为点击状态
    _listli[0].childNodes[1].src = "Img/" + (((_listli[0].childNodes[1].src).split('/')[(_listli[0].childNodes[1].src).split("/").length - 1]).split('.')[0]).split('1')[0] + ".png";
    _listli[0].childNodes[3].style.color = "#235AD8";
    _listli[0].childNodes[5].src = "Img/Selected.png";
    _iframe.src = "Html/Assetapplicationstatus.htm";
}

/**
*函数作用：跳转至后台页面
* 
*/
EAM.I.AfterEnd = function () {
    //将每个按钮都初始化为未点击状态
    for (var i = 0; i < $(".EAM_I_List2_li").length; i++) {
        $(".EAM_I_List2_li")[i].className = "EAM_I_List2_li";
    }
    var _iframe = top.$(".EAM_I_Iframe_Cent")[0];
    var _nav1 = $(".EAM_I_Nav")[0];
    var _list1 = $(".EAM_I_List")[0];
    var _nav2 = $(".EAM_I_Nav2")[0];
    var _list2 = $(".EAM_I_List2")[0];
    var _list_li = $(".EAM_I_List2_li")[0];
    _nav1.style.display = "none";
    _list1.style.display = "none";
    _nav2.style.display = "block";
    _list2.style.display = "block";
    _list_li.className = "EAM_I_List2_li EAM_I_List2_li_blue"
    _iframe.src = "admin/Html/Query.htm";

}

/**
*函数作用：手动注销
* 
*/
EAM.I.Logout = function () {
    document.cookie = "usestudiosso=;path=/;domain=.1473.cn";
    var _headimg = $(".EAM_I_Nav_Nav_UserImg")[0];
    _headimg.src = "http://www.1473.cn/img/UserHead/UseHead.jpg";
    window.location.href = "http://eam.1473.cn";
}

/**
*函数作用：下拉菜单
* 
*/
EAM.I.DropMenu = function () {
    var _headimg = $(".EAM_I_Nav_Nav_UserImg")[0];  //获取用户头像元素
    var _menu = $(".EAM_I_Menu")[0];    //获取下拉菜单
    var _menulist = document.getElementsByClassName("EAM_I_DropDown_Menu"); //获取下拉菜单的列表
    var _uid = U.UF.Cookie.get("usestudiosso", "userid")[0];    //获取用户id
    if (_uid == "" || _uid == null) {   //判断用户是否存在
        window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn";
//        return;
    } else {
        _headimg.onclick = function () {    //用户头像点击事件
            _menu.style.display = "block";      //显示下拉菜单
            for (var i = 0; i < _menulist.length; i++) {    //遍历下拉列表 添加鼠标监听
                _menulist[i].onmouseover = function () {
                    _menu.style.display = "block";
                }
                _menulist[i].onmouseout = function () {
                    _menu.style.display = "none";
                }
            }
        }

    }
}

/**
*函数作用：获取cookie
* 
*/
EAM.I.getCookie = function (c_name) {
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

/**
* 函数作用：链接个人信息页面
* ×
*/
EAM.I.HrefPersonal = function () {
    U.Alert("此功能暂未开放",900)
//    window.location.href = "http://eam.1473.cn";
}

/**
* 函数作用：获取用户信息
* 
*/
EAM.I.GetUser = function () {
    var _headimg = $(".EAM_I_Nav_Nav_UserImg")[0];  //获取用户头像元素
    var _img = EAM.I.getCookie("eamimg");   //获取用户头像cookie
    var _uid = U.UF.Cookie.get("usestudiosso", "userid")[0];    //获取用户cookie的id
    var _uname = $(".EAM_I_Nav_Nav_UserName")[0];   //获取用户名元素
    var _bgname = $(".EAM_I_Nav2_Username")[0];  //bgname 后台显示用户名
    EAM.I.UserInfo[0] = _uid;  //向全局变量数组内添加userid
    EAM.I.UserInfo[1] = _uname.innerText; //全局变量添加用户名

    if (_img == "null" || _img == "") {     //判断用户头像类型
        _headimg.src = "http://www.1473.cn/img/UserHead/UseHead.jpg";
    } else if (_img.substring(0, 4) == "http") {    //是否为QQ登录
        _headimg.src = _img;
    } else {    //是否为自定义头像
        _headimg.src = "http://fs.1473.cn/" + _img;
    }
    if (_uid == "" || _uid == null) {   //判断用户是否登录
        window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn";
//        _uname.innerHTML = "未登录";
//        _bgname.innerHTML = "未登录";
    } else {
        U.A.Request(EAM.I.mysql_address, ([EAM.I.mysql_ip, EAM.I.mysql_database, "EAM_qt_SelectUserName", _uid]), function (r) {   //获取用户信息
            var _val = r.value;
            _uname.innerHTML = _val[0].UserName;    //添加用户名到导航条
            _bgname.innerHTML = _val[0].UserName;
        })
    }
}

/**
* 函数作用：判断是否为管理员
* 
*/
EAM.I.Admin = function () {
    var _uid = U.UF.Cookie.get("usestudiosso", "userid")[0];    //获取用户cookie里的id
    if (_uid == "" || _uid == null) {   //判断用户是否登录
        window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn";
//        return;
    } else {
        U.A.Request(EAM.I.mysql_address, ([EAM.I.mysql_ip, EAM.I.mysql_database, "EAM_qt_SelectUserName", _uid]), function (r) {
            U.A.Request(US.CD, [US.DB, 'UseStudio_Admin', 'selectUserPermission', _uid, "84460ADB-8509-43B1-BE4C-478368F504E0"], function (r2) {

                if (r2.value[0].value == 1) {    //判断是否为管理员
                    /*隐藏前台页面显示后台页面*/
                    $("#EAM_I_Nav")[0].style.display = "none";
                    $("#EAM_I_List")[0].style.display = "none";
                    $("#EAM_I_Nav2")[0].style.display = "block";
                    $("#EAM_I_List2")[0].style.display = "block";
                    $(".EAM_I_Nav_Change")[0].style.display = "block";
                    $(".EAM_I_Nav2_Change")[0].style.display = "block";
                    $(".EAM_I_Iframe_Cent")[0].src = "admin/Html/Query.htm";
                } else {
                    /*隐藏后台页面显示前台页面*/
                    var _listli = $(".EAM_I_List_li")[0];
                    $("#EAM_I_Nav2")[0].style.display = "none";
                    $("#EAM_I_List2")[0].style.display = "none";
                    $("#EAM_I_Nav")[0].style.display = "block";
                    $("#EAM_I_List")[0].style.display = "block";
                    $(".EAM_I_Nav_Change")[0].style.display = "none";
                    $(".EAM_I_Nav2_Change")[0].style.display = "none";
                    _listli.childNodes[1].src = "Img/" + (((_listli.childNodes[1].src).split('/')[(_listli.childNodes[1].src).split("/").length - 1]).split('.')[0]).split('1')[0] + ".png";
                    _listli.childNodes[3].style.color = "#235AD8";
                    _listli.childNodes[5].src = "Img/Selected.png";
                    $(".EAM_I_Iframe_Cent")[0].src = "Html/Assetapplicationstatus.htm";
                }
            });
        });
    }
}

/**
* 函数作用：前台列表加载函数
* 
*/
EAM.I.ReceptionLoadList = function (e, htm) {

    var uid = U.UF.Cookie.get("usestudiosso", "userid")[0];
    if (uid == "" || uid == null) {
        window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn";
//        U.Alert('请您先登录！');
//        return;
    }

    e = e.target; //获取节点
    if (e.parentNode.className == "EAM_I_List_li") {//如果点击的是子节点更换为父节点
        e = e.parentNode;
    }
    var end = (e.childNodes[1].src).split("/").length - 1;
    if (((e.childNodes[1].src).split("/")[end]).split("1").length != 1) {//判断点击的按钮是否不是点击当前显示的按钮
        for (var i = 0; i < $(".EAM_I_List_li").length; i++) {//将每个按钮都初始化为未点击状态
            var ImgSrc1 = ($(".EAM_I_List_li")[i].childNodes[1].src).split('/')[end];
            if (ImgSrc1.split('1').length == 1) {
                var a = ImgSrc1.split('.')[0]
                $(".EAM_I_List_li")[i].childNodes[1].src = "Img/" + ImgSrc1.split('.')[0] + "1.png";
                $(".EAM_I_List_li")[i].childNodes[3].style.color = "#999";
                $(".EAM_I_List_li")[i].childNodes[5].src = "Img/Selected1.png";
            }
        }
        e.childNodes[1].src = "Img/" + (((e.childNodes[1].src).split('/')[end]).split('.')[0]).split('1')[0] + ".png";
        e.childNodes[3].style.color = "#235AD8"; //对点击的按钮进行样式更改
        e.childNodes[5].src = "Img/Selected.png";
        $(".EAM_I_Iframe_Cent")[0].src = "Html/" + htm + ".htm";
    }
}

/**
* 函数作用：后台列表加载函数
* 
*/
EAM.I.BackstageLoadList = function (e, htm) {
    window.parent.$(".EAM_I_Iframe_Cent")[0].src = "admin/Html/Amount.htm";
    if (e.target.className != "EAM_I_List2_li EAM_I_List2_li_blue") {//判断点击的按钮是否不是点击当前显示的按钮
        for (var i = 0; i < $(".EAM_I_List2_li").length; i++) {//将每个按钮都初始化为未点击状态
            $(".EAM_I_List2_li")[i].className = "EAM_I_List2_li";
        }
        e.target.className = "EAM_I_List2_li EAM_I_List2_li_blue"; //对点击的按钮进行样式更改
        $(".EAM_I_Iframe_Cent")[0].src = "admin/Html/" + htm + ".htm";
    }
}





/**
* 函数作用：判断当前用户是否为管理员 
* ×
* 废弃
*/
EAM.I.AsnyUser = function () {
    var _uid = U.UF.Cookie.get("usestudiosso", "userid")[0];
    if (_uid == "" || _uid == null) {
        window.location.href = "http://login.1473.cn/?callback=http://eam.1473.cn";
//        return;
    } else {
        var _ret = U.A.Request(EAM.I.mysql_address, ([EAM.I.mysql_ip, EAM.I.mysql_database, "EAM_qt_SelectUserName", _uid])).value;
        if (_ret[0].IsAdmin == 1) {
            var _navchange = top.$(".EAM_I_Nav_Change")[0];
            var _bgchange = top.$(".EAM_I_Nav2_Change")[0]; //bgname 后台显示用户名
            _navchange.onclick = function () {
                EAM.I.AfterEnd();
            }
            _bgchange.onclick = function () {
                EAM.I.FrontEnd();
            }
        }
    }
}
