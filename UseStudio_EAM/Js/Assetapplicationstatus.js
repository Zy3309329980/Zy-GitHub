Namespace.register("EAM.AS");
EAM.AS.mysql_address = "http://cd.1473.cn/php";
EAM.AS.mysql_ip = "db.1473.cn";
EAM.AS.mysql_database = "UseStudio_Eam";
var j = 3;
var _status = null;
var _se = null;
//全局变量 用户信息
var userinfo = new Array();
userinfo[0] = U.UF.Cookie.get("usestudiosso", "userid")[0];

//调用日历控件
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Basic/Calendar.js" });
U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/Basic/Calendar.css", type: "text/css", rel: "stylesheet" });

//调用table控件
U.UF.DL.asynLoadJs({ src: "http://www.1473.cn/js/Controls/Complex/Table.js", "charset": "utf-8", "type": "text/javascript" });
U.UF.DL.asynLoadCss({ "href": "http://api.1473.cn/Css/page.css", type: "text/css", rel: "stylesheet" });


window.onload = function () {
    //跨库取出用户真实姓名
    userinfo[1] = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "Eam_qt_SelectUserNameById",userinfo[0]])).value[0].UserName;
    EAM.AS.Asset('', '', 4, 1);
}

/*
函数:申请资产
*/
EAM.AS.ApplyAsset = function () {
    var _uid = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_SelectUserName", userinfo[0]])).value;
    //生成外部容器
    var _box = $$("div", { "style": { "width": "100%", "padding": "20px 0 0 0", "font-size": "20px", "overflow": "hidden"} });
    //生成uform窗体
    var obj = new U.UF.UI.form("资产申请", _box, { "style": { "width": "365px", "height": "400px", "maxHeight": "700px", "position": "fixed", "top": "20%", "right": "50%"} }, { "isenlarge": false }, { "style": { "text-align": "center", "height": "40px", "background-color": "#2196f3", "font-size": "20px", "line-height": "40px"} });
    obj.form.style.boxShadow = "1px 2px 6px gray";
    obj.form.style.border = "0";
    //标题
    var _tittle = $$("span", { "class": "EAM_AS_See", "style": { "margin": "0 auto", "width": "100%", "display": "inline-block", "text-align": "center"} }, _box);
    //姓名
    var _name = $$("span", { "innerHTML": "姓名：" + _uid[0].UserName, "style": { "margin-left": "60px", "margin-top": "20px", "display": "inline-block", "width": "100%"} }, _box);
    //理由
    var _resion = $$("span", { "innerHTML": "理由：", "style": { "margin-left": "60px", "margin-top": "20px", "display": "inline-block"} }, _box);
    //理由文本框
    var _resioninput = $$("textarea", {  "style": { "float": "right", "width": "185px", "height": "90px"} }, _resion);
    //资产
    var _asset = $$("span", { "innerHTML": "资产：", "style": { "margin-left": "60px", "margin-top": "20px", "display": "inline-block"} }, _box);
    //资产下拉菜单
    var _assetselect = $$("select", { "style": { "float": "right", "width": "185px", "height": "32px"} }, _asset);
    //循环取出资产数据并添加至下拉菜单
    U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "Eam_qt_SelectAssets"]), function (r) {
        var _assetname = r.value;
        for (i = 0; i < _assetname.length; i++) {
            if (_assetname[i].AssetsModel != "" && _assetname[i].AssetsModel != null) {
                var _option = $$("option", { "value": _assetname[i].AssetsId, "innerHTML": _assetname[i].AssetsModel }, _assetselect);
            }
        }
    });
    //归还时间
    var _rdate = $$("span", { "innerHTML": "归还时间：", "style": { "margin-left": "60px", "margin-top": "20px", "display": "inline-block", "width": "100%"} }, _box);

    var _rdateinput = $$("input", { "type": "text", "style": { "width": "140px", "height": "25px" }, "readonly": "readonly" }, _rdate);
    _rdateinput.onfocus = function () { U.MD.UI.calendar(this, null, true); }
    //申请按钮
    var _attendbutton = $$("button", { "style": { "border-radius": "5px", "font-size": "15px", "color": "white", "border": "1px solid", "background-color": "#169BD5", "margin-left": "40%", "margin-top": "20px", "width": "80px", "height": "30px" }, "innerHTML": "申请" }, _box);
    //申请按钮onclick事件
    _attendbutton.onclick = function () {
        //获取申请框父级元素并移除其子元素
        obj.form.parentNode.removeChild(obj.form);
        //获取input value 插入数据库
        if (_rdateinput.value == "" || _rdateinput.value == null) {
            U.Alert("时间不能为空！");
        }
        U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_InsertAssetsRequest", _assetselect.value, userinfo[0], _rdateinput.value, _resioninput.value]), function (r) {
            if (r.value == 1) {
                U.UF.UI.alertClick("资产申请成功 请等待审批结果");
                EAM.AS.Asset('', 10, 1);
            }
        });
        
    }
}
/*
函数作用：归还资产
参数：
_rid      资产申请id
*/
EAM.AS.ReturnAsset = function (_rid) {
    //_statebox.innerText = "未归还";
    U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "Eam_qt_RequestReturnAssets", _rid]), function (r) {
        if (r.value != 0) { 
            U.UF.UI.alertClick("归还资产申请成功 请等待审批结果");
            EAM.AS.Asset('5', 10, 1);
        }
    });
}
/*
函数作用：展示申请的资产
参数：
state1 模糊搜索关键字1（仅限状态）
state2 关键字2（仅限状态）
size  一页的数据量
page  第几页
*/
EAM.AS.Asset = function (state1, state2, size, page) {
    if (!$("#EAM_AS_tablebox")[0]) {
        var _tablebox = $$("div", { "id": "EAM_AS_tablebox", "style": { "width": "96.1%", "margin": "0 auto"} }, document.body);
    } else {
        $("#EAM_AS_tablebox")[0].innerHTML = "";
    }
    U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_SelectAllAssetsRequest", state1, state2, userinfo[0]]), function (r) {
        var _asset = r.value;
        if (_asset == "") {
            var _tips = $$("div", { "id": "EAM_AS_NoAsset", "innerHTML": "暂无该条目数据" }, $("#EAM_AS_tablebox")[0]);
            return;
        }
        for (var i = 0; i < _asset.length; i++) {
            if (_asset[i].AssetsState == "1") {
                _asset[i].AssetsState = "待审核";
            } else if (_asset[i].AssetsState == "2") {
                _asset[i].AssetsState = "已通过";
            } else if (_asset[i].AssetsState == "3") {
                _asset[i].AssetsState = "未通过";
            } else if (_asset[i].AssetsState == "4") {
                _asset[i].AssetsState = "已归还";
            } else {
                _asset[i].AssetsState = "未归还";
            }
        }
        var _titles = {
            "UserName": {
                "name": "借用人"
            },
            "AssetsModel": {
                "name": "资产名称"
            },
            "RequestTime": {
                "name": "申请时间"
            },
            "RequestReturnTime": {
                "name": "归还时间"
            },
            "AssetsCode": {
                "name": "资产编号"
            },
            "AssetsState": {
                "name": "状态"
            },
            "RequestId": {
                "name": "操作",
                "content": [{
                    "name": "查看",
                    "onclick": function (_asset) {
                        EAM.AS.WatchAssetState(_asset);
                    }
                }]
            }
        };
        var _css = {
            "UserId": "padding:0",
            "AssetsModel": "padding:0",
            "RequestTime": "padding:0",
            "RequestReturnTime": "padding:0",
            "AssetsCode": "padding:0",
            "AssetsState": "padding:0",
            "RequestId": "padding:0"
        }
        U.MD.UI.table.pageTable(_asset, _titles, _css, size, page, $("#EAM_AS_tablebox")[0]);
        $("#th")[0].style.padding = "0px";
    });
    return;
}
/*
函数作用：时间戳格式化
参数：t 时间
*/
EAM.AS.GetTime = function (t) {
    var _time = new Date(parseInt(t.replace("/Date(", "").replace(")/", "").split("+")[0]));
    _time = _time.getFullYear() + "-" + (_time.getMonth() + 1) + "-" + _time.getDate() + " " + _time.getHours() + ":" + _time.getMinutes() + ":" + _time.getSeconds();
    return _time;
}
/*
函数作用：查看资产申请详情
参数：单条资产申请数据源
*/
EAM.AS.WatchAssetState = function (_asset) {
    //外部容器
    var _box = $$("div", { "style": { "width": "100%", "font-size": "16px", "overflow": "hidden"} });
    var _innerbox = $$("div", { "style": { "width": "80%", "padding": "20px 0 0 0", "font-size": "16px", "margin": "0 auto"} }, _box);
    //生成uform窗体
    var obj = new U.UF.UI.form
    ("资产申请详情",
        _box,
    //窗体属性
        {"id": "returnbox",
        "style":
            { 
                "width": "365px",
                "height": "440px",
                "maxHeight": "700px",
                "position": "fixed",
                "top": "20%",
                "right": "50%"
            }
        }, //窗体功能属性
            {"isenlarge": false },
        //窗体头部样式
        {"style":
            {   
                "text-align": "center",
                "height": "40px",
                "background-color": "#2196f3",
                "font-size": "20px",
                "line-height": "40px"
            }
        }
    );
    obj.form.style.boxShadow = "1px 2px 6px gray";
    obj.form.style.border = "0";
    //借用人
    var _applyer = $$("div", { "innerHTML": "借用人：", "style": { "margin-top": "20px", "display": "inline-block", "width": "60%", "float": "left"} }, _innerbox);
    var _applyertext = $$("div", { "innerHTML": _asset.UserName, "style": { "margin-top": "20px", "display": "inline-block", "width": "40%", "float": "left"} }, _innerbox);
    //资产名称
    var _assetname = $$("div", { "innerHTML": "资产名称：", "style": { "margin-top": "20px", "display": "inline-block", "width": "60%", "float": "left"} }, _innerbox);
    var _assetnametext = $$("div", { "innerHTML": _asset.AssetsModel, "style": { "margin-top": "20px", "display": "inline-block", "width": "40%", "float": "left"} }, _innerbox);
    //归还时间
    var _returndate = $$("div", { "innerHTML": "归还时间：", "style": { "margin-top": "20px", "display": "inline-block", "width": "60%", "float": "left"} }, _innerbox);
    var returndatetext = $$("div", { "innerHTML": _asset.RequestReturnTime, "style": { "margin-top": "20px", "display": "inline-block", "width": "40%", "float": "left"} }, _innerbox);
    //资产编号
    var _assetcode = $$("div", { "innerHTML": "资产编号：", "style": { "margin-top": "20px", "display": "inline-block", "width": "60%", "float": "left"} }, _innerbox);
    var _assetcodetext = $$("div", { "innerHTML": _asset.AssetsCode, "style": { "margin-top": "20px", "display": "inline-block", "width": "40%", "float": "left"} }, _innerbox);
    //状态
    var _statu = $$("div", { "innerHTML": "状态：", "style": { "margin-top": "20px", "display": "inline-block", "width": "60%", "float": "left"} }, _innerbox);
    var _statutext = $$("div", { "innerHTML": _asset.AssetsState, "style": { "margin-top": "20px", "display": "inline-block", "width": "40%", "float": "left"} }, _innerbox);
    //理由
    var _reason = $$("div", { "innerHTML": "理由：", "style": { "margin-top": "20px", "display": "inline-block", "width": "60%", "float": "left"} }, _innerbox);
    if (_asset.AssetsState != "未通过") {
        var _reasontext = $$("div", { "innerHTML": _asset.AssetsReason, "style": { "margin-top": "20px", "display": "inline-block", "width": "40%", "float": "left"} }, _innerbox);
    } else {
        _reason.innerHTML = "驳回理由："
        var _reasontext = $$("div", { "innerHTML": _asset.RejectReason, "style": { "margin-top": "20px", "display": "inline-block", "width": "40%", "float": "left"} }, _innerbox);
    }
    //按钮box
    if (_asset.AssetsState == "已通过") {
        var _buttonbox = $$("div", { "style": { "width": "100%", "font-size": "16px", "margin": "20px auto", "float": "left", "text-align": "center"} }, _box);
        var _returnbutton = $$("button", { "id": _asset.RequestId, "style": { "border-radius": "5px", "font-size": "15px", "color": "white", "border": "1px solid", "background-color": "#169BD5", "margin-top": "20px", "width": "80px", "height": "30px", "cursor": "pointer" }, "innerHTML": "归还" }, _buttonbox);
        //归还按钮onclick事件
        _returnbutton.onclick = function () {
            //获取查看框父级元素并移除其子元素
            var _statebox = this.parentNode.parentNode;
            obj.form.parentNode.removeChild(obj.form);

            EAM.AS.ReturnAsset(this.id);
        }
    }
}
