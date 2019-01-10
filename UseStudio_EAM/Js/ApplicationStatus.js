Namespace.register("EAM.AS");
EAM.AS.mysql_address = "http://cd.1473.cn/php";
EAM.AS.mysql_ip = "db.1473.cn";
EAM.AS.mysql_database = "UseStudio_Eam";
/*调用控件*/
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Basic/Calendar.js" });                   //调用日历控件 Js文件
U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/Basic/Calendar.css", type: "text/css", rel: "stylesheet" }); //调用日历控件 Css文件
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Complex/Table.js" });                    //调用Table控件 Js文件
U.UF.DL.asynLoadCss({ "href": "http://api.1473.cn/Css/page.css", type: "text/css", rel: "stylesheet" });                    //调用Table控件 Css文件
U.UF.DL.asynLoadCss({ "href": "http://api.1473.cn/uform/Table/css/table.css", type: "text/css", rel: "stylesheet" });       //调用Table控件 Css文件
window.onload = function () {  
    EAM.AS.SelectDate(); 
}


/*展示个人数据*/
EAM.AS.SelectDate = function(){
    $(".EAM_AS_Div2")[0].innerHTML='';  //清空数据
    var _datasource = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_SelectVirtualMachineRequestById",U.UF.Cookie.get("usestudiosso", "userid")[0]])).value;  //获取数据库数据
    if(_datasource.length == 0){  //判断该用户是否有数据
        //alert("无资产，请先建资产！");
        $(".EAM_AS_Div3")[0].style.display="block";  //修改样式
        $(".EAM_AS_Div2")[0].style.display="none";  //修改样式
    }else{
    $("#EAM_AS_Div2")[0].style.display="block";     //修改样式
    $("#EAM_AS_Div3")[0].style.display="none";     //修改样式
    for(i=0;i<_datasource.length;i++){                                          
        if(_datasource[i].ApplyState == 1){                 //判断申请状态的值  1-->待审批
           _datasource[i].ApplyState = "待审批";                              
        }else if(_datasource[i].ApplyState == 2){           //2-->已通过
           _datasource[i].ApplyState = "已通过";
        }else if(_datasource[i].ApplyState == 3){           //3-->已拒绝
           _datasource[i].ApplyState = "已拒绝";
        }else if(_datasource[i].ApplyState == 4){           //4-->已归还
           _datasource[i].ApplyState = "已归还";  
        }else if(_datasource[i].ApplyState == 5){           //5-->未归还
           _datasource[i].ApplyState = "未归还";

        }
       var _titles = {
            "UserName": {        //申请人字段
                "name":"申请人"
            },
            "System": {          //系统字段
                "name":"系统"
            },
            "IP": {              //IP字段
                "name":"使用IP"
            },
            "ApplyTime": {      //申请日期字段
                "name":"申请日期"
            },
            "ApplyState": {     //申请状态字段
                "name":"状态"
            },

            "Content": {        
                "name":"操作",
                "content": [{    
                "name": "查看",   
                "onclick": function (_datasource) {
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
                        "id": "testthree"           //id
                        }, {
                         "isenlarge": false,
                         "isnarrow": false
                     });
                     var look = $$("div", { "id": "EAM_V_form2" }, $("#testten")[0]); //创建个div在#testten
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     //申请人
                     var _UserName = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_SelectUserNameByUserId_From_Task",U.UF.Cookie.get("usestudiosso", "userid")[0]])).value[0].UserName;
                     var _name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请人:" }, look_group);
                     var _nameValue = $$("div", { "id": "_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_UserName}, look_group);
                     //系统
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                     var _systemSelect = $$("div" ,{"class":"_systemSelect","style":{"float":"left","margin-left":"30px","width":"220px","height":"21px"},"innerHTML":_datasource.System}, look_group);
                     //用途
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _uses = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                     var _usesValue = $$("div", { "id": "_usesValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                     //日期
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _date = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                     var _dateValue = $$("div", { "id": "_dateValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                     //状态
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _op = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                     var _opValue = $$("div", { "id": "_opValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                     //理由
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请理由:" }, look_group);
                     var _reasonValue = $$("div", { "id": "_reasonValue","style":{"float":"left","margin-left":"30px","width":"150px","height":"60px","resize":"none"},"innerHTML":_datasource.ApplyReason}, look_group);
                     //归还按钮

                     var _addbutton = $$("button" ,{"id":"_addbutton" , "style" :{"float":"left","margin-left":"170px","width":"100px","height":"35px","background":"rgba(22, 155, 213)","border":"none","border-radius":"5px","color":"#fff","cursor":"pointer"},"innerHTML":"归还"},look);
                     //归还点击事件
                     _addbutton.onclick = function(){ 
                       U.UF.UI.Confirm("确认归还", function () {
                           U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_UpdateVirtualMachineRequestApplyStateAndGenre5", _datasource.Id]), function () {
                               U.UF.UI.alertClick("归还申请成功！");    //弹窗
                                $("#testthree")[0].remove();            //移除元素
                                $("#EAM_AS_Div2")[0].innerHTML='';      //清空数据
                                EAM.AS.SelectDate();                    //执行EAM.AS.SelectDate()函数                 
                           });
                       });
                   }
                     if(_datasource.ApplyState == "已拒绝"){           //判断_datasource.ApplyState的值
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "待审批"){
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "未归还"){ 
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "已归还"){
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }
                }
                },]                
            },
        }
        var _css = {
            "td":"color:white"
        }
  }
  }
    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_AS_Div2"));   
}

/**
根据申请状态展示数据
id    用户的id
state 申请状态
**/

EAM.AS.SelectDateTwo = function(state){
    $("#EAM_AS_Div2")[0].innerHTML='';      //清空数据

    //var _datasource = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_SelectVirtualMachineRequestByApplyState2",top.EAM.US.UserInfo.Id,"2"])).value;
    var _datasource = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_SelectVirtualMachineRequestByApplyState",U.UF.Cookie.get("usestudiosso", "userid")[0],state])).value;
    if(_datasource.length == 0){  //判断该用户是否有数据
        //alert("目前没有此申请设备属于此状态！");
        $(".EAM_AS_Div3")[0].style.display="block";  //修改样式
        $(".EAM_AS_Div2")[0].style.display="none";  //修改样式
    }else{
    $("#EAM_AS_Div2")[0].style.display="block";     //修改样式
    $("#EAM_AS_Div3")[0].style.display="none";     //修改样式
    for(i=0;i<_datasource.length;i++){     
        if(_datasource[i].ApplyState == 1){        //判断状态的值  1-->待审批
           _datasource[i].ApplyState = "待审批";                              
        }else if(_datasource[i].ApplyState == 2){  //2-->已通过
           _datasource[i].ApplyState = "已通过";
        }else if(_datasource[i].ApplyState == 3){  //3-->已拒绝
           _datasource[i].ApplyState = "已拒绝";
        }else if(_datasource[i].ApplyState == 4){  //4-->已归还
           _datasource[i].ApplyState = "已归还";
        }else if(_datasource[i].ApplyState == 5){  //5-->未归还
           _datasource[i].ApplyState = "未归还";
        }
       var _titles = {
            "UserName": {       //UserName字段
                "name":"申请人"
            },
            "System": {         //System字段
                "name":"系统"
            },
            "IP": {             //IP字段
                "name":"使用IP"
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
                "onclick": function (_datasource) {
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
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     //申请人
                     var _UserName = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_SelectUserNameByUserId_From_Task",U.UF.Cookie.get("usestudiosso", "userid")[0]])).value[0].UserName;
                     var _name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请人:" }, look_group);
                     var _nameValue = $$("div", { "id": "_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_UserName}, look_group);
                     //系统
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                     var _systemSelect = $$("div" ,{"class":"_systemSelect","style":{"float":"left","margin-left":"30px","width":"220px","height":"21px"},"innerHTML":_datasource.System}, look_group);
                     //用途
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _uses = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                     var _usesValue = $$("div", { "id": "_usesValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                     //日期
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _date = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                     var _dateValue = $$("div", { "id": "_dateValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                     //状态
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _op = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                     var _opValue = $$("div", { "id": "_opValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                     //理由
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请理由:" }, look_group);
                     var _reasonValue = $$("div", { "id": "_reasonValue","style":{"float":"left","margin-left":"30px","width":"150px","height":"60px","resize":"none"},"innerHTML":_datasource.ApplyReason}, look_group);
                     //归还按钮
                     var _addbutton = $$("button" ,{"id":"_addbutton" , "style" :{"float":"left","margin-left":"170px","margin-top":"30px","width":"80px","height":"40px","background":"rgba(22, 155, 213)","border":"none","border-radius":"5px","color":"#fff","cursor":"pointer"},"innerHTML":"归还"},look);
                     _addbutton.onclick = function(){  //归还按钮点击事件
                       U.UF.UI.Confirm("确认归还", function () {
                           U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_UpdateVirtualMachineRequestApplyStateAndGenre5", _datasource.Id]), function () {
                               U.UF.UI.alertClick("归还申请成功！");   //弹窗
                                $("#testthree")[0].remove();           //移除元素
                                $("#EAM_AS_Div2")[0].innerHTML='';     //清空数据
                                EAM.AS.SelectDate();                   //执行EAM.AS.SelectDate()函数           
                
                           });
                        });
                   }
                     if(_datasource.ApplyState == "已拒绝"){           //判断_datasource.ApplyState的值
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "待审批"){
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "未归还"){ 
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "已归还"){
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }              
                }
                },]              
            },
        }
        var _css = {   
        }
  }
    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_AS_Div2")); 
    }
}


EAM.AS.SelectDateThree = function(){
    $("#EAM_AS_Div2")[0].innerHTML='';      //清空数据

    //var _datasource = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_SelectVirtualMachineRequestByApplyState2",top.EAM.US.UserInfo.Id,"2"])).value;
    var _datasource = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_SelectVirtualMachineRequestStateFourFive",U.UF.Cookie.get("usestudiosso", "userid")[0]])).value;
    if(_datasource.length == 0){  //判断该用户是否有数据
        //alert("目前没有此申请设备属于此状态！");
        $(".EAM_AS_Div3")[0].style.display="block";  //修改样式
        $(".EAM_AS_Div2")[0].style.display="none";  //修改样式
    }else{
    $("#EAM_AS_Div2")[0].style.display="block";     //修改样式
    $("#EAM_AS_Div3")[0].style.display="none";     //修改样式
    for(i=0;i<_datasource.length;i++){     
        if(_datasource[i].ApplyState == 1){        //判断状态的值  1-->待审批
           _datasource[i].ApplyState = "待审批";                              
        }else if(_datasource[i].ApplyState == 2){  //2-->已通过
           _datasource[i].ApplyState = "已通过";
        }else if(_datasource[i].ApplyState == 3){  //3-->已拒绝
           _datasource[i].ApplyState = "已拒绝";
        }else if(_datasource[i].ApplyState == 4){  //4-->已归还
           _datasource[i].ApplyState = "已归还";
        }else if(_datasource[i].ApplyState == 5){  //5-->未归还
           _datasource[i].ApplyState = "未归还";
        }
       var _titles = {
            "UserName": {       //UserName字段
                "name":"申请人"
            },
            "System": {         //System字段
                "name":"系统"
            },
            "IP": {             //IP字段
                "name":"使用IP"
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
                "onclick": function (_datasource) {
                    var _formthree = new U.UF.UI.form("申请详情", $$("div", {   //创建窗体
                        "innerHTML": "",
                        "id": "testten"     
                    }), {
                        "style": {                  //窗体样式
                        "text-align": "center",     //文字居中    
                        "width": "400px",           //宽度
        
                        "height": "500px",          //高度
              
                        "position": "fixed",        //定位 fixed
                        "top": "20%",               //距离顶端距离
                        "left": "35%",              //距离左边距离
                         },
                        "id": "testthree"               //id
                        }, {
                         "isenlarge": false,
                         "isnarrow": false
                     });
                     var look = $$("div", { "id": "EAM_V_form2" }, $("#testten")[0]); //创建个div在#testten
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     //申请人
                     var _UserName = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_SelectUserNameByUserId_From_Task",U.UF.Cookie.get("usestudiosso", "userid")[0]])).value[0].UserName;
                     var _name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请人:" }, look_group);
                     var _nameValue = $$("div", { "id": "_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_UserName}, look_group);
                     //系统
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
                     var _systemSelect = $$("div" ,{"class":"_systemSelect","style":{"float":"left","margin-left":"30px","width":"220px","height":"21px"},"innerHTML":_datasource.System}, look_group);
                     //用途
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _uses = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
                     var _usesValue = $$("div", { "id": "_usesValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.Uses}, look_group);
                     //日期
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _date = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请日期:" }, look_group);
                     var _dateValue = $$("div", { "id": "_dateValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyTime}, look_group);
                     //状态
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _op = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请状态:" }, look_group);
                     var _opValue = $$("div", { "id": "_opValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_datasource.ApplyState}, look_group);
                     //理由
                     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
                     var _reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请理由:" }, look_group);
                     var _reasonValue = $$("div", { "id": "_reasonValue","style":{"float":"left","margin-left":"30px","width":"150px","height":"60px","resize":"none"},"innerHTML":_datasource.ApplyReason}, look_group);
                     //归还按钮
                     var _addbutton = $$("button" ,{"id":"_addbutton" , "style" :{"float":"left","margin-left":"170px","margin-top":"30px","width":"80px","height":"40px","background":"rgba(22, 155, 213)","border":"none","border-radius":"5px","color":"#fff","cursor":"pointer"},"innerHTML":"归还"},look);
                     _addbutton.onclick = function(){  //归还按钮点击事件
                       U.UF.UI.Confirm("确认归还", function () {
                           U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_UpdateVirtualMachineRequestApplyStateAndGenre5", _datasource.Id]), function () {
                               U.UF.UI.alertClick("归还申请成功！");   //弹窗
                                $("#testthree")[0].remove();           //移除元素
                                $("#EAM_AS_Div2")[0].innerHTML='';     //清空数据
                                EAM.AS.SelectDate();                   //执行EAM.AS.SelectDate()函数           
                
                           });
                        });
                   }
                     if(_datasource.ApplyState == "已拒绝"){           //判断_datasource.ApplyState的值
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "待审批"){
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "未归还"){ 
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }else if(_datasource.ApplyState == "已归还"){
                        _addbutton.style.display="none";               //隐藏归还按钮
                     }              
                }
                },]              
            },
        }
        var _css = {   
        }
  }
    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_AS_Div2")); 
    }
}


/**
申请按钮
**/
EAM.AS.ApplyVirtualMachine = function () {  
    var _formthree = new U.UF.UI.form("申请详情", $$("div", {   //创建窗体
        "font-size":"26px",
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
     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
     //申请人
     var _UserName = U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_SelectUserNameByUserId_From_Task",U.UF.Cookie.get("usestudiosso", "userid")[0]])).value[0].UserName;
     var _name = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请人:" }, look_group);
     var _nameValue = $$("div", { "id": "_nameValue","style":{"float":"left","margin-left":"30px"},"innerHTML":_UserName}, look_group);
     //系统
     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
     var _system = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "系统:" }, look_group);
     var _systemSelect = $$("select" ,{"class":"_systemSelect","style":{"float":"left","margin-left":"30px","width":"200px","height":"21px"},"innerHTML":"Ubuntu Server 16.04 LTS"}, look_group);
                         $$("option" ,{"value":"Ubuntu Server 16.04 LTS","innerHTML":"Ubuntu Server 16.04 LTS"}, _systemSelect);
                         $$("option" ,{"value":"Windows Server 2012 R2","innerHTML":"Windows Server 2012 R2"}, _systemSelect);
                         $$("option" ,{"value":"Windows Server 2008 R2","innerHTML":"Windows Server 2008 R2"}, _systemSelect);
                         $$("option" ,{"value":"Windows 7","innerHTML":"Windows 7"}, _systemSelect);
                         $$("option" ,{"value":"Windows 10","innerHTML":"Windows 10"}, _systemSelect);
     //用途
     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
     var _uses = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "用途:" }, look_group);
     var _usesValue = $$("input", { "id": "_usesValue","style":{"float":"left","margin-left":"30px"},"innerHTML":""}, look_group);
     //理由
     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"40px","font-size":"16px" } }, look); 
     var _reason = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请理由:" }, look_group);
     var _reasonValue = $$("textarea", { "id": "_reasonValue","style":{"float":"left","margin-left":"30px","width":"150px","height":"60px","resize":"none"},"innerHTML":""}, look_group);
     //申请时间
     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"70px","font-size":"16px" } }, look); 
     var _time = $$("span", { "style":{"float":"left","margin-left":"70px","width":"70px"},"innerHTML": "申请时间:" }, look_group);
     var _timeValue = $$("input", { "id": "_timeValue","style":{"float":"left","margin-left":"30px"},"value":""}, look_group);
     $('#_timeValue')[0].onfocus = function () {U.MD.UI.Calendar(this,null);}//引用日历控件
//     $('#_timeValue')[0].onclick = function (e) {//引用日历控件，格式为点击
//        U.MD.UI.Calendar(this,null);
//        U.UF.EV.stopBubble(e);
//        $(document).bind('click',function(){
//            if($(".U_MD_UI_calendar_bigboard")[0]){
//                var _con = $(".U_MD_UI_calendar_bigboard")[0];
//                if(_con.style.display != 'none'){
//                    _con.style.display = 'none';
//                }
//            }
//        },false)
//     } 
     //提交按钮
     var look_group = $$("div", { "class": "EAM_V_group" , "style":{"width":"400px","height":"20px","margin-top":"70px","font-size":"16px" } }, look); 
     var _addbutton = $$("button" ,{"id":"_addbutton" , "style" :{"float":"left","margin-left":"160px","width":"100px","height":"35px","background":"rgba(22, 155, 213)","border":"none","border-radius":"5px","color":"#fff","cursor":"pointer"},"innerHTML":"添加"},look_group);
     _addbutton.onclick = function(){
        if(_systemSelect.value =="" || _usesValue.value =="" || _reasonValue.value =="" || _timeValue.value == "" ){  //判断输入项是否为空
            U.UF.UI.alertClick("请填写完申请表格"); //弹窗
        }else{

            var _reg = /^[\u4e00-\u9fa5]+$/;
            var _name = _nameValue.innerHTML;
                if(_reg.test(_name) == false){
                   U.UF.UI.alertClick("此申请人姓名有无效字符");
                   $("#testthree")[0].remove();
                }else{

            var _userId = U.UF.Cookie.get("usestudiosso", "userid");   //赋值 申请人id
            var _system = _systemSelect.value;      //赋值 系统
            var _uses = _usesValue.value;           //赋值 用途
            var _reason = _reasonValue.value;       //赋值 原因
            var _genre = "0";                       //赋值 类型
            //var _rt = "2019-01-01;
            var _rt = null;                         //赋值 归还时间
            var _at =  _timeValue.value;            //赋值 当前申请时间
            var _ip = "";                           //赋值 ip
            U.A.Request(EAM.AS.mysql_address, ([EAM.AS.mysql_ip, EAM.AS.mysql_database, "EAM_qt_InsertVirtualMachineRequest", _userId, _system, _genre  , _uses , _at , '1' , _reason , _rt ,_ip ]), function (r)//调用修改存储过程，传值
            {
                U.UF.UI.alertClick("添加成功");//调用api弹窗控件
                $("#testthree")[0].remove();   //移除元素
                $("#EAM_AS_Div2")[0].innerHTML='';//清空数据
                $("#EAM_AS_Div2")[0].style.display="block";
                $("#EAM_AS_Div3")[0].style.display="none";
                EAM.AS.SelectDate();              //执行EAM.AS.SelectDate()函数
            });
            }
        }        
     }
}


