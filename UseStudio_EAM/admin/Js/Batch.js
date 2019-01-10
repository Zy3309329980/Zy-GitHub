Namespace.register("EAM.B");
var mysql_address = "http://cd.1473.cn/php";
var mysql_ip = "db.1473.cn";
var mysql_database = "UseStudio_Eam";

/**
*函数作用：页面初始化
*
*/
window.onload = function () {
    EAM_Batchmanagement();
};
EAM.B.Button_Application = function () {
    var _AssetsId = JSON.parse(localStorage.getItem("AssetsId"));
    var _datasource = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectAssetDetails", _AssetsId])).value;
    var o = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectAllAssets"])).value;
    var _obj = new U.UF.UI.form("新建批次", $$("div", {
        "id": "testone"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "24%",
            "width": "240px",
            "height": "284px",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "190px",
            "left": "504px",
            "min-height": "360px",
            "opacity": "0.92"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });
    var _odiv = $$("div", { "class": "EAM_B_AddDetails" }, $("#testone")[0]);
    var _main = $$("div", { "class": "EAM_B_AddDetails_Details" }, _odiv)
    // 资产型号   AssetsModel
    var _look = $$("div", { "style": { "width": "300px", "height": "50px", "margin-top": "55px", "innerHTML": "资产编号："} }, _main);
    $$("span", { "innerHTML": "资产型号" }, _look);
    $$("span", { "innerHTML": GetQueryString('name'), "style": { "margin-left": "13px"} }, _look);
    var _select = $$("div", { "style": { "margin-left": "77px", "width": "189px", "margin-top": " -20px"} }, _look);
    // 资产编号
    var _look = $$("div", { "style": { "width": "268px", "height": "50px", "margin-top": "25px", "id": "_mode"} }, _main);
    $$("span", { "innerHTML": "资产编号" }, _look);
    var _value = $$("input", { "style": { "margin-left": "15px", "width": "180px"} }, _look);
    // 批次使用人
    var _look = $$("div", { "style": { "width": "268px", "height": "50px", "margin-top": "25px"} }, _main);
    $$("span", { "innerHTML": "使用人" }, _look);
    var _value2 = $$("input", { "style": { "margin-left": "30px", "width": "180px"} }, _look);
    // 确定按钮 - 向数据库发送数据
    $$("div", { "id": "EAM_B_InsertAssets_Button", "onclick": "EAM.B.InsertAssets()", "innerHTML": "确定" }, _odiv); //单击确定按钮时调用函数并向数据库发送数据
    EAM.B.InsertAssets = function () {
        U.UF.UI.Confirm("确定添加资产？", function () {
            var _size = _select.value;
            var _code = _value.value;
            var _user = _value2.value;
            var _rt = CurentTime();
            if (_code == "" || _user == "") {
                U.Alert("只有孤儿不填哦", 500);
                return;
            }
            for (var i = 0; i < _datasource.length; i++) {
                if (_datasource[i].AssetsCode == _value.value) {
                    U.Alert("资产编码重复! (- v -)");
                    return;
                }

            }
            var res = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectTaskUser", _user])).value;
            console.log(res);
            //for (var i = 0; i < _datasource.length; i++) {
            //if (_datasource[i].UserName == _value2.value) {
            //U.Alert("不要重复添加一个人");
            //return;
            // }

            //}
            if (res[0].result == 'fail') {
                U.Alert("添加失败!这不是有思的人(⊙o⊙)");
                return;
            } else {
                var _uid = res[0].result;
                console.log(_uid);
                var _AssetsId = JSON.parse(localStorage.getItem("AssetsId"));
                U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_InsertAssetDetails", _AssetsId, _code, _uid, '']), function (c) {
                    U.Alert("添加成功!");
                    $(".EAM_B_mainContent")[0].style.display = "block";
                    //$(".EAM_B_NotText")[0].style.display = "none";
                    $("#test")[0].remove();
                    $("#zml")[0].innerHTML = '';
                    EAM_Batchmanagement();
                });
            }

        });
    }
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


/**
* 批次管理
* 编辑
* 删除
* EAM_selectABC 查找
* EAM_bg_UpdateAssetDetails 修改
* EAM_bg_DeleteAssetDetails 删除
*/
function EAM_Batchmanagement() {
    var _AssetsId = JSON.parse(localStorage.getItem("AssetsId"));
    var _l = $('#EAM_B_Table')[0];
    var _datasource = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectAssetDetails", _AssetsId])).value;
    if (_datasource.length == 0) {
        //        U.UF.UI.alertClick("请新建资产！");
        $(".EAM_B_mainContent")[0].style.display = "none";
        //        var _dor = $$("div", { "class": "EAM_B_Not" }, _l);
        //        var _next = $$("div", { "class": "EAM_B_NotText", "innerHTML": "无批次,请新建批次" }, _dor);
    } else {
        $(".EAM_B_Not")[0].style.display = "none";
        var _titles = {
            "AssetsModel": {
                "name": "资产型号"
            },
            "AssetsCode": {
                "name": "资产编码"
            },
            "UserName": {
                "name": "使用人"
            },
            "content": {
                "name": "操作",
                "content": [{
                    "name": $$("input", { "value": "编辑", "type": "button", "class": "EAM_B_AddDetails_BNC" }),
                    "onclick": function (datasource) {
                        var _obj = new U.UF.UI.form("编辑信息", $$("div", {
                            "id": "testone"
                        }), {
                            "style": {
                                "text-align": "center",
                                "min-width": "28%",
                                "width": "355px",
                                "height": "400px",
                                "maxHeight": "700px",
                                "position": "fixed",
                                "top": "25%",
                                "left": "25%",
                                "min-height": "229px"
                            },
                            "id": "test"
                        }, {
                            "isenlarge": false,
                            "isnarrow": false
                        });
                        var odiv = $$("div", { "class": "EAM_B_AddDetails" }, $("#testone")[0]);     //这个用来包裹整个div
                        var main = $$("div", { "class": "EAM_B_AddDetails_Details" }, odiv)

                        var _line2 = $$("div", { "class": "EAM_B_AddDetails_Details_Div" }, main);
                        $$("label", { "class": "EAM_B_AddDetails_Details_Word", "for": "EAM_B_Model", "innerHTML": "资产型号：" }, _line2);
                        var _AssetsModel = $$("div", { "class": "EAM_B_AddDetails_Details_text_a", "id": "Text2", "innerHTML": datasource.AssetsModel }, _line2);

                        var _line3 = $$("div", { "class": "EAM_B_AddDetails_Details_Div" }, main);
                        $$("label", { "class": "EAM_B_AddDetails_Details_Word", "for": "EAM_B_Model", "innerHTML": "资产编号：" }, _line3);
                        var _AssetsCode = $$("input", { "class": "EAM_B_AddDetails_Details_text", "id": "Text3", "value": datasource.AssetsCode }, _line3);
                        var Code = _AssetsCode.value;
                        var _line5 = $$("div", { "class": "EAM_B_AddDetails_Details_Div" }, main);
                        $$("label", { "class": "EAM_B_AddDetails_Details_Word", "for": "EAM_B_Model", "innerHTML": "使用人：" }, _line5);
                        var _UserId = $$("input", { "class": "EAM_B_AddDetails_Details_text", "id": "Text4", "value": datasource.UserName }, _line5);
                        //console.log(_UserId.value);
                        $$("div", { "id": "EAM_B_AddDetails_Button", "onclick": "EAM_B_AddBatchDetails_Button()", "innerHTML": "确定" }, odiv);
                        //编辑
                        EAM_B_AddBatchDetails_Button = function () {
                            //console.log(_UserId.value);

                            var res = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectTaskUser", _UserId.value])).value;
                            for (var i = 0; i < _datasource.length; i++) {
                                if (_datasource[i].AssetsCode == _AssetsCode.value && Code != _AssetsCode.value) {
                                    U.Alert("编码已有了不要重复修改我会崩溃的! (- v -)");
                                    return;
                                } else if (Code == _AssetsCode.value && _datasource[i].UserName == _UserId.value) {
                                    console.log("没有更改");
                                } else if (_datasource[i].AssetsCode == _AssetsCode.value && _datasource[i].UserName != _UserId.value) {
                                    console.log("随便改");
                                }
                            }
                            if (res[0].result == 'fail') {
                                U.Alert("修改失败!这不是有思的人 (~v~)");
                                return;
                            } else {
                                var _uid = res[0].result;
                                U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_UpdateAssetDetails", _AssetsCode.value, _uid, datasource.DetailsId]), function (c) {     //根据所对应的ID清除栏内数据
                                    U.Alert("修改成功");
                                    $("#test")[0].remove();
                                    $("#zml")[0].innerHTML = '';
                                    EAM_Batchmanagement();
                                    return false;
                                });
                            }
                        }
                    }
                }, {
                    "name": $$("input", { "value": "删除", "type": "button", "class": "EAM_B_AddDetails_ANC" }),
                    "onclick": function (datasource) {
                        //删除
                        if ($(".EAM_B_mainContent")[0].style.display == "block") {
                            U.UF.UI.Confirm("确定删除资产？", function () {
                                U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_DeleteAssetDetails", datasource.DetailsId]), function (c) {     //根据所对应的ID清除栏内数据
                                    U.Alert("删除成功!", 30000000000);
                                    location.replace(location);  //刷新页面
                                    return false;
                                });
                                return;
                            });
                        }
                    }
                }]
            }
        };
        var _css = {
            "Content": "width:100px",
            "orderID": "height:50px",
            "Description": "width:400px;white-space:nowrap;"
        };
    }
    U.MD.UI.table.pageTable(_datasource, _titles, _css, 10, 1, document.getElementById("zml"));
}

/**
* 函数作用
* zy
* 总资产管理页面与批次管理页面之间的跳转
*/
EAM_B_ChangeIframe = function () {
    window.parent.$(".EAM_I_Iframe_Cent")[0].src = "admin/Html/Amount.htm";
}


function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

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
