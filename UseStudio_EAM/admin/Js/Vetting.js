Namespace.register("EAM.V");
EAM.V.mysql_address = "http://cd.1473.cn/php";
EAM.V.mysql_ip = "db.1473.cn";
EAM.V.mysql_database = "UseStudio_Eam";

//调用日历控件
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Basic/Calendar.js" });
U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/Basic/Calendar.css", type: "text/css", rel: "stylesheet" });
//调用table(分页)控件
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Complex/Table.js" });
U.UF.DL.asynLoadCss({ "href": "http://api.1473.cn/Css/page.css", type: "text/css", rel: "stylesheet" })
U.UF.DL.asynLoadCss({ "href": "http://api.1473.cn/uform/Table/css/table.css", type: "text/css", rel: "stylesheet" })
window.onload = function () {
    EAM.V.Turn_a(); //显示第一个表（所有申请的表）
}
//所有申请的表
EAM.V.Turn_a = function () {
    var _TimeStart = $("#EAM_V_TimeStart")[0];  //获取EAM_V_TimeStart元素
    var _TimeEnd = $("#EAM_V_TimeEnd")[0];     //获取EAM_V_TimeEnd元素
    var _thing = $("#EAM_V_Search")[0];
    _TimeStart.value = "";  //_TimeStart的值
    _TimeEnd.value = "";    //_TimeEnd的值
    _thing.value="";        //赋值
    $(".EAM_V_Table1")[0].innerHTML='';
    EAM.V.SelectData(); //调用分页 显示第一页

    var _ul = document.getElementById("EAM_V_Header"); //获取EAM_V_Header元素
    var _lis = _ul.getElementsByTagName("div");         //获取ul里的div元素

    var _page1 = document.createElement("div"); //创建div
    _page1.className = "EAM_V_Page1";           //创建div的classname
    _page1.id = "EAM_V_Page1";                  //创建div的id名
    document.getElementById("EAM_V_Table1").appendChild(_page1); //创建节点


    document.getElementById("EAM_V_Table1").style.display = "block"; //显示所有申请
    document.getElementById("EAM_V_Table2").style.display = "none";  //隐藏借出申请
    document.getElementById("EAM_V_Table3").style.display = "none";  //隐藏归还申请

    document.getElementById("EAM_V_Nav1").style.color = "#2fa5ff";   //导航Nav字体颜色（EAM_V_Nav1）
    document.getElementById("EAM_V_Nav1").style.borderBottom = "#2fa5ff 3px solid"; //导航Nav下划线
    document.getElementById("EAM_V_Nav1").style.fontWeight = "bold"; //导航Nav文字加粗

    document.getElementById("EAM_V_Nav2").style.color = "black";     //导航Nav字体颜色（EAM_V_Nav2）
    document.getElementById("EAM_V_Nav2").style.borderBottom = "#2fa5ff 3px hidden";//导航Nav下划线
    document.getElementById("EAM_V_Nav2").style.fontWeight = "normal";//导航Nav文字为正常字体

    document.getElementById("EAM_V_Nav3").style.color = "black";     //导航Nav字体颜色（EAM_V_Nav3）
    document.getElementById("EAM_V_Nav3").style.borderBottom = "#2fa5ff 3px hidden";//导航Nav下划线
    document.getElementById("EAM_V_Nav3").style.fontWeight = "normal";//导航Nav文字为正常字体
    document.getElementById("EAM_V_Search_Icon").onclick = function(){ EAM.V.Search(); }
    //EAM.V.isFocus();
}

//借出申请的表
EAM.V.Turn_b = function () {  //同EAM.V.Turn_ab
    var _TimeStart = $("#EAM_V_TimeStart")[0];    //获取EAM_V_TimeStart元素
    var _TimeEnd = $("#EAM_V_TimeEnd")[0]; ;      //获取EAM_V_TimeEnd元素
    var _thing = $("#EAM_V_Search")[0];           //获取EAM_V_Search元素
    _TimeStart.value = "";                        //赋值
    _TimeEnd.value = "";                          //赋值
    _thing.value="";                              //赋值
    $(".EAM_V_Table2")[0].innerHTML='';
    EAM.V.SelectData2("0",document.getElementById("EAM_V_Table2"));

    var _ul = document.getElementById("EAM_V_Header"); //获取EAM_V_Header元素
    var _lis = _ul.getElementsByTagName("div");        //获取_ul下的div

    var _page2 = document.createElement("div");        //创建一个div
    _page2.className = "EAM_V_Page2";                  //创建div的classname
    _page2.id = "EAM_V_Page2";                         //id
    document.getElementById("EAM_V_Table2").appendChild(_page2);    //生成节点

    //if(document.getElementById("EAM_V_Nav2").style.display == "none" || document.getElementById("EAM_V_Nav2").style.display == "" ){

        document.getElementById("EAM_V_Table1").style.display = "none";  //获取EAM_V_Table1元素 隐藏所有申请
        document.getElementById("EAM_V_Table2").style.display = "block"; //获取EAM_V_Table2元素 显示借出申请
        document.getElementById("EAM_V_Table3").style.display = "none";  //获取EAM_V_Table3元素 隐藏归还申请

        document.getElementById("EAM_V_Nav1").style.color = "black";    //导航Nav字体颜色（EAM_V_Nav1）
        document.getElementById("EAM_V_Nav1").style.borderBottom = "#2fa5ff 3px hidden";//导航Nav下划线
        document.getElementById("EAM_V_Nav1").style.fontWeight = "normal";//导航Nav文字为正常字体

        document.getElementById("EAM_V_Nav2").style.color = "#2fa5ff"; //导航Nav字体颜色（EAM_V_Nav2）
        document.getElementById("EAM_V_Nav2").style.borderBottom = "#2fa5ff 3px solid";//导航Nav下划线
        document.getElementById("EAM_V_Nav2").style.fontWeight = "bold";//导航Nav文字加粗

        document.getElementById("EAM_V_Nav3").style.color = "black";//导航Nav字体颜色（EAM_V_Nav3）
        document.getElementById("EAM_V_Nav3").style.borderBottom = "#2fa5ff 3px hidden";//导航Nav下划线
        document.getElementById("EAM_V_Nav3").style.fontWeight = "normal";//导航Nav文字为正常字体
        //EAM.V.Search2(0,document.getElementById("EAM_V_Table2"));
        //EAM.V.isFocus();
        document.getElementById("EAM_V_Search_Icon").onclick = function(){ $(".EAM_V_Table2")[0].innerHTML=''; EAM.V.Search(); }
        //}
}

//归还申请的表
EAM.V.Turn_c = function () { 
    var _TimeStart = $("#EAM_V_TimeStart")[0];      //获取EAM_V_TimeStart元素
    var _TimeEnd = $("#EAM_V_TimeEnd")[0];          //获取EAM_V_TimeEnd元素
    var _thing = $("#EAM_V_Search")[0];             //获取EAM_V_Search元素
    _TimeStart.value = "";                          //赋值
    _TimeEnd.value = "";                            //赋值
    _thing.value="";                                //赋值
    $(".EAM_V_Table3")[0].innerHTML='';
    EAM.V.SelectData2("1",document.getElementById("EAM_V_Table3")); 

    var _ul = document.getElementById("EAM_V_Header");//获取EAM_V_Header元素
    var _lis = _ul.getElementsByTagName("div");       //获取_ul下的div

    var _page3 = document.createElement("div");       //创建div
    _page3.className = "EAM_V_Page3";                 //div的classname
    _page3.id = "EAM_V_Page3";                        //id
    document.getElementById("EAM_V_Table3").appendChild(_page3);//生成节点

    document.getElementById("EAM_V_Table1").style.display = "none";  //获取EAM_V_Table1元素 隐藏所有申请
    document.getElementById("EAM_V_Table2").style.display = "none";  //获取EAM_V_Table2元素 隐藏借出申请
    document.getElementById("EAM_V_Table3").style.display = "block"; //获取EAM_V_Table3元素 显示归还申请

    document.getElementById("EAM_V_Nav1").style.color = "black";    //导航Nav字体颜色（EAM_V_Nav1）
    document.getElementById("EAM_V_Nav1").style.borderBottom = "#2fa5ff 3px hidden";//导航Nav下划线
    document.getElementById("EAM_V_Nav1").style.fontWeight = "normal";//导航Nav文字为正常字体

    document.getElementById("EAM_V_Nav2").style.color = "black";    //导航Nav字体颜色（EAM_V_Nav2）
    document.getElementById("EAM_V_Nav2").style.borderBottom = "#2fa5ff 3px hidden";//导航Nav下划线
    document.getElementById("EAM_V_Nav2").style.fontWeight = "normal";//导航Nav文字为正常字体

    document.getElementById("EAM_V_Nav3").style.color = "#2fa5ff";  //导航Nav字体颜色（EAM_V_Nav3）
    document.getElementById("EAM_V_Nav3").style.borderBottom = "#2fa5ff 3px solid";//导航Nav下划线
    document.getElementById("EAM_V_Nav3").style.fontWeight = "bold";//导航Nav文字加粗
    //EAM.V.isFocus();
    document.getElementById("EAM_V_Search_Icon").onclick = function(){ $(".EAM_V_Table3")[0].innerHTML=''; EAM.V.Search(); }
}

/*获取虚拟机数据*/
EAM.V.SelectData = function () {
   var _datasource = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectAllVirtualMachineRequest"])).value;
       for(i=0;i<_datasource.length;i++){
            if(_datasource[i].ApplyState == 1){                    //判断状态的值  1-->待审批
                _datasource[i].ApplyState = "待审批";                              
            }else if(_datasource[i].ApplyState == 2){              //2-->已通过
               _datasource[i].ApplyState = "已通过";
            }else if(_datasource[i].ApplyState == 3){              //3-->已拒绝
                _datasource[i].ApplyState = "已拒绝";
            }else if(_datasource[i].ApplyState == 4){              //4-->已归还
                _datasource[i].ApplyState = "已归还";
            }else if(_datasource[i].ApplyState == 5){              //5-->未归还
                _datasource[i].ApplyState = "未归还";
            }
            if(_datasource[i].Genre == 0){                        //判断状态的值  1-->待审批
                _datasource[i].Genre = "借出";                                 
            }else if(_datasource[i].Genre == 1){                  //2-->已通过
               _datasource[i].Genre = "归还";
            }        
                   
       var _titles = {
            "UserName": {           //UserName字段
                "name":"申请人"
            },
            "System": {             //System字段
                "name":"系统"
            },
            "Genre": {              //Genre字段
                "name":"类型"
            },
            "Uses": {               //Uses字段
                "name":"用途"
            },
            "ApplyTime": {          //ApplyTime字段
                "name":"申请日期"
            },
            "ApplyState": {         //ApplyState字段
                "name":"状态"
            },
            "Content": {
               "name":"操作",
               "content": [{    
                "name": "查看",   
                "onclick": function (_datasource) { //点击事件
                    var _formthree = new U.UF.UI.form("申请详情", $$("div", {   //创建窗体
                        "innerHTML": "",
                        "id": "testten"     
                    }), {
                        "style": {                  //窗体样式
                        "text-align": "center",     //文字居中    
                        "width": "400px",           //宽度
                        "height": "500px",          //高度
                        "position": "fixed",        //定位 fixed
                        "top": "15%",               //距离顶端距离
                        "left": "35%",              //距离左边距离
                         },
                        "id": "testthree"               //id
                        }, {
                         "isenlarge": false,
                         "isnarrow": false
                     });
                   var look = $$("div", { "id": "EAM_V_form2" }, $("#testten")[0]); //创建个div在#testten
                   //申请人
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                   var look_name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "检查人:" }, look_group);
                   //申请人名字          
                   var look_nameValue = $$("div", { "id": "look_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.UserName}, look_group);
                   //系统
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                   //系统的值
                   var look_systemValue = $$("div", { "id": "look_systemValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.System}, look_group);
                   //类型
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_genre = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "类型:" }, look_group);
                   //类型的值
                   var look_genreValue = $$("div", { "id": "look_genreValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Genre}, look_group);  
                   //用途
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); //申请人
                   var look_mainUse = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                   //用途的值
                   var look_mainUseValue = $$("div", { "id": "look_mainUseValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                   //申请日期
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_time = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                   //申请日期的值
                   var look_timeValue = $$("div", { "id": "look_timeValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                   //申请状态
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_apply = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                   //申请状态的值
                   var look_applyValue = $$("div", { "id": "look_applyValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                   //理由
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "理由:" }, look_group);
                   //理由的值
                   var look_reasonValue = $$("div", { "id": "look_reasonValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyReason}, look_group);
                   //ip
                   var look_group = $$("div", { "class": "EAM_V_group2" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_ip = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "IP:" }, look_group);
                   //理由的值
                   var look_ipValue = $$("input", { "id": "look_ipValue","style":{"float":"left","margin-left":"30px"},"value":""}, look_group);
                   var look_ipValue2 = $$("div", {"id": "look_ipValue","style":{"display":"none" ,  "float":"left","margin-left":"30px"},"innerHTML":_datasource.IP}, look_group);

                   //同意借出按钮
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"10px","font-size":"16px" } }, look); 
                   var look_agree = $$("button", {"style":{"float":"left","margin-left":"88px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "批准", "onclick": "EAM_A_AddBatchDetails_Button()"}, look_group);
                   //添加按钮点击事件
                   EAM_A_AddBatchDetails_Button = function(){   
                       U.UF.UI.Confirm("确认同意", function () {
                       if(look_ipValue.value == "" || look_ipValue.value == null){ //判断ip值是否为空
                          U.UF.UI.alertClick("请输入IP！");     //如果为空则弹出请输入IP
                       }else{

                       //add
                      var pattIp=/^10\.3\.(1[0-6])\.([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/; //验证输入的ip
                          if(pattIp.test(look_ipValue.value) == false){
                             U.UF.UI.alertClick("请输入IP规范：10.3.（10-16）.0-255!");
                          }else{
                           var _datasource2 = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectAllVirtualMachineRequest"])).value;
                            for(i=0;i<_datasource2.length;i++){
                                if(_datasource2[i].IP == look_ipValue.value){
                                    U.UF.UI.alertClick("此IP申请过了！");
                                    return;
                                } 
                            }
                         U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '2' ,look_ipValue.value]), function () {   
                             U.UF.UI.alertClick("同意成功！");
                             $("#testthree")[0].remove();          //移除元素
                             $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                             EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                             });                               
                         }  
                        //add

                       }
                       });
                   }
                   //驳回申请按钮
                   var look_disagree = $$("button", { "style":{"float":"left","margin-left":"35px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","color":"#000","cursor":"pointer"},"innerHTML": "驳回" }, look_group);
                   look_disagree.onclick = function(){  //驳回申请点击事件
                       U.UF.UI.Confirm("确认驳回", function () {
                           U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '3' , look_ipValue.value]), function () {
                               U.UF.UI.alertClick("驳回成功！");
                               $("#testthree")[0].remove();          //移除元素
                               $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                               EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                           });
                        });
                   }
                   //归还按钮
                   var look_return = $$("button", { "style":{"float":"left","margin-left":"155px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "归还" }, look_group);
                   look_return.onclick = function(){  //归还按钮点击事件
                       U.UF.UI.Confirm("确认归还", function () {
                           U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_UpdateVirtualMachineRequestApplyState4", _datasource.Id]), function () {
                               U.UF.UI.alertClick("归还成功");
                               $("#testthree")[0].remove();          //移除元素
                               $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                               EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                           });
                       });
                   }
                   if(_datasource.ApplyState == "待审批"){              // 1  --> 待审批
                       look_agree.style.display="block";                //修改样式 显示同意按钮
                       look_disagree.style.display="block";             //修改样式 显示驳回按钮
                       look_return.style.display="none";                //修改样式 隐藏归还按钮
                   }else if(_datasource.ApplyState == "已通过"){        // 2  --> 已通过 
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 显示驳回按钮
                       look_ipValue2.style.display="block";             //修改样式 隐藏ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="none";                //修改样式 隐藏归还按钮
                   }else if(_datasource.ApplyState == "已拒绝"){        // 3  --> 已拒绝      
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                       look_ip.style.display="none";                    //修改样式 隐藏ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="none";                //修改样式 藏归还按钮
                   }else if(_datasource.ApplyState == "已归还"){        // 4  --> 已归还 
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                       look_ipValue2.style.display="block";             //修改样式 显示ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="none";                //修改样式 隐藏归还按钮
                   }else if(_datasource.ApplyState == "未归还"){        // 5  --> 未归还
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                       look_ipValue2.style.display="block";             //修改样式 显示ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="block";               //修改样式 显示归还按钮
                   }
                }
                },]
            },
        }
        var _css = {   
        }
  }
    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table1"));   
}

/**
state 字段Genre的类型
div   显示数据的id或者class
**/

EAM.V.SelectData2 = function (state,div) {
   //var _datasource = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectVirtualMachineRequestByGenre0"])).value;
   var _datasource = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectVirtualMachineRequestByGenre0" , state])).value;
       for(i=0;i<_datasource.length;i++){
            if(_datasource[i].ApplyState == 1){               //判断状态的值  1-->待审批
                _datasource[i].ApplyState = "待审批";                                  
            }else if(_datasource[i].ApplyState == 2){         //2-->已通过
               _datasource[i].ApplyState = "已通过";

            }else if(_datasource[i].ApplyState == 3){         //3-->已拒绝
                _datasource[i].ApplyState = "已拒绝";
            }else if(_datasource[i].ApplyState == 4){         //4-->已归还
                _datasource[i].ApplyState = "已归还";
            }else if(_datasource[i].ApplyState == 5){         //5-->未归还
                _datasource[i].ApplyState = "未归还";
            }
            if(_datasource[i].Genre == 0){                   //判断状态的值  0-->借出
                _datasource[i].Genre = "借出";                                 
            }else if(_datasource[i].Genre == 1){             //判断状态的值  1-->归还
                _datasource[i].Genre = "归还";                                 
            }          
       var _titles = {
            "UserName": {           //UserName字段
                "name":"申请人"
            },
            "System": {             //System字段
                "name":"系统"
            },
            "Genre": {              //Genre字段
                "name":"类型"
            },
            "Uses": {               //Uses字段
                "name":"用途"
            },
            "ApplyTime": {          //ApplyTime字段
                "name":"申请日期"
            },
            "ApplyState": {         //ApplyState字段
                "name":"状态"
            },
            "Content": {
               "name":"操作",
               "content": [{    
                "name": "查看",   
                "onclick": function (_datasource) { //点击事件
                    var _formthree = new U.UF.UI.form("申请详情", $$("div", {   //创建窗体
                        "innerHTML": "",
                        "id": "testten"     
                    }), {
                        "style": {                  //窗体样式
                        "text-align": "center",     //文字居中    
                        "width": "400px",           //宽度
                        "height": "500px",          //高度
                        "position": "fixed",        //定位 fixed
                        "top": "15%",               //距离顶端距离
                        "left": "35%",              //距离左边距离
                         },
                        "id": "testthree"               //id
                        }, {
                         "isenlarge": false,
                         "isnarrow": false
                     });
                   var look = $$("div", { "id": "EAM_V_form2" }, $("#testten")[0]); //创建个div在#testten
                   //申请人
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                   var look_name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "检查人:" }, look_group);
                   //申请人名字
                   var look_nameValue = $$("div", { "id": "look_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.UserName}, look_group);
                   //系统
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                   //系统的值
                   var look_systemValue = $$("div", { "id": "look_systemValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.System}, look_group);
                   //类型
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_genre = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "类型:" }, look_group);
                   //类型的值
                   var look_genreValue = $$("div", { "id": "look_genreValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Genre}, look_group);  
                   //用途
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); //申请人
                   var look_mainUse = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                   //用途的值
                   var look_mainUseValue = $$("div", { "id": "look_mainUseValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                   //申请日期
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_time = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                   //申请日期的值
                   var look_timeValue = $$("div", { "id": "look_timeValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                   //申请状态
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_apply = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                   //申请状态的值
                   var look_applyValue = $$("div", { "id": "look_applyValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                   //理由
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "理由:" }, look_group);
                   //理由的值
                   var look_reasonValue = $$("div", { "id": "look_reasonValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyReason}, look_group);
                   //ip
                   var look_group = $$("div", { "class": "EAM_V_group2" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                   var look_ip = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "IP:" }, look_group);
                   //理由的值
                   var look_ipValue = $$("input", { "id": "look_ipValue","style":{"float":"left","margin-left":"30px"},"value":""}, look_group);
                   var look_ipValue2 = $$("div", {"id": "look_ipValue","style":{"display":"none" ,  "float":"left","margin-left":"30px"},"innerHTML":_datasource.IP}, look_group);
                   //同意借出按钮
                   var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"10px","font-size":"16px" } }, look); 
                   var look_agree = $$("button", {"style":{"float":"left","margin-left":"88px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "批准", "onclick": "EAM_A_AddBatchDetails_Button()"}, look_group);
                   //添加按钮点击事件
                   EAM_A_AddBatchDetails_Button = function(){   
                       U.UF.UI.Confirm("确认同意", function () {
                       if(look_ipValue.value == "" || look_ipValue.value == null){ //判断ip值是否为空
                          U.UF.UI.alertClick("请输入IP！");     //如果为空则弹出请输入IP
                       }else{

                       //add
                      var pattIp=/^10\.3\.(1[0-6])\.([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/; //验证输入的ip
                          if(pattIp.test(look_ipValue.value) == false){
                             U.UF.UI.alertClick("请输入IP规范：10.3.（10-16）.0-255!");
                          }else{
                           var _datasource2 = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectAllVirtualMachineRequest"])).value;
                            for(i=0;i<_datasource2.length;i++){
                                if(_datasource2[i].IP == look_ipValue.value){
                                    U.UF.UI.alertClick("此IP申请过了！");
                                    return;
                                } 
                            }
                         U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '2' ,look_ipValue.value]), function () {   
                             U.UF.UI.alertClick("同意成功！");
                             $("#testthree")[0].remove();          //移除元素
                             $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                             EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                             });                               
                         }  
                        //add

                       }
                       });
                   }
                   //驳回申请按钮
                   var look_disagree = $$("button", { "style":{"float":"left","margin-left":"35px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","color":"#000","cursor":"pointer"},"innerHTML": "驳回" }, look_group);
                   look_disagree.onclick = function(){  //驳回申请点击事件
                       U.UF.UI.Confirm("确认驳回", function () {
                           U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '3' , look_ipValue.value]), function () {
                               U.UF.UI.alertClick("驳回成功！");
                               $("#testthree")[0].remove();          //移除元素
                               $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                               EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                           });
                        });
                   }
                   //归还按钮
                   var look_return = $$("button", { "style":{"float":"left","margin-left":"155px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "归还" }, look_group);
                   look_return.onclick = function(){  //归还按钮点击事件
                       U.UF.UI.Confirm("确认归还", function () {
                           U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_UpdateVirtualMachineRequestApplyState4", _datasource.Id]), function () {
                               U.UF.UI.alertClick("归还成功");
                               $("#testthree")[0].remove();          //移除元素
                               $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                               EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                           });
                       });
                   }
                   if(_datasource.ApplyState == "待审批"){              // 1  --> 待审批
                       look_agree.style.display="block";                //修改样式 显示同意按钮
                       look_disagree.style.display="block";             //修改样式 显示驳回按钮
                       look_return.style.display="none";                //修改样式 隐藏归还按钮
                   }else if(_datasource.ApplyState == "已通过"){        // 2  --> 已通过 
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 显示驳回按钮
                       look_ipValue2.style.display="block";             //修改样式 隐藏ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="none";                //修改样式 隐藏归还按钮
                   }else if(_datasource.ApplyState == "已拒绝"){        // 3  --> 已拒绝      
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                       look_ip.style.display="none";                    //修改样式 隐藏ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="none";                //修改样式 藏归还按钮
                   }else if(_datasource.ApplyState == "已归还"){        // 4  --> 已归还 
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                       look_ipValue2.style.display="block";             //修改样式 显示ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="none";                //修改样式 隐藏归还按钮
                   }else if(_datasource.ApplyState == "未归还"){        // 5  --> 未归还
                       look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                       look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                       look_ipValue2.style.display="block";             //修改样式 显示ip
                       look_ipValue.style.display="none";               //修改样式 隐藏ip值
                       look_return.style.display="block";               //修改样式 显示归还按钮
                   }
                }
                },]     
            },
        }
        var _css = {   
        }
  }
    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,div);     
}





/**
搜索 根据选择的时间端来查看本用户的数据
**/
EAM.V.Search = function(){
    $("#EAM_V_Table1")[0].innerHTML = '';   //清空数据
    var _sT = document.getElementById("EAM_V_TimeStart"); //选择的开始时间
    var _eT = document.getElementById("EAM_V_TimeEnd");   //选择的结束时间
    var _person = document.getElementById("EAM_V_Search"); //搜索框输入的值

    if(_person.value == ""){
        var _datasource = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SearchTime", _sT.value , _eT.value])).value; 
        if(_datasource.length == 0){
            U.UF.UI.alertClick("查无信息！");
            if($("#EAM_V_Nav1")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table1")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData();                   //执行EAM.V.SelectData()                
            }else if($("#EAM_V_Nav2")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table2")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData2("0",document.getElementById("EAM_V_Table2"));                   //执行EAM.V.SelectData()             
            }else if($("#EAM_V_Nav3")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table3")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData2("0",document.getElementById("EAM_V_Table3"));              //执行EAM.V.SelectData()      
            } 
       }else{
                 for(i=0;i<_datasource.length;i++){
                    if(_datasource[i].ApplyState == 1){            //判断状态的值  1-->待审批
                        _datasource[i].ApplyState = "待审批";                              
                    }else if(_datasource[i].ApplyState == 2){      //2-->已通过
                        _datasource[i].ApplyState = "已通过";
                    }else if(_datasource[i].ApplyState == 3){      //3-->已拒绝
                        _datasource[i].ApplyState = "已拒绝";
                    }else if(_datasource[i].ApplyState == 4){      //4-->已归还
                        _datasource[i].ApplyState = "已归还";
                    }else if(_datasource[i].ApplyState == 5){      //5-->未归还
                        _datasource[i].ApplyState = "未归还";
                    }
                    if(_datasource[i].Genre == 0){                //判断状态的值  1-->待审批
                        _datasource[i].Genre = "借出";                                 
                    }else if(_datasource[i].Genre == 1){          //2-->已通过
                        _datasource[i].Genre = "归还";
                    } 
                }

                     var _titles = {              
                           "UserName": {       //UserName字段
                             "name":"申请人"
                         },
                           "System": {         //System字段
                             "name":"系统"
                         },
                           "Genre": {          //Genre字段
                             "name":"类型"
                         },  
                           "Uses": {           //Uses字段
                             "name":"用途"
                         },
                           "ApplyTime": {      //ApplyTime字段
                             "name":"申请日期"
                         },
                           "ApplyState": {     //ApplyState字段
                             "name":"状态"
                         },
                         "Content": {
                          "name":"操作",
                          "content": [{    
                             "name": "查看",   
                               "onclick": function (_datasource) {  //点击事件
                                       var _formthree = new U.UF.UI.form("申请详情", $$("div", {   //创建窗体
                                         "innerHTML": "",
                                         "id": "testten"     
                                     }), {
                                           "style": {                  //窗体样式
                                           "text-align": "center",     //文字居中    
                                           "width": "400px",           //宽度
                                           "height": "500px",          //高度
                                           "position": "fixed",        //定位 fixed
                                           "top": "15%",               //距离顶端距离
                                           "left": "35%",              //距离左边距离
                                       },
                                           "id": "testthree"               //id
                                       }, {
                                        "isenlarge": false,
                                        "isnarrow": false
                                    });
                                      var look = $$("div", { "id": "EAM_V_form2" }, $("#testten")[0]); //创建个div在#testten
                                      //申请人
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                                      var look_name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "检查人:" }, look_group);
                                      //申请人名字          
                                      var look_nameValue = $$("div", { "id": "look_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.UserName}, look_group);
                                      //系统
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                                      //系统的值
                                      var look_systemValue = $$("div", { "id": "look_systemValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.System}, look_group);
                                      //类型
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_genre = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "类型:" }, look_group);
                                      //类型的值
                                      var look_genreValue = $$("div", { "id": "look_genreValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Genre}, look_group);  
                                      //用途
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); //申请人
                                      var look_mainUse = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                                      //用途的值
                                      var look_mainUseValue = $$("div", { "id": "look_mainUseValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                                      //申请日期
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_time = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                                      //申请日期的值
                                      var look_timeValue = $$("div", { "id": "look_timeValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                                      //申请状态
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_apply = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                                      //申请状态的值
                                      var look_applyValue = $$("div", { "id": "look_applyValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                                      //理由
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "理由:" }, look_group);
                                      //理由的值
                                      var look_reasonValue = $$("div", { "id": "look_reasonValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyReason}, look_group);
                                      //ip
                                      var look_group = $$("div", { "class": "EAM_V_group2" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_ip = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "IP:" }, look_group);
                                      //理由的值
                                      var look_ipValue = $$("input", { "id": "look_ipValue","style":{"float":"left","margin-left":"30px"},"value":""}, look_group);
                                      var look_ipValue2 = $$("div", {"id": "look_ipValue","style":{"display":"none" ,  "float":"left","margin-left":"30px"},"innerHTML":_datasource.IP}, look_group);

                                      //同意借出按钮
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"10px","font-size":"16px" } }, look); 
                                      var look_agree = $$("button", {"style":{"float":"left","margin-left":"88px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "批准", "onclick": "EAM_A_AddBatchDetails_Button()"}, look_group);
                                      //添加按钮点击事件
                                       EAM_A_AddBatchDetails_Button = function(){   
                                           U.UF.UI.Confirm("确认同意", function () {
                                           if(look_ipValue.value == "" || look_ipValue.value == null){ //判断ip值是否为空
                                              U.UF.UI.alertClick("请输入IP！");     //如果为空则弹出请输入IP
                                           }else{

                                           //add
                                          var pattIp=/^10\.3\.(1[0-6])\.([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/; //验证输入的ip
                                              if(pattIp.test(look_ipValue.value) == false){
                                                 U.UF.UI.alertClick("请输入IP规范：10.3.（10-16）.0-255!");
                                              }else{
                                               var _datasource2 = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectAllVirtualMachineRequest"])).value;
                                                for(i=0;i<_datasource2.length;i++){
                                                    if(_datasource2[i].IP == look_ipValue.value){
                                                        U.UF.UI.alertClick("此IP申请过了！");
                                                        return;
                                                    } 
                                                }
                                             U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '2' ,look_ipValue.value]), function () {   
                                                 U.UF.UI.alertClick("同意成功！");
                                                 $("#testthree")[0].remove();          //移除元素
                                                 $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                 EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                                 });                               
                                             }  
                                            //add

                                           }
                                           });
                                       }
                                      //驳回申请按钮
                                      var look_disagree = $$("button", { "style":{"float":"left","margin-left":"35px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","color":"#000","cursor":"pointer"},"innerHTML": "驳回" }, look_group);
                                      look_disagree.onclick = function(){  //驳回申请点击事件
                                          U.UF.UI.Confirm("确认驳回", function () {
                                              U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '3' , look_ipValue.value]), function () {
                                                  U.UF.UI.alertClick("驳回成功！");
                                                  $("#testthree")[0].remove();          //移除元素
                                                  $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                  EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                              });
                                          });
                                      }
                                      //归还按钮
                                      var look_return = $$("button", { "style":{"float":"left","margin-left":"155px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "归还" }, look_group);
                                      look_return.onclick = function(){  //归还按钮点击事件
                                          U.UF.UI.Confirm("确认归还", function () {
                                              U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_UpdateVirtualMachineRequestApplyState4", _datasource.Id]), function () {
                                                  U.UF.UI.alertClick("归还成功");
                                                  $("#testthree")[0].remove();          //移除元素
                                                  $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                  EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                              });
                                          });
                                      }
                                      if(_datasource.ApplyState == "待审批"){              // 1  --> 待审批
                                          look_agree.style.display="block";                //修改样式 显示同意按钮
                                          look_disagree.style.display="block";             //修改样式 显示驳回按钮
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "已通过"){        // 2  --> 已通过 
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 显示驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 隐藏ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "已拒绝"){        // 3  --> 已拒绝      
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ip.style.display="none";                    //修改样式 隐藏ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 藏归还按钮
                                      }else if(_datasource.ApplyState == "已归还"){        // 4  --> 已归还 
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 显示ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "未归还"){        // 5  --> 未归还
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 显示ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="block";               //修改样式 显示归还按钮
                                      }
                                  }
                              },]
                          },
                      }
                      var _css = {   
                      }
                  if($("#EAM_V_Nav1")[0].style.color == "rgb(47, 165, 255)"){
                     U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table1"));
                  }else if($("#EAM_V_Nav2")[0].style.color == "rgb(47, 165, 255)"){
                    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table2"));
                  }else if($("#EAM_V_Nav3")[0].style.color == "rgb(47, 165, 255)"){
                    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table3"));
                  }
                  
        }
    }else if(_sT.value == "" ||  _eT.value == ""){
        var _datasource = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SearchName", _person.value])).value;  
        if(_datasource.length == 0){
            U.UF.UI.alertClick("查无信息！");
            if($("#EAM_V_Nav1")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table1")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData();                   //执行EAM.V.SelectData()                
            }else if($("#EAM_V_Nav2")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table2")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData2("0",document.getElementById("EAM_V_Table2"));                   //执行EAM.V.SelectData()             
            }else if($("#EAM_V_Nav3")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table3")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData2("1",document.getElementById("EAM_V_Table3"));                   //执行EAM.V.SelectData()      
            } 
        }else{
                 for(i=0;i<_datasource.length;i++){
                    if(_datasource[i].ApplyState == 1){            //判断状态的值  1-->待审批
                        _datasource[i].ApplyState = "待审批";                              
                    }else if(_datasource[i].ApplyState == 2){      //2-->已通过
                        _datasource[i].ApplyState = "已通过";
                    }else if(_datasource[i].ApplyState == 3){      //3-->已拒绝
                        _datasource[i].ApplyState = "已拒绝";
                    }else if(_datasource[i].ApplyState == 4){      //4-->已归还
                        _datasource[i].ApplyState = "已归还";
                    }else if(_datasource[i].ApplyState == 5){      //5-->未归还
                        _datasource[i].ApplyState = "未归还";
                    }
                    if(_datasource[i].Genre == 0){                //判断状态的值  1-->待审批
                        _datasource[i].Genre = "借出";                                 
                    }else if(_datasource[i].Genre == 1){          //2-->已通过
                        _datasource[i].Genre = "归还";
                    } 
                }

                     var _titles = {              
                           "UserName": {       //UserName字段
                             "name":"申请人"
                         },
                           "System": {         //System字段
                             "name":"系统"
                         },
                           "Genre": {          //Genre字段
                             "name":"类型"
                         },  
                           "Uses": {           //Uses字段
                             "name":"用途"
                         },
                           "ApplyTime": {      //ApplyTime字段
                             "name":"申请日期"
                         },
                           "ApplyState": {     //ApplyState字段
                             "name":"状态"
                         },
                         "Content": {
                          "name":"操作",
                          "content": [{    
                             "name": "查看",   
                               "onclick": function (_datasource) {  //点击事件
                                       var _formthree = new U.UF.UI.form("申请详情", $$("div", {   //创建窗体
                                         "innerHTML": "",
                                         "id": "testten"     
                                     }), {
                                           "style": {                  //窗体样式
                                           "text-align": "center",     //文字居中    
                                           "width": "400px",           //宽度
                                           "height": "500px",          //高度
                                           "position": "fixed",        //定位 fixed
                                           "top": "15%",               //距离顶端距离
                                           "left": "35%",              //距离左边距离
                                       },
                                           "id": "testthree"               //id
                                       }, {
                                        "isenlarge": false,
                                        "isnarrow": false
                                    });
                                      var look = $$("div", { "id": "EAM_V_form2" }, $("#testten")[0]); //创建个div在#testten
                                      //申请人
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                                      var look_name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "检查人:" }, look_group);
                                      //申请人名字          
                                      var look_nameValue = $$("div", { "id": "look_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.UserName}, look_group);
                                      //系统
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                                      //系统的值
                                      var look_systemValue = $$("div", { "id": "look_systemValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.System}, look_group);
                                      //类型
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_genre = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "类型:" }, look_group);
                                      //类型的值
                                      var look_genreValue = $$("div", { "id": "look_genreValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Genre}, look_group);  
                                      //用途
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); //申请人
                                      var look_mainUse = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                                      //用途的值
                                      var look_mainUseValue = $$("div", { "id": "look_mainUseValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                                      //申请日期
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_time = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                                      //申请日期的值
                                      var look_timeValue = $$("div", { "id": "look_timeValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                                      //申请状态
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_apply = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                                      //申请状态的值
                                      var look_applyValue = $$("div", { "id": "look_applyValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                                      //理由
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "理由:" }, look_group);
                                      //理由的值
                                      var look_reasonValue = $$("div", { "id": "look_reasonValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyReason}, look_group);
                                      //ip
                                      var look_group = $$("div", { "class": "EAM_V_group2" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_ip = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "IP:" }, look_group);
                                      //理由的值
                                      var look_ipValue = $$("input", { "id": "look_ipValue","style":{"float":"left","margin-left":"30px"},"value":""}, look_group);
                                      var look_ipValue2 = $$("div", {"id": "look_ipValue","style":{"display":"none" ,  "float":"left","margin-left":"30px"},"innerHTML":_datasource.IP}, look_group);

                                      //同意借出按钮
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"10px","font-size":"16px" } }, look); 
                                      var look_agree = $$("button", {"style":{"float":"left","margin-left":"88px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "批准", "onclick": "EAM_A_AddBatchDetails_Button()"}, look_group);
                                      //添加按钮点击事件
                                       EAM_A_AddBatchDetails_Button = function(){   
                                           U.UF.UI.Confirm("确认同意", function () {
                                           if(look_ipValue.value == "" || look_ipValue.value == null){ //判断ip值是否为空
                                              U.UF.UI.alertClick("请输入IP！");     //如果为空则弹出请输入IP
                                           }else{

                                           //add
                                          var pattIp=/^10\.3\.(1[0-6])\.([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/; //验证输入的ip
                                              if(pattIp.test(look_ipValue.value) == false){
                                                 U.UF.UI.alertClick("请输入IP规范：10.3.（10-16）.0-255!");
                                              }else{
                                               var _datasource2 = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectAllVirtualMachineRequest"])).value;
                                                for(i=0;i<_datasource2.length;i++){
                                                    if(_datasource2[i].IP == look_ipValue.value){
                                                        U.UF.UI.alertClick("此IP申请过了！");
                                                        return;
                                                    } 
                                                }
                                             U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '2' ,look_ipValue.value]), function () {   
                                                 U.UF.UI.alertClick("同意成功！");
                                                 $("#testthree")[0].remove();          //移除元素
                                                 $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                 EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                                 });                               
                                             }  
                                            //add

                                           }
                                           });
                                       }
                                      //驳回申请按钮
                                      var look_disagree = $$("button", { "style":{"float":"left","margin-left":"35px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","color":"#000","cursor":"pointer"},"innerHTML": "驳回" }, look_group);
                                      look_disagree.onclick = function(){  //驳回申请点击事件
                                          U.UF.UI.Confirm("确认驳回", function () {
                                              U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '3' , look_ipValue.value]), function () {
                                                  U.UF.UI.alertClick("驳回成功！");
                                                  $("#testthree")[0].remove();          //移除元素
                                                  $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                  EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                              });
                                          });
                                      }
                                      //归还按钮
                                      var look_return = $$("button", { "style":{"float":"left","margin-left":"155px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "归还" }, look_group);
                                      look_return.onclick = function(){  //归还按钮点击事件
                                          U.UF.UI.Confirm("确认归还", function () {
                                              U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_UpdateVirtualMachineRequestApplyState4", _datasource.Id]), function () {
                                                  U.UF.UI.alertClick("归还成功");
                                                  $("#testthree")[0].remove();          //移除元素
                                                  $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                  EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                              });
                                          });
                                      }
                                      if(_datasource.ApplyState == "待审批"){              // 1  --> 待审批
                                          look_agree.style.display="block";                //修改样式 显示同意按钮
                                          look_disagree.style.display="block";             //修改样式 显示驳回按钮
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "已通过"){        // 2  --> 已通过 
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 显示驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 隐藏ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "已拒绝"){        // 3  --> 已拒绝      
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ip.style.display="none";                    //修改样式 隐藏ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 藏归还按钮
                                      }else if(_datasource.ApplyState == "已归还"){        // 4  --> 已归还 
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 显示ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "未归还"){        // 5  --> 未归还
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 显示ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="block";               //修改样式 显示归还按钮
                                      }
                                  }
                              },]
                          },
                      }
                      var _css = {   
                      }
                  if($("#EAM_V_Nav1")[0].style.color == "rgb(47, 165, 255)"){
                     U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table1"));
                  }else if($("#EAM_V_Nav2")[0].style.color == "rgb(47, 165, 255)"){
                    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table2"));
                  }else if($("#EAM_V_Nav3")[0].style.color == "rgb(47, 165, 255)"){
                    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table3"));
                  }
        }
    }else{
        var _datasource = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SearchUserNameAndTime", _sT.value , _eT.value , _person.value])).value; 
        if(_datasource.length == 0){
            U.UF.UI.alertClick("查无信息！");
            if($("#EAM_V_Nav1")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table1")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData();                   //执行EAM.V.SelectData()                
            }else if($("#EAM_V_Nav2")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table2")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData2("0",document.getElementById("EAM_V_Table2"));                   //执行EAM.V.SelectData()             
            }else if($("#EAM_V_Nav3")[0].style.color == "rgb(47, 165, 255)"){
                $("#EAM_V_Table3")[0].innerHTML = ''; //清楚数据
                EAM.V.SelectData2("1",document.getElementById("EAM_V_Table3"));                   //执行EAM.V.SelectData()      
            } 
        }else{
                 for(i=0;i<_datasource.length;i++){
                    if(_datasource[i].ApplyState == 1){            //判断状态的值  1-->待审批
                        _datasource[i].ApplyState = "待审批";                              
                    }else if(_datasource[i].ApplyState == 2){      //2-->已通过
                        _datasource[i].ApplyState = "已通过";
                    }else if(_datasource[i].ApplyState == 3){      //3-->已拒绝
                        _datasource[i].ApplyState = "已拒绝";
                    }else if(_datasource[i].ApplyState == 4){      //4-->已归还
                        _datasource[i].ApplyState = "已归还";
                    }else if(_datasource[i].ApplyState == 5){      //5-->未归还
                        _datasource[i].ApplyState = "未归还";
                    }
                    if(_datasource[i].Genre == 0){                //判断状态的值  1-->待审批
                        _datasource[i].Genre = "借出";                                 
                    }else if(_datasource[i].Genre == 1){          //2-->已通过
                        _datasource[i].Genre = "归还";
                    } 
                }

                     var _titles = {              
                           "UserName": {       //UserName字段
                             "name":"申请人"
                         },
                           "System": {         //System字段
                             "name":"系统"
                         },
                           "Genre": {          //Genre字段
                             "name":"类型"
                         },  
                           "Uses": {           //Uses字段
                             "name":"用途"
                         },
                           "ApplyTime": {      //ApplyTime字段
                             "name":"申请日期"
                         },
                           "ApplyState": {     //ApplyState字段
                             "name":"状态"
                         },
                         "Content": {
                          "name":"操作",
                          "content": [{    
                             "name": "查看",   
                               "onclick": function (_datasource) {  //点击事件
                                       var _formthree = new U.UF.UI.form("申请详情", $$("div", {   //创建窗体
                                         "innerHTML": "",
                                         "id": "testten"     
                                     }), {
                                           "style": {                  //窗体样式
                                           "text-align": "center",     //文字居中    
                                           "width": "400px",           //宽度
                                           "height": "500px",          //高度
                                           "position": "fixed",        //定位 fixed
                                           "top": "15%",               //距离顶端距离
                                           "left": "35%",              //距离左边距离
                                       },
                                           "id": "testthree"               //id
                                       }, {
                                        "isenlarge": false,
                                        "isnarrow": false
                                    });
                                      var look = $$("div", { "id": "EAM_V_form2" }, $("#testten")[0]); //创建个div在#testten
                                      //申请人
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                                      var look_name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "检查人:" }, look_group);
                                      //申请人名字          
                                      var look_nameValue = $$("div", { "id": "look_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.UserName}, look_group);
                                      //系统
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                                      //系统的值
                                      var look_systemValue = $$("div", { "id": "look_systemValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.System}, look_group);
                                      //类型
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_genre = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "类型:" }, look_group);
                                      //类型的值
                                      var look_genreValue = $$("div", { "id": "look_genreValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Genre}, look_group);  
                                      //用途
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); //申请人
                                      var look_mainUse = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                                      //用途的值
                                      var look_mainUseValue = $$("div", { "id": "look_mainUseValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                                      //申请日期
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_time = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                                      //申请日期的值
                                      var look_timeValue = $$("div", { "id": "look_timeValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                                      //申请状态
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_apply = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                                      //申请状态的值
                                      var look_applyValue = $$("div", { "id": "look_applyValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                                      //理由
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "理由:" }, look_group);
                                      //理由的值
                                      var look_reasonValue = $$("div", { "id": "look_reasonValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyReason}, look_group);
                                      //ip
                                      var look_group = $$("div", { "class": "EAM_V_group2" , "style":{"width":"400px","height":"20px","margin-top":"30px","font-size":"16px" } }, look); 
                                      var look_ip = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "IP:" }, look_group);
                                      //理由的值
                                      var look_ipValue = $$("input", { "id": "look_ipValue","style":{"float":"left","margin-left":"30px"},"value":""}, look_group);
                                      var look_ipValue2 = $$("div", {"id": "look_ipValue","style":{"display":"none" ,  "float":"left","margin-left":"30px"},"innerHTML":_datasource.IP}, look_group);

                                      //同意借出按钮
                                      var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"10px","font-size":"16px" } }, look); 
                                      var look_agree = $$("button", {"style":{"float":"left","margin-left":"88px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "批准", "onclick": "EAM_A_AddBatchDetails_Button()"}, look_group);
                                      //添加按钮点击事件
                                       EAM_A_AddBatchDetails_Button = function(){   
                                           U.UF.UI.Confirm("确认同意", function () {
                                           if(look_ipValue.value == "" || look_ipValue.value == null){ //判断ip值是否为空
                                              U.UF.UI.alertClick("请输入IP！");     //如果为空则弹出请输入IP
                                           }else{

                                           //add
                                          var pattIp=/^10\.3\.(1[0-6])\.([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/; //验证输入的ip
                                              if(pattIp.test(look_ipValue.value) == false){
                                                 U.UF.UI.alertClick("请输入IP规范：10.3.（10-16）.0-255!");
                                              }else{
                                               var _datasource2 = U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_SelectAllVirtualMachineRequest"])).value;
                                                for(i=0;i<_datasource2.length;i++){
                                                    if(_datasource2[i].IP == look_ipValue.value){
                                                        U.UF.UI.alertClick("此IP申请过了！");
                                                        return;
                                                    } 
                                                }
                                             U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '2' ,look_ipValue.value]), function () {   
                                                 U.UF.UI.alertClick("同意成功！");
                                                 $("#testthree")[0].remove();          //移除元素
                                                 $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                 EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                                 });                               
                                             }  
                                            //add

                                           }
                                           });
                                       }
                                      //驳回申请按钮
                                      var look_disagree = $$("button", { "style":{"float":"left","margin-left":"35px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","color":"#000","cursor":"pointer"},"innerHTML": "驳回" }, look_group);
                                      look_disagree.onclick = function(){  //驳回申请点击事件
                                          U.UF.UI.Confirm("确认驳回", function () {
                                              U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_AgreeVirtualMachineflow", _datasource.Id, '3' , look_ipValue.value]), function () {
                                                  U.UF.UI.alertClick("驳回成功！");
                                                  $("#testthree")[0].remove();          //移除元素
                                                  $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                  EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                              });
                                          });
                                      }
                                      //归还按钮
                                      var look_return = $$("button", { "style":{"float":"left","margin-left":"155px","width":"100px","height":"35px","border-radius":"5px","border":"1px solid #a0a0a0","background-color":"#2fa5ff","color":"#fff","cursor":"pointer"},"innerHTML": "归还" }, look_group);
                                      look_return.onclick = function(){  //归还按钮点击事件
                                          U.UF.UI.Confirm("确认归还", function () {
                                              U.A.Request(EAM.V.mysql_address, ([EAM.V.mysql_ip, EAM.V.mysql_database, "EAM_bg_UpdateVirtualMachineRequestApplyState4", _datasource.Id]), function () {
                                                  U.UF.UI.alertClick("归还成功");
                                                  $("#testthree")[0].remove();          //移除元素
                                                  $("#EAM_V_Table1")[0].innerHTML='';   //清空数据
                                                  EAM.V.Turn_a();                       //再执行EAM.V.Turn_a()
                                              });
                                          });
                                      }
                                      if(_datasource.ApplyState == "待审批"){              // 1  --> 待审批
                                          look_agree.style.display="block";                //修改样式 显示同意按钮
                                          look_disagree.style.display="block";             //修改样式 显示驳回按钮
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "已通过"){        // 2  --> 已通过 
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 显示驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 隐藏ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "已拒绝"){        // 3  --> 已拒绝      
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ip.style.display="none";                    //修改样式 隐藏ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 藏归还按钮
                                      }else if(_datasource.ApplyState == "已归还"){        // 4  --> 已归还 
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 显示ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="none";                //修改样式 隐藏归还按钮
                                      }else if(_datasource.ApplyState == "未归还"){        // 5  --> 未归还
                                          look_agree.style.display="none";                 //修改样式 隐藏同意按钮
                                          look_disagree.style.display="none";              //修改样式 隐藏驳回按钮
                                          look_ipValue2.style.display="block";             //修改样式 显示ip
                                          look_ipValue.style.display="none";               //修改样式 隐藏ip值
                                          look_return.style.display="block";               //修改样式 显示归还按钮
                                      }
                                  }
                              },]
                          },
                      }
                      var _css = {   
                      }
                  if($("#EAM_V_Nav1")[0].style.color == "rgb(47, 165, 255)"){
                     U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table1"));
                  }else if($("#EAM_V_Nav2")[0].style.color == "rgb(47, 165, 255)"){
                    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table2"));
                  }else if($("#EAM_V_Nav3")[0].style.color == "rgb(47, 165, 255)"){
                    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_V_Table3"));
                  }
        }
    }

}


/**
日历
EAM.V.isFocus = function(){
    var _sT = document.getElementById("EAM_V_TimeStart"); 
    var _eT = document.getElementById("EAM_V_TimeEnd"); 
    _sT.onclick = function(e){
        U.MD.UI.calendar(this, null);
        U.UF.EV.stopBubble(e);
    }
    _eT.onclick=function(e){
        U.MD.UI.calendar(this, null);
        U.UF.EV.stopBubble(e);
    }
    $(document).bind('click', function () { //绑定事件
        if($(".U_MD_UI_calendar_bigboard")[0]){
            var _con=$(".U_MD_UI_calendar_bigboard")[0];
            if (_con.style.display != 'none')
                _con.style.display = 'none';

        }
    }, false);
}
**/