Namespace.register("EAM.S");//命名空间
/*调用api控件*/
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Basic/Calendar.js" });
U.UF.DL.asynLoadCss({ "href": "http://www.1473.cn/css/Controls/Basic/Calendar.css", type: "text/css", rel: "stylesheet" });
/*全局变量*/
mysql_address = "http://cd.1473.cn/php";//引用后台
mysql_ip = "db.1473.cn";//引用后台
mysql_database = "UseStudio_Eam";//数据库名字
U.UF.DL.asynLoadJs({ type: "text/javascript", src: "http://www.1473.cn/js/Controls/Complex/Table.js" });
U.UF.DL.asynLoadCss({ "href": "http://api.1473.cn/Css/page.css", type: "text/css", rel: "stylesheet" })
U.UF.DL.asynLoadCss({ "href": "http://api.1473.cn/uform/Table/css/table.css", type: "text/css", rel: "stylesheet" })
window.onload = function()//初始化函数
{
    EAM.S.SelectData();
    EAM.S.Switch();
}

/*服务器机房检查统计*/
EAM.S.SelectData = function(){
$("#EAM_S_Table")[0].innerHTML = '';//清空数据
   var _datasource = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectServerCheck"])).value;   
  //console.log(_datasource);
   for(i=0;i<_datasource.length;i++){
       if(_datasource[i].ServerState == 0){
          _datasource[i].ServerState = "正常";
       }else{
          _datasource[i].ServerState = "非正常";
       }
   }     
       var _titles = {
            "ServerState": {
                "name":"机房温度是否正常"
            },
            "NormalNumber": {
                "name":"正常运作台数"
            },
            "AbnormalNumber": {
                "name":"非正常运作台数"
            },
            "AbnormalReason": {
                "name":"非正常运作原因"
            },
            "ReportTime": {
                "name":"上报问题时间"
            },
            "SolveTime": {
                "name":"解决问题时间"
            },
            "Checker": {
                "name":"检查人"
            },
            "CheckTime": {
                "name":"检查时间"
            },

        }
        var _css = {   
       "Title":"background-color:white;"
        }
  
    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_S_Table"));
        
}


/*添加按钮*/
EAM.S.Switch = function (){  
    var _button=document.getElementById('EAM_S_button');    //获取EAM_S_button元素
    _button.onclick = function () {                         //点击事件
        var _formthree = new U.UF.UI.form("查看详情", $$("div", { //窗体
            "innerHTML": "",
             "id": "testten"        
        }), {
             "style": {                 //窗体样式
             "text-align": "center",    //文字居中
              "width": "450px",         //宽度
              "min-width": "24%",       //最小宽度
              "height": "88%",          //高度
              "maxHeight": "700px",     //最大高度
              "position": "fixed",      //定位 fixed
              "top": "10%",             //距离顶端距离
              "left": "25%",            //距离左边距离
             }, 
              "id": "testthree"         //id名字
             }, {   
              "isenlarge": false,   
              "isnarrow": false
         });
    var _look = $$("div" , {"id":"EAM_S_form"}, $("#testten")[0]);  //在id为testten里创建div
    //机房温度是否正常
    var _look_group = $$("div" ,{"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"40px","font-size":"16px" } }, _look);
    //温度
    var _tempText = $$("span" , {"style":{"float":"left","margin-left":"29px","width":"140px"},"innerHTML": "机房温度是否正常" }, _look_group);
    $$("span",{"style":{"color":"red"} ,"innerHTML":"*"},_tempText);
    //温度 下拉选项 正常 非正常
    var _tempSelect = $$("select" ,{"class":"_tempSelect","style":{"float":"left","margin-left":"30px","width":"150px","height":"21px"},"innerHTML":"正常"}, _look_group);
    //正常
    var _tempValue = $$("option" ,{"class":"_tempValue","value":"正常","innerHTML":"正常"}, _tempSelect);
    //非正常
    var _tempValue2 = $$("option" ,{"class":"_tempValue2","value":"非正常","innerHTML":"非正常"}, _tempSelect);
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"40px","font-size":"16px" } },_look);
    //正常台数
    var _normalText = $$("span" , {"style" :{"float":"left","margin-left":"30px","width":"150px"},"innerHTML":"正常运作台数"},_look_group);
    $$("span",{"style":{"color":"red"} ,"innerHTML":"*"},_normalText);
    //正常台数的数量 值
    var _normalValue = $$("input",{"class":"_normalValue","style":{ "float":"left","margin-left":"15px","width":"150px","height":"21px"},'onblur': function(){EAM.S.reg(this)}},_look_group); 
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"40px","font-size":"16px" } },_look);
    //非正常台数
    var _unnormalText = $$("span" , {"style" :{"float":"left","margin-left":"30px","width":"150px"},"innerHTML":"非正常运作台数"},_look_group);
    $$("span",{"style":{"color":"red"} ,"innerHTML":"*"},_unnormalText);
    //非正常台数的数量 值
    var _unnormalValue = $$("input",{"class":"_unnormalValue","style":{ "float":"left","margin-left":"15px","width":"150px","height":"21px"},'onblur': function(){EAM.S.reg(this)} },_look_group);
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"40px","font-size":"16px" } },_look);
    //非正常的理由
    var _unnormalReasonText = $$("span" , {"style" :{"float":"left","margin-left":"30px","width":"150px"},"innerHTML":"非正常运作原因"},_look_group);
    //非正常的值
    var _unnormalReasonValue = $$("textarea",{"class":"_unnormalReasonValue","style":{"float":"left","margin-left":"15px","width":"150px","height":"60px","resize":"none"}, "innerHTML":"" },_look_group);
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"60px","font-size":"16px" } },_look);
    //上报时间
    var _reporttimeText = $$("span" , {"style" :{"float":"left","margin-left":"30px","width":"150px"},"innerHTML":"上报问题时间"},_look_group);
    //上报时间的值
    var _reporttimeValue = $$("input",{"class":"_reporttimeValue","style":{ "float":"left","margin-left":"15px","width":"150px","height":"21px"} ,"innerHTML":"" },_look_group);
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"40px","font-size":"16px" } },_look);
    //解决问题时间
    var _resolutiontimeText = $$("span" , {"style" :{"float":"left","margin-left":"30px","width":"150px"},"innerHTML":"解决问题时间"},_look_group);
    //解决问题时间的值
    var _resolutiontimeValue = $$("input",{"class":"_resolutiontimeValue","style":{ "float":"left","margin-left":"15px","width":"150px","height":"21px"} ,"innerHTML":""},_look_group);
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"40px","font-size":"16px" } },_look);
    //检查人
    var _rummagerText = $$("span" , {"style" :{"float":"left","margin-left":"30px","width":"150px"},"innerHTML":"检查人"},_look_group);
    $$("span",{"style":{"color":"red"} ,"innerHTML":"*"},_rummagerText);
    //检查人的值
    var _rummagerValue = $$("input",{"class":"_rummagerValue","style":{ "float":"left","margin-left":"15px","width":"150px","height":"21px"} },_look_group);
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"40px","font-size":"16px" } },_look);
    //检查时间
    var _checktimeText = $$("span" , {"style" :{"float":"left","margin-left":"30px","width":"150px"},"innerHTML":"检查时间"},_look_group);
    $$("span",{"style":{"color":"red"} ,"innerHTML":"*"},_checktimeText);
    //检查时间的值
    var _checktimeValue = $$("input",{"class":"_checktimeValue","style":{ "float":"left","margin-left":"15px","width":"150px","height":"21px"} },_look_group);  
    var _look_group = $$("div" , {"class":"_look_group","style":{"width":"450px","height":"20px","margin-top":"20px","font-size":"16px" } },_look);
    //添加按钮
    var _addbutton = $$("button" ,{"id":"_addbutton" , "style" :{"float":"left","margin-left":"180px","width":"80px","height":"40px","background":"rgba(22, 155, 213)","border":"none","border-radius":"5px","color":"#fff"},"innerHTML":"添加"},_look_group);
    $('._reporttimeValue')[0]. onfocus = function () { U.MD.UI.Calendar(this); } //引用日历控件，格式为光标聚焦
    $('._resolutiontimeValue')[0]. onfocus = function () { U.MD.UI.Calendar(this); } //引用日历控件，格式为光标聚焦
    $('._checktimeValue')[0]. onfocus = function () { U.MD.UI.Calendar(this); } //引用日历控件，格式为光标聚焦
    /*添加数据*/
        _addbutton.onclick =function (){  //按钮点击事件
        if(_tempSelect.value =="" || _normalValue.value =="" || _unnormalValue.value =="" || _rummagerValue.value =="" || _checktimeValue.value ==""){
             U.UF.UI.alertClick("红色*号都是必填项，请填写");
        }else{

            $('#testthree')[0].style.display = "none"; //修改testthree的样式
            var _temp = $("._tempSelect")[0].value;    //赋值
            if(_temp=="正常"){                         //判断温度的选择 正常 非正常
               var _temps = 0;                         //正常 --> 0
            }else{
               var _temps = 1;                         //非正常  --> 1
            }
   
            var _normal = $("._normalValue")[0].value;//赋值
            var _unnormal = $("._unnormalValue")[0].value;              //赋值
            var _unnormalReason = $("._unnormalReasonValue")[0].value;  //赋值

            var _reporttime = $("._reporttimeValue")[0].value;          //赋值 
            if(_reporttime == ""){                                      //判断上报时间是否为空
                _reporttime = "1900-01-01 00:00:00";                             //赋值
            }

            var _resolutiontime = $("._resolutiontimeValue")[0].value;  //赋值
            if(_resolutiontime == ""){                                  //判断解决时间是否为空
                _resolutiontime = "1900-01-01 00:00:00";                         //赋值
            }

            var _rummager = $("._rummagerValue")[0].value;              //赋值
            var _checktime = $("._checktimeValue")[0].value;            //赋值                          
            U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_InsertServerCheck", _temps, _normal, _unnormal, _unnormalReason, _reporttime, _resolutiontime ,_rummager, _checktime]), function (r)//调用修改存储过程，传值
            {
                U.Alert("添加成功")//调用api弹窗控件
                location.reload();
            });

            }
        }
    }
}
//正则是否数字判断
EAM.S.reg = function(_this) {
    var reg=/^[1-9]\d*$|^0$/;
    if(reg.test(_this.value)==true){
            EAM.S.SelectData()
        }else{
            U.UF.UI.alertClick("请输入数字");
           // return false; 
    }
}



//搜索功能


EAM.S.Search= function(){
$("#EAM_S_Table")[0].innerHTML = '';//清空数据
    var _sT = document.getElementById("EAM_S_TimeStart").value; //选择的开始时间
    var _eT = document.getElementById("EAM_S_TimeEnd").value;   //选择的结束时间
    var _value = document.getElementById("EAM_S_Search").value; //搜索框输入的值
    if( _value == ""){                //是否填好开始时间，结束时间，检查人 
        U.UF.UI.alertClick("请填好时间与检查人姓名！");
        EAM.S.SelectData();
    }else{
        var _datasource = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "EAM_bg_SelectName", _sT, _eT])).value;//从数据库获取数据
         if(_datasource.length == 0){            //判断用户是否有数据
            U.UF.UI.alertClick("查无信息,请添加信息！");
           
            EAM.S.SelectData();    
            
     }else{
        for(i=0;i<_datasource.length;i++){
       if(_datasource[i].ServerState == 0){
          _datasource[i].ServerState = "正常";
       }else{
          _datasource[i].ServerState = "非正常";
       }
   }     
      
   
       var _titles = {
            "ServerState": {
                "name":"机房温度是否正常"
            },
            "NormalNumber": {
                "name":"正常运作台数"
            },
            "AbnormalNumber": {
                "name":"非正常运作台数"
            },
            "AbnormalReason": {
                "name":"非正常运作原因"
            },
            "ReportTime": {
                "name":"上报问题时间"
            },
            "SolveTime": {
                "name":"解决问题时间"
            },
            "Checker": {
                "name":"检查人"
            },
            "CheckTime": {
                "name":"检查时间"
            },
        
            }
        var _css = {   
        }
  
    U.MD.UI.table.pageTable(_datasource,_titles,_css,10,1,document.getElementById("EAM_S_Table"));
        
        }
        

}
}    
    
    

        

