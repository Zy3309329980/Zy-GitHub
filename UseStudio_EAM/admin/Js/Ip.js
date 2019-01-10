Namespace.register("EAM.IP");
EAM.IP.mysql_address = "http://cd.1473.cn/net";
EAM.IP.mysql_ip = "db.1473.cn";
EAM.IP.mysql_database = "UseStudio_Eam";
var u1; //存放不重复的服务器名字
var u2; //存放排序完数据
var _sername;	//通过服务器名字查找相关数据
var z1;	//存储数据
/**
 *函数作用：页面初始化表格
 */
window.onload = function() {
	EAM.IP.SelectData();        //执行创建页面
}
/**
 *函数作用：排序(将数组排序完放进全局变量里,以便调用)
*@param z            {array}               当前所有值    
*@param u            {array}               数组    
*@param u1            {array}               服务器名称
*@param u2           {array}               数组（所有服务器隔离开来）        
 */
EAM.IP.sort = function(_value) {
	var z = _value;
	var u = [];
	u1 = [];
	u2 = [];
	u2[0] = new Array();
	u2[1] = new Array();
	u2[2] = new Array(); //定义二维数组
	for(var i = 0; i < _value.length; i++) {
		u.push(z[i].TheServerName);
	}
	a = u.sort();
	for(var i = 0; i < u.length; i++) {
		if(u[i] == u[i + 1] &&  u[i] != u[i - 1]) { //判断是否重复,是否已经放入容器
			u1.push(u[i]);
		}
	}
	for(var i = 0; i < z.length; i++) {
		if(z[i].TheServerName == u1[0]) {
			var s = z[i].TheServerName;
			u2[0].push({
				TheServerName: s,
				Id: z[i].Id,
				TheServerIp: z[i].TheServerIp,
				Status: z[i].Status
			});
		}
	} //放进数组
	for(var i = 0; i < z.length; i++) {
		if(z[i].TheServerName == u1[1]) {
			var s = z[i].TheServerName;
			u2[1].push({
				TheServerName: s,
				Id: z[i].Id,
				TheServerIp: z[i].TheServerIp,
				Status: z[i].Status
			})
		}
	} //放进数组
	for(var i = 0; i < z.length; i++) {
		if(z[i].TheServerName == u1[2]) {
			var s = z[i].TheServerName;
			u2[2].push({
				TheServerName: s,
				Id: z[i].Id,
				TheServerIp: z[i].TheServerIp,
				Status: z[i].Status
			});
		}
	} //放进数组

} 
//将数组所有的内容根据服务器名称隔离   方便调用


/**
 *函数作用：创建页面(表格)
 *@param z1            {array}               当前所有值       
 *
 */
EAM.IP.SelectData = function() {
	U.A.Request(EAM.IP.mysql_address, ([EAM.IP.mysql_ip, EAM.IP.mysql_database, "Eam_SelectServerIP"]), function(r) {
		var _value = r.value;
		z1 = _value;
		EAM.IP.sort(_value);        //将数组隔离
        //创建表格
		var _table =$$("div",{"class":"EAM_IP_Bottom"},$(".EAM_IP_Main")[0]);
		var _tabletb = $$("table",{"class":"EAM_IP_Bottom_Table","frame":"box","rules":"all","cellpadding":"10px"},_table);
		var _tabletbth = $$("thead",{"class":"EAM_IP_Bottom_Table_Head"},_tabletb);
		var _tabletbthtr = $$("tr",{"class":""},_tabletbth);
		var _tabletbthtrth = $$("th",{"class":"","innerHTML":"服务器名称"},_tabletbthtr);
		var _tabletbthtrth2 = $$("th",{"class":"","innerHTML":"所处IP段"},_tabletbthtr);
		var _tabletbthtrth3 = $$("th",{"class":"","innerHTML":"详情"},_tabletbthtr);
		var _tabletbtb = $$("thead",{"class":"EAM_IP_Bottom_Table_Body"},_tabletb);
		var _tb = $(".EAM_IP_Bottom_Table_Body")[0];
        //只生成三个不同的服务器名称
		for(var i = 0; i < u2.length; i++) {
			for(var j = 0; j < u1.length; j++) {
				/*IP页面的动态创建*/
				if(u2[j][i].TheServerName == u1[j]) {
					var _tr = $$("tr", {
						"class": "EAM_IP_Bottom_Table_Body_Tr"
					}, _tb);
                    //服务器名称
					var _tdServerName = $$("td", {
						"innerHTML": u2[j][i].TheServerName
					}, _tr);
					var _ty = u2[j].length - 1;
					var _tdServerIp = $$("td", {
						"innerHTML": u2[j][i].TheServerIp + '~' + u2[j][_ty].TheServerIp    //将从头的ip和从尾的ip相连
					}, _tr);
					var _tdDetails = $$("td", {
						"class": "EAM_IP_Bottom_Table_Body_Td",
						"innerHTML": "查看详情"
					}, _tr);

					_tdDetails.onclick = function() {       //如果点击查看详情
						var _td = this.parentNode.children[0].innerHTML;    
						_sername = _td;     //服务器名称
						EAM.IP.ips(1);      //执行分页控件

					}
				}
				continue;
			}
			if(j == u1.length) {        //判断数组里的服务器名称是否更当前服务器名称相同
				break;          //如果相同，就直接退出
			}   
		}
		/*弹出页面的动态创建*/

	});
}
/**
 *函数作用：判断输入的Ip
 *@param reg    {array}               正则表达式  
 *
 */
EAM.IP.isValidIP = function(ip)     
{     
    var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/     
    return reg.test(ip);    //判断用户输入的Ip格式  
}
/**
 *函数作用：弹窗及添加Ip
 *@param message    {array}           ip使用状态
 *@param statu    {array}           数据库ip使用状态
 @param _sername    {string}           当前服务器名称
 @param _serveripss.value    {string}           当前服务器ip
 @param _ip    {string}           当前ip
 @param _statuss.value    {string}           当前Ip使用状态
 */
EAM.IP.ips = function(int) {
	var _obj = new U.UF.UI.form("查看所有Ip", $$("div", {
		"id": "testthree"
	}), {
		"style": {
			"text-align": "center",
			"min-width": "25%",
			"width": "500px",
			"height": "50%",
			"maxHeight": "700px",
			"position": "fixed",
			"top": "20%",
			"left": "50%"
		},
		"id": "test"
	}, {
		"isenlarge": false,
		"isnarrow": false
	});
	var _tbalertbox = $$("div", {
	"class": "EAM_IP_Alert_Table"
	}, $("#testthree")[0])
	var _tbAlert = $$("div", {
		"class": "EAM_IP_Alert_Table_Body"
	}, _tbalertbox);
	var _tbadd = $$("div", {
		"class": "EAM_IP_Add"
	}, $("#testthree")[0]);
	var _tdinput = $$("input", {
		"type": "button",
		"class": "EAM_IP_Add_Button",
		"value": "添加新Ip"
	}, _tbadd);
	EAM.IP.Page();      //执行分页（条数）
	_tbAlert.innerHTML = "";    //清空内容
	_tdinput.onclick = function() {
		var message = [];
		var statu = [];
		message[0] = "未使用";
		message[1] = "已使用";
		statu[0] = 0;
		statu[1] = 1;
		var _obj2 = new U.UF.UI.form("添加", $$("div", {
			"id": "testfour"
		}), {
			"style": {
				"text-align": "center",
				"min-width": "25%",
				"width": "500px",
				"height": "30%",
				"maxHeight": "700px",
				"position": "fixed",
				"top": "20%",
				"left": "50%"
			},
			"id": "test"
		}, {
			"isenlarge": false,
			"isnarrow": false
		});
		var _head = $("#testfour")[0].parentNode.parentNode.parentNode.children[1];
	    var _headleft = $$("div",{"class":"EAM_IP_img_div"},_head);
	    var _headleftimg = $$("div",{"class":"EAM_IP_img","title":"返回上一页"},_headleft);
	    _headleftimg.onclick = function(){
	    	EAM.IP.ips();
	    }//返回上一步
		var _serverip = $$("div", {
			"class": "EAM_IP_Alert_Alert_Table",
			"innerHTML":""
		}, $("#testfour")[0])
		var _serverips = $$("div",{"class":"EAM_IP_ips","innerHTML":"服务器Ip"},_serverip)
		var _serveripss = $$("input", {
			"class": "EAM_IP_Alert_Table_Table_Body",
			"value":"",
		}, _serverip);
		var _statu = $$("div", {
			"class": "EAM_IP_Alert_Alert_Table",
			"innerHTML":""
		}, $("#testfour")[0])
		var _status = $$("div", {
			"class": "EAM_IP_ips",
			"innerHTML":"状态"
		}, _statu);
		var _statuselect = $$("select",{"class":"EAM_IP_Alert_Table_Table_Body"},_statu)
		for(var i=0;i<message.length;i++)
		{
			var _statuss = $$("option", {
			"type": "button",
			"class": "",
			"value": statu[i],
			"innerHTML":message[i]
			}, _statuselect);
		}
		var _submit = $$("input", {
			"type":"button",
			"class": "EAM_IP_Add_Button",
			"innerHTML":"提交",
			"value":"提交"
		}, $("#testfour")[0]);
        //判断用户输入的Ip是否正确
		_serveripss.onblur = function(){
			var ip = $(".EAM_IP_Alert_Table_Table_Body")[0].value; 
			for(var i=0;i<z1.length;i++)
			{
				if(_sername == z1[i].TheServerName)
				{
					var _ip = z1[i].Ip;
				}
			}
			if(ip != "")    //判断当前输入的ip不为空
			{
				if(EAM.IP.isValidIP(ip) && ip.split(".")[2] == _ip.split(".")[2] && ip.split(".")[3]>1 && ip.split(".")[3]<255)     //判断格式和Ip长度
			    {  
			        U.Alert("输入的Ip格式正确", 800);
			        var _id = Guid.newGuid();   //创建一个新Id
					_submit.onclick = function(){       //点击提交
						U.A.Request(EAM.IP.mysql_address, ([EAM.IP.mysql_ip, EAM.IP.mysql_database, "Eam_InsertTheServerIp", _id,_sername,_serveripss.value,_ip,_statuss.value]), function(r) {
							var re = r.value;
							if(re == "")
							{
								U.Alert("提交成功", 1000);
								location.replace(location);  //刷新页面
							}
							else
							{
								U.Alert("已有该ip", 1000);
							}
						});
					}
			    }  
			    else  
			    {  
			        U.Alert("输入的ip有误,请重输", 1000);
			    }
			}
		    
		}
		
	}

	//EAM.IP.Page();

}
/**
 *函数作用：创建弹窗界面(ip信息)并分页
 *@param e {array}  ip使用状态       
 *@param e1 {array}  数据库ip使用状态 
 */
EAM.IP.ipsN = function(i) {
	U.A.Request(EAM.IP.mysql_address, ([EAM.IP.mysql_ip, EAM.IP.mysql_database, "EAM_TheServerIppages", i, '8', _sername]), function(r) {
		var _tbAlert = $(".EAM_IP_Alert_Table_Body")[0];
		var res = r.value;
		var e = [];
		var e1 = [];
		e[0] = "已使用";
		e[1] = "未使用";
		e1[0] = "0";
		e1[1] = "1";
		_tbAlert.innerHTML = "";
		for(var i = 0; i < res.length; i++) {
			var _trAlert = $$("div", {
				"class": "EAM_IP_Alert_Table_Body_Tr"
			}, _tbAlert)
			var _tdIp1 = $$("div", {
				"class": "EAM_IP_Alert_Table_Body_Td_Change",
				"innerHTML": res[i].TheServerIp
			}, _trAlert);
			_tdIp1.onclick = function(){
				new U.UF.UI.form("修改服务器Ip信息", $$("div", {
					"id": "testsix"
				}), {
					"style": {
						"text-align": "center",
						"min-width": "25%",
						"width": "400px",
						"height": "20%",
						"maxHeight": "700px",
						"position": "fixed",
						"top": "20%",
						"left": "50%"
					},
					"id": "test"
				}, {
					"isenlarge": false,
					"isnarrow": false
				});
				var _head2 = $("#testsix")[0].parentNode.parentNode.parentNode.children[1];
			    var _headleft2 = $$("div",{"class":"EAM_IP_img_div"},_head2);
			    var _headleftimg2 = $$("div",{"class":"EAM_IP_img","title":"返回上一页"},_headleft2);
			    _headleftimg2.onclick = function(){
			    	EAM.IP.ips();
			    }//返回上一步
				var _body = $$("div",{"class":"EAM_ip_Form_body","innerHTML":""},$("#testsix")[0]);
				var _bodytop = $$("div",{"class":"EAM_ip_Form_body_top"},_body);
				var _bodytopleft = $$("div",{"class":"EAM_ip_Form_body_top_left","innerHTML":"IP"},_bodytop);
				var _bodytopright = $$("div",{"class":"EAM_ip_Form_body_top_right","innerHTML":this.innerHTML.split("<")[0]},_bodytop);
				var _bodybottom = $$("div",{"class":"EAM_ip_Form_body_bottom"},_body);
				var _bodybottomleft = $$("div",{"class":"EAM_ip_Form_body_bottom_left","innerHTML":"使用状态"},_bodybottom);
				var _bodybottomright = $$("select",{"class":"EAM_ip_Form_body_bottom_right","innerHTML":""},_bodybottom);
				for(var j=0;j<e.length;j++)
				{
					var _bodybottomrightopt = $$("option",{"class":"","innerHTML":e[j],"value":e1[j]},_bodybottomright);
				}
				var _bodybotton = $$("input",{"type":"button","value":"提交","class":"EAM_IP_body_button"},_body);
				_bodybotton.onclick = function(){
					var r = U.A.Request(EAM.IP.mysql_address, ([EAM.IP.mysql_ip, EAM.IP.mysql_database, "Eam_ChangeIPStatus", _bodybottomright.value,_bodytopright.innerHTML])).value;
					U.Alert("修改成功", 1000);
					location.replace(location); //刷新页面
				}
			}
			if(res[i].Status == 0) {    //判断当前Ip使用状态
				var _false = document.createElement("img");
				_false.src = "../Img/false.png";        //已经使用
				_tdIp1.appendChild(_false);
			} else {
				var _true = document.createElement("img");
				_true.src = "../Img/true.png";      //未使用
				_tdIp1.appendChild(_true);
			}

		}
	});
}
/**
 *函数作用：分页(条数)
 *@param val       
 *
 */
EAM.IP.Page = function() {
	EAM.IP.ipsN(1); //调用分页
	var _tbbox = $("#testthree")[0];
	var _tbpage = $$("div", {
		"class": "EAM_page"
	}, _tbbox);
	var _leng = U.A.Request(EAM.IP.mysql_address, ([EAM.IP.mysql_ip, EAM.IP.mysql_database, "Eam_TheServerIPPage", _sername])).value;
	new U.UF.P.PPage(_tbpage, _leng[0].totalnum, 8, 1, function(page) {     //当前页面一共有8条数据
		EAM.IP.ipsN(page);
	});
}