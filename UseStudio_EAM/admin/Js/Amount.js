Namespace.register("EAM.A");
var _mysql_address = "http://cd.1473.cn/php";
var _mysql_ip = "db.1473.cn";
var _mysql_database = "UseStudio_Eam";

//调用日历控件
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/PC/U.MD.UI.Calendar.js" }); //引用api.1473.cn日历框架
U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/PC/U.MD.UI.Calendar.css", type: "text/css", rel: "stylesheet" })//引用api.1473.cn日历框架

/**
*函数作用：页面初始化
* '乄' - 当前功能有bug
* '√' - 当前功能可实现
* '×' - 当前功能未实现或已废弃
*/
window.onload = function () {
    EAM.A.Select();
};


/**
* 函数作用：展示数据源
* √
* 总资产管理  
*/
EAM.A.Select = function () {
    // 清空表内数据
    $("#EAM_A_tableContent")[0].innerHTML = "";
    // 使用table控件创建表格展示数据

    U.A.Request(_mysql_address, ([_mysql_ip, _mysql_database, "EAM_bg_SelectAllAssets"]), function (r) {
        var _datasource = r.value; // 表格的数据源
        
        var _place = document.getElementById("EAM_A_tableContent"); // 表格生成的位置
        var _size = "10"; // 每个页面的显示行数
        var _page = "1"; // 默认显示第一页
        var aid;

        var _titles = {
            "AssetsModel": {
                "name": "资产型号"
            },
            "AssetsAllNumber": {
                "name": "资产总数量"
            },
            "AssetsRemainderNumbe": {
                "name": "资产剩余数量"
            },
            "AssetsAddTime": {
                "name": "申请时间"
            },
            "UserName": {
                "name": "资产所有人"
            },
            "AssetsPlace": {
                "name": "存放位置"
            },
            "Operation": {
                "name": "操作",
                "content": [
                    { "name": $$("input", { "value": "批次管理", "type": "button", "class": "EAM_A_BatchManage" }),
                        "onclick": function (_datasource) {
                            /*window.parent.$(".EAM_I_Iframe_Cent")[0].src = "admin/Html/Batch.htm";
                            localStorage.setItem("AssetsId", JSON.stringify(_datasource.AssetsId));*/
                        }
                    },
                    { "name": $$("input", { "value": " 删除", "type": "button", "class": "EAM_A_DeleteBatch" }),
                        "onclick": function (_datasource) {
                            EAM.A.Remove(_datasource.AssetsId);
                        }
                    },
                ]
            }
        }; // 表格需要显示的列和其对应的别名
        var _css = {}; // 表格样式，自动样式
        U.MD.UI.table.pageTable(_datasource, _titles, _css, _size, _page, _place); // 调用表格函数
        var edit = $('.EAM_A_BatchManage');

        for (let j = 0; j < edit.length; j++) {
            edit[j].onclick = function () {
                window.parent.$(".EAM_I_Iframe_Cent")[0].src = "admin/Html/Batch.htm?name="+edit[j].parentNode.parentNode.children[0].children[0].innerHTML;
                localStorage.setItem("AssetsId", JSON.stringify(_datasource[j].AssetsId));
            }
        
        }
    });

    

};

/**
* 函数作用：发送数据到数据库
* √
* 总资产管理 - 新建 —— 向数据库发送数据
*/
EAM.A.InsertAssets = function () {
    $(".EAM_A_Nav")[0].innerHTML = "总资产管理";
    //获取特定的输入框内的值
    var Asstst = U.A.Request("http://cd.1473.cn/net", (["db.1473.cn", "UseStudio_Eam", "EAM_bg_SelectAllAssets"])).value;
    var _AModel = $("#Text1")[0].value;
    var _AAllNumber = $("#Text2")[0].value;
    var _ARNumbe = $("#Text3")[0].value;
    var _AAddTime = $("#Text4")[0].value;
    var _ABelongId = $("#Text5")[0].value;
    var _APlace = $("#Text6")[0].value;
    for (var i = 0; i < Asstst.length; i++) {
        if (Asstst[i].AssetsModel == _AModel) {
            U.Alert("资产重复!(⊙o⊙)");
            return;
        }
    }
   if (_AModel == '' || _AAllNumber == '' || _ARNumbe == '' || _AAddTime == '' || _APlace == '') {
        U.UF.UI.Confirm("所有项为必填项，请认真输入！", function () {
            U.Alert("确定", 500);
        });
    } else {
        var res = U.A.Request("http://cd.1473.cn/php", (["db.1473.cn", "UseStudio_Eam", "EAM_bg_SelectTaskUser", _ABelongId])).value;
        var _uid = res[0].result;
        console.log(_uid);
        // 获取输入框的值发送到数据库
        U.A.Request(_mysql_address, ([_mysql_ip, _mysql_database, "EAM_bg_InsertAssets", _AModel, _AAllNumber, _ARNumbe, _uid, _APlace, _AAddTime]),
            function (r) {
                console.log(r.value);  	//控制台返回的值
                U.Alert("新建成功", 5000);
                //                window.onload();
                $("#test")[0].remove();
                $("#EAM_A_tableContent")[0].innerHTML = "";
                EAM.A.Select();
            });
    }
}

/**
* 函数作用：单击新建按钮时生成相对应的弹窗
* √
* 总资产管理 - 新建 —— 弹窗
*/
EAM.A.Button_Application = function () {
    var _obj = new U.UF.UI.form("新建批次", $$("div", {
        "id": "testone"
    }), {
        "style": {
            "text-align": "center",
            "min-width": "29%",
            "width": "410px",
            "height": "584px",
            "maxHeight": "700px",
            "position": "fixed",
            "top": "106px",
            "left": "504px",
            "min-height": "479px",
            "opacity": "0.92"
        },
        "id": "test"
    }, {
        "isenlarge": false,
        "isnarrow": false
    });

    var _odiv = $$("div", { "class": "EAM_A_AddDetails" }, $("#testone")[0]);     //这个用来包裹整个div
    var _main = $$("div", { "class": "EAM_A_AddDetails_Details" }, _odiv)
    // 资产型号   AssetsModel
    var _line1 = $$("div", { "class": "EAM_A_AddDetails_Details_Div" }, _main);
    $$("span", { "class": "EAM_A_AddIcon", "innerHTML": "*" }, _line1);
    var _systemSelect = $$("label", { "for": "EAM_A_Model", "innerHTML": "资产型号："}, _line1);
    //var _systemSelect = $$("select", { "for": "EAM_A_Model","class": "EAM_A_AddDetails_Details_text_a","id": "Text1"}, _line1);
    $$("input", { "class": "EAM_A_AddDetails_Details_text_a", "id": "Text1", "autocomplete": "off" }, _line1);
//      $$("option" ,{"value":"HP Z440","innerHTML":"HP Z440"}, _systemSelect);
//      $$("option" ,{"value":"HP EilteDesk 880 G7","innerHTML":"HP EilteDesk 880 G7"}, _systemSelect);
//      $$("option" ,{"value":"DELL PrECISION Tower 7810","innerHTML":"DELL PrECISION Tower 7810"}, _systemSelect);
//      $$("option" ,{"value":"DELL Precision 3620","innerHTML":"DELL Precision 3620"}, _systemSelect);
//      $$("option" ,{"value":"HP 498 G3 MT","innerHTML":"HP 498 G3 MT"}, _systemSelect);
    // 资产总数量   AssetsAllNumber
    var _line2 = $$("div", { "class": "EAM_A_AddDetails_Details_Div" }, _main);
    $$("span", { "class": "EAM_A_AddIcon", "innerHTML": "*" }, _line2);
    $$("label", { "class": "EAM_A_AddDetails_Details_Word", "for": "EAM_A_Model", "innerHTML": "资产总数量：" }, _line2);
    $$("input", { "class": "EAM_A_AddDetails_Details_text", "id": "Text2", "autocomplete": "off" }, _line2);
    // 资产剩余数量   AssetsRemainderNumbe
    var _line3 = $$("div", { "class": "EAM_A_AddDetails_Details_Div" }, _main);
    $$("span", { "class": "EAM_A_AddIcon", "innerHTML": "*" }, _line3);
    $$("label", { "class": "EAM_A_AddDetails_Details_Word", "for": "EAM_A_Model", "innerHTML": "资产剩余数量：" }, _line3);
    $$("input", { "class": "EAM_A_AddDetails_Details_text", "id": "Text3", "autocomplete": "off" }, _line3);
    // 申请时间    AssetsAddTime
    var _line4 = $$("div", { "class": "EAM_A_AddDetails_Details_Div" }, _main);
    $$("span", { "class": "EAM_A_AddIcon", "innerHTML": "*" }, _line4);
    $$("label", { "class": "EAM_A_AddDetails_Details_Word", "for": "EAM_A_Model", "innerHTML": "申请时间：" }, _line4);
    var _time = $$("input", { "class": "EAM_A_AddDetails_Details_text", "id": "Text4", "autocomplete": "off" }, _line4);
    _time.onclick = function(e){
        U.MD.UI.Calendar(this,null);
        U.UF.EV.stopBubble(e);
        $(document).bind('click',function(){
            if($(".U_MD_UI_calendar_bigboard")[0]){
                var _con = $(".U_MD_UI_calendar_bigboard")[0];
                if(_con.style.display != 'none'){
                    _con.style.display = 'none';
                }
            }
        },false)
     } 

    // 资产归属人   AssetsBelongId
    var _line5 = $$("div", { "class": "EAM_A_AddDetails_Details_Div" }, _main);
    $$("span", { "class": "EAM_A_AddIcon", "innerHTML": "*" }, _line5);
    $$("label", { "class": "EAM_A_AddDetails_Details_Word", "for": "EAM_A_Model", "innerHTML": "资产归属人：" }, _line5);
    // 资产归属人 - 下拉列表
    var _select = $$("select", { "class": "EAM_A_AddDetails_Details_text", "id": "Text5" }, _line5);
    $$("option", { "value":"徐嘉伟","innerHTML": "徐嘉伟"}, _select);
    $$("option", { "value": "楚王辉", "innerHTML": "楚王辉" }, _select);
    $$("option", { "value": "宫一凡", "innerHTML": "宫一凡" }, _select);

    // 存放位置    AssetsPlace
    var _line6 = $$("div", { "class": "EAM_A_AddDetails_Details_Div" }, _main);
    $$("span", { "class": "EAM_A_AddIcon", "innerHTML": "*" }, _line6);
    $$("label", { "class": "EAM_A_AddDetails_Details_Word", "for": "EAM_A_Model", "innerHTML": "存放位置：" }, _line6);
    $$("input", { "class": "EAM_A_AddDetails_Details_text", "id": "Text6", "autocomplete": "off" }, _line6);

    // 确定按钮 - 向数据库发送数据
    $$("div", { "id": "EAM_A_InsertAssets_Button", "onclick": "EAM.A.InsertAssets()", "innerHTML": "确定" }, _odiv); //单击确定按钮时调用函数并向数据库发送数据
}

/**
* 函数作用：单击删除按钮后删除改行数据
* 乄 
* 总资产管理-删除
*/
EAM.A.Remove = function (e) {
    U.UF.UI.Confirm("确定删除资产？<br><b>注意：此操作将删除整个批次的资产", function () {
        U.A.Request(_mysql_address, ([_mysql_ip, _mysql_database, "EAM_bg_DeleteAssets", e]), function (r) {     //根据所对应的ID清除栏内数据
            U.Alert("删除成功!", 3);
            $("#EAM_A_tableContent")[0].innerHTML = "";
            EAM.A.Select();
        });
    });
}

/**
* 函数作用：传值方法
* 
*/
var currying = function (arg, fn) {
    return function () {
        fn.apply(this, arg);
    }
}