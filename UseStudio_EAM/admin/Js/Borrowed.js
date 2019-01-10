Namespace.register("EAM.B");
var mysql_address = "http://cd.1473.cn/php";
var mysql_ip = "db.1473.cn";
var mysql_database = "UseStudio_Eam";
var z; //存储第一个页面的总数据

/**
*函数作用：页面初始化
*/
window.onload = function () {
    U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Basic/Calendar.js" });
    U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/Basic/Calendar.css", type: "text/css", rel: "stylesheet" });
    EAM.B.Select('');
}
/**
*函数作用：跳转界面
*@type      {String}    类型
*/
EAM.B.Home = function (type) {
    //显示第一个导航栏的内容
    $(".EAM_B_Headright")[0].style.display = "block";
    //去掉导航栏的样式
    var headspan = $(".EAM_B_Headspan");
    for (var i = 0; i < headspan.length; i++) {
        headspan[i].classList.remove("EAM_B_Headspan_Sytle");
    }
    //清空搜索框的值
    $(".EAM_B_Headinput")[0].value = "";
    //根据类型来添加样式
    switch (type) {
        case "applications":
            headspan[0].classList.add("EAM_B_Headspan_Sytle");
            EAM.B.Select('');
            break;
        case "adopt":
            headspan[1].classList.add("EAM_B_Headspan_Sytle");
            EAM.B.Select('2');
            break;
        case "fail":
            headspan[2].classList.add("EAM_B_Headspan_Sytle");
            EAM.B.Select('3');
            break;
        case "audit":
            headspan[3].classList.add("EAM_B_Headspan_Sytle");
            EAM.B.Select('1');
            break;
        case "return":
            headspan[4].classList.add("EAM_B_Headspan_Sytle");
            EAM.B.Select('5');
            break;
    }
}

/**
*函数作用：展示表单内的数据
*@state     {String}    状态
*/
EAM.B.Select = function (state) {
    var main = $(".EAM_B_First")[0];
    //存放时间
    var begintime = $(".EAM_B_Time_BaginTime")[0].value.split(" ")[0];
    var endtime = $(".EAM_B_Time_EndTime")[0].value.split(" ")[0];
    //清空缓存
    main.innerHTML = "";
    var name;   //存放名字
    if ($(".EAM_B_Headinput")[0].value) {//判断搜索框中是否有值
        state = main.states;
        name = $(".EAM_B_Headinput")[0].value.trim();
        if (!$(".EAM_B_return")[0]) {
            $$("span", { "class": "EAM_B_return", "innerHTML": ">返回", "style": { "cursor": "pointer" }, "onclick": function () {
                $(".EAM_B_Headinput")[0].value = "";
                this.parentNode.removeChild(this);
                EAM.B.Select(main.states);
            }
            }, $(".EAM_B_Title")[0]);
        }
    } else {
        name = "";
        if ($(".EAM_B_return")[0]) {
            $(".EAM_B_return")[0].remove();
        }
    }
    main.states = state;
    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectAllAssetsRequestForTime"]), function (r) {
        var _time = r.value;
        if (begintime == "" || endtime == "") {
            begintime = $(".EAM_B_Time_BaginTime")[0].value = _time[0].RequestTime.split(" ")[0];
            endtime = $(".EAM_B_Time_EndTime")[0].value = _time[_time.length - 1].RequestTime.split(" ")[0];
        }
        if (begintime > endtime) {
            U.Alert("开始时间不能大于结束时间");
        } else {
            //后台资产申请界面给获取数据传递分页参数 参数int 从第几条开始,length 读几条数据,state 状态,name 名字,begintime 开始时间,endtime 结束时间
            U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectAllAssetsRequest", state, name, begintime, endtime]), function (c) {
                var datasource = c.value;
                for (var i = 0; i < datasource.length; i++) {
                    if (datasource[i].AssetsState == "1") {
                        datasource[i].AssetsState = "待审核";
                    } else if (datasource[i].AssetsState == "2") {
                        datasource[i].AssetsState = "已通过";
                    } else if (datasource[i].AssetsState == "3") {
                        datasource[i].AssetsState = "未通过";
                    } else if (datasource[i].AssetsState == "4") {
                        datasource[i].AssetsState = "已归还";
                    } else {
                        datasource[i].AssetsState = "未归还";
                    }
                }
                var titiles = {
                    //需要显示的列，和显示在表格中的名字
                    "UserName": {
                        "name": "姓名"
                    },
                    "AssetsModel": {
                        "name": "资产名称"
                    },
                    "RequestTime": {
                        "name": "申请时间"
                    },
                    "AssetsState": {
                        "name": "状态"
                    },
                    "operation": {
                        "name": "操作",
                        "content": [{
                            "name": "点击查看",
                            "onclick": function (datasource) {
                                EAM.B.PopUp(datasource);
                            }
                        }]
                    }
                }
                var css = {

                }
                if (datasource.length <= 0) {
                    U.Alert("暂无资产");
                } else {
                    EAM.B.Table(datasource, titiles, css, 8, 1, main);
                }
            });
        }
    });
}

/**
*函数作用：使用表格控件
*@datatsource    {Json}     表格的数据源
*@titles         {Json}     表格需要显示的列，和别名,还有绑定的事件
*@css            {Json}     表格想对应的列要加入的样式
*@prows          {Number}   每个页面的显示行数
*@index          {Number}   默认显示页面
*@parent         {Obj}      表格生成在什么地方    
*/
EAM.B.Table = function (datasource, titles, css, prows, index, parent) {
    U.MD.UI.table.pageTable(datasource, titles, css, prows, index, parent);
}

/**
*函数作用：资产申请弹窗
*@datasource    {Json}      表格的数据源
*/
EAM.B.PopUp = function (datasource) {
    var _content = $$("div", { "class": "EAM_B_See" }, document.body);
    var _div = $$("div", { "style": { "margin-left": "20%"} }, _content);
    $$("div", { "innerHTML": "姓名：" + datasource.UserName }, _div);
    $$("div", { "innerHTML": "资产名称：" + datasource.AssetsModel }, _div);
    $$("div", { "innerHTML": "申请时间：" + datasource.RequestTime }, _div);
    //判断此时是那种状态
    if (datasource.AssetsState == "待审核") {
        $$("div", { "innerHTML": "状态：" + datasource.AssetsState }, _div);
        $$("div", { "innerHTML": "理由：" + datasource.AssetsReason }, _div);
    } else if (datasource.AssetsState == "已通过") {
        $$("div", { "innerHTML": "批准时间：" + datasource.ApproveTime }, _div);
        $$("div", { "innerHTML": "状态：" + datasource.AssetsState }, _div);
        $$("div", { "innerHTML": "理由：" + datasource.AssetsReason }, _div);
    } else if (datasource.AssetsState == "未通过") {
        $$("div", { "innerHTML": "状态：" + datasource.AssetsState }, _div);
        $$("div", { "innerHTML": "驳回理由：" + datasource.RejectReason }, _div);
    } else if (datasource.AssetsState == "已归还") {
        $$("div", { "innerHTML": "归还时间：" + datasource.RejectReason }, _div);
        $$("div", { "innerHTML": "状态：" + datasource.AssetsState }, _div);
        $$("div", { "innerHTML": "理由：" + datasource.AssetsReason }, _div);
    } else if (datasource.AssetsState == "未归还") {
        $$("div", { "innerHTML": "批准时间：" + datasource.ApproveTime }, _div);
        $$("div", { "innerHTML": "状态：" + datasource.AssetsState }, _div);
        $$("div", { "innerHTML": "理由：" + datasource.AssetsReason }, _div);
    }
    //判断此时点击的是否是"待审核"的状态
    if (datasource.AssetsState == "待审核" || datasource.AssetsState == "未归还") {
        var _button = $$("div", { "class": "EAM_B_See_Button" }, _content);
        var _approval;
        if (datasource.AssetsState == "待审核") {
            _approval = "批准";
        } else {
            _approval = "确定归还";
        }
        //新增元素并添加点击事件
        $$("input", { "type": "button", "class": "EAM_B_See_Button_Approval", "value": _approval, "onclick": function () {
            //删除弹窗
            this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode);
            EAM.B.Handle("approval", datasource, $(".EAM_B_First")[0].states);
        }
        }, _button);
        $$("input", { "type": "button", "class": "EAM_B_See_Button_Reject", "value": "驳回", "onclick": function () {
            //删除弹窗
            this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode);
            EAM.B.Handle("reject", datasource, $(".EAM_B_First")[0].states);
        }
        }, _button);
    }
    //生成查看弹窗
    new U.UF.UI.form("资料申请详情", _content, {
        "style": { "width": "400px", "height": "50%", "minHeight": "500px",
            "text-align": "center", "background-color": "#f9f9f9", "box-shadow": "0px 0px 5px 2px #dcdcdc",
            "border": "none"
        }
    }, { "isenlarge": false, "isnarrow": false });
}

/**
*函数作用：批准与驳回的按钮切换和弹窗
*@type       {String}        类型
*@datasource {String}        考勤
*@state      {String}        当前页面是处在那种状态的页面
*/
EAM.B.Handle = function (type, datasource, state) {
    switch (type) {
        case "approval":
            //添加按钮并加上点击事件
            var _approval = $$("div", { "class": "EAM_B_See_Approval" });
            $$("p", { "innerHTML": "确定批准申请？" }, _approval);
            $$("span", { "innerHTML": "资产编码：", "style": { "font-size": "13px", "margin-left": "60px"} }, _approval);
            $$("input", { "placeholder": "请填写资产编码(8位数字)", "style": { "width": "153px", "cursor": "auto", "color": "#000" }, "class": "EAM_B_See_Approval_reason" }, _approval);
            $$("input", { "type": "button", "value": "确定", "class": "EAM_B_See_Approval_Sure", "onclick": function () {
                var _state;
                var _code = $(".EAM_B_See_Approval_reason")[0].value;
                if (datasource.AssetsState == "待审核") {
                    _state = "2";
                } else {
                    _state = "4";
                }
                if (_code) {
                    if (isNaN(_code) == false && _code.length < 9) {
                        //接受前台是否已批准 参数'2' 已批准状态,id 资产id
                        U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_Bg_UpdateAssignById", _state, datasource.RequestId, "无", _code]), function () {
                            U.Alert("已批准申请");
                            EAM.B.Select(state);
                        });
                        $(".EAM_B_See_Approval_Cancel")[0].style.backgroundColor = "#dcdcdc";
                        this.style.backgroundColor = "#2fa5ff";
                        //删除弹窗
                        this.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode);
                    } else {
                        U.Alert("资产编码必须为数字,并且只能有8位");
                    }
                } else {
                    U.Alert("请填写资产编码");
                }
            }
            }, _approval);
            $$("input", { "type": "button", "value": "取消", "class": "EAM_B_See_Approval_Cancel", "onclick": function () {
                $(".EAM_B_See_Approval_Sure")[0].style.backgroundColor = "#dcdcdc";
                this.style.backgroundColor = "#2fa5ff";
                //删除弹窗
                this.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode);
            }
            }, _approval);
            //生成弹窗
            new U.UF.UI.form("提示框", _approval, {
                "style": { "width": "340px", "height": "190px", "text-align": "center", "background-color": "#f9f9f9", "box-shadow": "0px 0px 5px 2px #dcdcdc",
                    "border": "none"
                }
            }, { "isenlarge": false, "isnarrow": false });
            break;
        case "reject":
            //添加按钮并加上点击事件
            var _reject = $$("div", { "class": "EAM_B_See_Reject" });
            $$("p", { "innerHTML": "确定驳回申请？" }, _reject);
            $$("span", { "innerHTML": "驳回理由：", "style": { "font-size": "13px", "margin-left": "60px"} }, _reject);
            $$("input", { "placeholder": "请输入驳回理由", "style": { "width": "130px", "cursor": "auto", "color": "#000" }, "class": "EAM_B_See_Reject_reason" }, _reject);
            $$("input", { "type": "button", "value": "确定", "class": "EAM_B_See_Reject_Sure", "onclick": function () {
                var _reason = $(".EAM_B_See_Reject_reason")[0].value;
                if (_reason) {
                    //接受前台是否已批准 参数'3' 已批准状态,id 资产id
                    U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_Bg_UpdateAssignById", "3", datasource.RequestId, _reason, "无"]), function () {
                        U.Alert("已驳回申请");
                        EAM.B.Select(state);
                    });
                    $(".EAM_B_See_Reject_Cancel")[0].style.backgroundColor = "#dcdcdc";
                    this.style.backgroundColor = "#2fa5ff";
                    //删除弹窗
                    this.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode);
                } else {
                    U.Alert("请输入驳回理由");
                }
            }
            }, _reject);
            $$("input", { "type": "button", "value": "取消", "class": "EAM_B_See_Reject_Cancel", "onclick": function () {
                $(".EAM_B_See_Reject_Sure")[0].style.backgroundColor = "#dcdcdc";
                this.style.backgroundColor = "#2fa5ff";
                //删除弹窗
                this.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode);
            }
            }, _reject);
            //生成弹窗
            new U.UF.UI.form("提示框", _reject, {
                "style": { "width": "340px", "height": "190px", "text-align": "center", "background-color": "#f9f9f9", "box-shadow": "0px 0px 5px 2px #dcdcdc",
                    "border": "none"
                }
            }, { "isenlarge": false, "isnarrow": false });
            break;
    }
}