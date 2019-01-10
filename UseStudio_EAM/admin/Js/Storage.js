Namespace.register("EAM.SF");
var mysql_address = "http://cd.1473.cn/php";
var mysql_ip = "db.1473.cn";
var res = "";
var mysql_database = "UseStudio_Eam";
window.onload = function(){
    loockup(1);
    page();
}
function CurentTime(){//
    var now = new Date();//获取当前时间
    var year = now.getFullYear();//获取当前年份（0000）     
    var month = now.getMonth() + 1;//获取当前月份（00）
    var day = now.getDate();//获取当前日（00）         
    var hh = now.getHours();//获取当前小时（00）           
    var mm = now.getMinutes();//获取当前分钟（00）        
    var ss = now.getSeconds();//获取当前秒（00）   
    var clock = year + "-";  
    if(month < 10)  
        clock += "0";  
    clock += month + "-";  
    if(day < 10)  
        clock += "0";    
    clock += day + " ";  
    if(hh < 10)  
        clock += "0";    
    clock += hh + ":";  
    if(mm < 10) clock += '0';   
    clock += mm + ":";   
    if(ss < 10) clock += '0';   
    clock += ss;   
    return(clock);//格式为（0000-00-00 00：00：00）；   
} 
function formatDate(dt){//获取时间戳  
    var year=dt.getFullYear();//获取时间戳年份（0000）
    var month=dt.getMonth()+1;//获取时间戳月份（00）
    var date=dt.getDate();//获取时间戳日（00）
    var hour=dt.getHours();//获取时间戳小时（00）
    var minute=dt.getMinutes();//获取时间戳分钟（00）
    var second=dt.getSeconds();//获取时间戳秒（00）
    return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;//格式为（0000-00-00 00：00：00）；
}
function loockup(pageLength){//查询当前文件数量并分页
    U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_SelectFileStore",pageLength,"9"]),function (r){//调用”查询文件并分页“存储过程
        res = r.value;//赋值给res
        $(".EAM_SF_mainbody")[0].innerHTML = "";//清空，防止重复生成
        var head = $(".EAM_SF_mainbody")[0];//寻找赋值
        var litest = $$("li",{},head);//创建
        var ultest = $$("ul",{},litest);//创建
        for( var i = 0; i < res.length; i++){//循环数据长度，进行生成数据
            var head = $(".EAM_SF_mainbody")[0];//寻找赋值
            var li = $$("li",{},head);//创建
            var ul = $$("ul",{},li);//创建
            var lis = $$("li",{"class":"EAM_SF_first","innerHTML":res[i].Name},ul);//创建li并放入文件名
            var last = $$("li",{"class":"EAM_SF_last","innerHTML":"默认"},ul);//创建li并放入排序
            var delect = $$("input",{"type":"button","class":"EAM_SF_last","value":"删除"},ul);//创建删除功能
            delect.onclick = currying([res[i].Id],remove);//使用删除函数
        }
    })
}
function EAM_SF_text3(){//返回点击按钮
        location.reload();//刷新页面
    }
function xx(value){//select点击功能
    var sort = value.options[value.selectedIndex];//option内容赋值给sort变量
    if(sort.value =="大小"){//判断
        U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_selectFileName"]),function(r){//调用”查询文件“存储过程
            res = r.value;//赋值
                var array = [];//定义一个空数组
                for(var i =0 ;i<res.length;i++){//循环数据长度次数
                    var  obj;//定义变量
                    obj = res[i].Size;//赋值文件大小
                    obj = parseInt(obj);//字符串转换成数字
                    array.push(obj);//把文件大小数据放入数组中，此时数组属于无序状态
                };
                function sort(array){//冒泡算法，进行排序
                    for(var i =0 ; i< array.length - 1;i++){
                        for(var j = 0; j<array.length - i - 1;j++){
                            if(array[j] < array[j + 1]){
                                var swap = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = swap;
                            }
                        }
                    }
                }
                sort(array);//此时数组内容由大到小进行排序
                var str1=[];//定义一个空数组
                function first(args){//排除在数组中的重复值
                    for(i=0;i<args.length;i++){
                        if(str1.indexOf(args[i])<0){
                            str1.push(args[i])
                        }
                    }
                    return str1;
                }
                var abrr = first(array);//放入数组
                    for(var i = 0; i<abrr.length;i++){//循环数组长度
                        var Size = abrr[i];//赋值
                        $(".EAM_SF_mainbody")[0].innerHTML = "";//清空
                        var head = $(".EAM_SF_mainbody")[0];//创建
                        var litest = $$("li",{},head);//创建
                        var ultest = $$("ul",{},litest);//创建
                        U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_selectfsFileStore",Size]),function(r){//调用”查询文件大小“存储过程
                            res = r.value;//赋值
                            for(var a =0;a<res.length;a++){//循环取出结果长度
                                var head = $(".EAM_SF_mainbody")[0];//创建
                                var li = $$("li",{},head);//创建
                                var ul = $$("ul",{},li);//创建
                                var lis = $$("li",{"class":"EAM_SF_first","innerHTML":res[a].Name},ul);//将取出结果的文件名字赋值
                                var last = $$("li",{"class":"EAM_SF_last","innerHTML":res[a].Size + "k"},ul);//显示该文件的大小
                                var delect = $$("input",{"type":"button","class":"EAM_SF_last","value":"删除"},ul);//创建删除功能
                                delect.onclick = currying([res[0].Id],remove);//使用删除函数
                                $(".m_a_pub_control")[0].style = "display:none";//隐藏页码
                            }
                    })
                }
        })
    }else if(sort.value == "时间"){//基本同上，不同的地方会加注释
        U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_selectFileName"]),function(r){
            res = r.value;
                var array = [];
                for(var i =0 ;i<res.length;i++){
                    var Dtime = res[i].CreatTime;
                    var NewDtime = new Date(parseInt(Dtime.slice(6, 19)));//获取时间
                    var obj = formatDate(NewDtime)//转换格式
                    var  obj;
                    array.push(obj);
                };
                function sort(array){
                    for(var i =0 ; i< array.length - 1;i++){
                        for(var j = 0; j<array.length - i - 1;j++){
                            if(array[j] < array[j + 1]){
                                var swap = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = swap;
                            }
                        }
                    }
                }
                sort(array);
                var str1=[];
                function first(args){
                    for(i=0;i<args.length;i++){
                        if(str1.indexOf(args[i])<0){
                            str1.push(args[i])
                        }
                    }
                    return str1;
                }
                var abrr = first(array);
                    for(var i = 0; i<abrr.length;i++){
                        var CreatTime = abrr[i];
                        $(".EAM_SF_mainbody")[0].innerHTML = "";
                        var head = $(".EAM_SF_mainbody")[0];
                        var litest = $$("li",{},head);
                        var ultest = $$("ul",{},litest);
                        U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_selectftFileStore",CreatTime]),function(r){//调用”查询文件时间“存储过程
                            res = r.value;
                            for(var a = 0;a<res.length;a++){
                                var Dtime = res[a].CreatTime;
                                var NewDtime = new Date(parseInt(Dtime.slice(6, 19)));
                                var obj = formatDate(NewDtime)//由于数据库取出时间为时间戳格式，故需要转换
                                var head = $(".EAM_SF_mainbody")[0];
                                var li = $$("li",{},head);
                                var ul = $$("ul",{},li);
                                var lis = $$("li",{"class":"EAM_SF_first","innerHTML":res[a].Name},ul);
                                var last = $$("li",{"class":"EAM_SF_last","innerHTML":obj},ul);
                                var delect = $$("input",{"type":"button","class":"EAM_SF_last","value":"删除"},ul);
                                delect.onclick = currying([res[0].Id],remove);
                                $(".m_a_pub_control")[0].style = "display:none";
                            }
                    })
                }
        })
    }else if(sort.value =="类别"){//基本同上
        U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_selectFileName"]),function(r){
            res = r.value;
                var array = [];
                for(var i =0 ;i<res.length;i++){
                    var Type = res[i].Type;
                    var NewType = Type; 
                    var obj = NewType;
                    var  obj;
                    array.push(obj);
                };
                array.sort();
                var str1=[];
                function first(args){
                    for(i=0;i<args.length;i++){
                        if(str1.indexOf(args[i])<0){
                            str1.push(args[i])
                        }
                    }
                    return str1;
                }
                var abrr = first(array);
                    for(var i = 0; i<abrr.length;i++){
                        var Type = abrr[i];
                        $(".EAM_SF_mainbody")[0].innerHTML = "";
                        var head = $(".EAM_SF_mainbody")[0];
                        var litest = $$("li",{},head);
                        var ultest = $$("ul",{},litest);
                        U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_selecttpFileStore",Type]),function(r){
                            res = r.value;
                            for(var a = 0;a<res.length;a++){
                                var head = $(".EAM_SF_mainbody")[0];
                                var li = $$("li",{},head);
                                var ul = $$("ul",{},li);
                                var lis = $$("li",{"class":"EAM_SF_first","innerHTML":res[a].Name},ul);
                                var last = $$("li",{"class":"EAM_SF_last","innerHTML":res[a].Type},ul);
                                var delect = $$("input",{"type":"button","class":"EAM_SF_last","value":"删除"},ul);
                                delect.onclick = currying([res[0].Id],remove);
                                $(".m_a_pub_control")[0].style = "display:none";
                            }
                    })
                }
        })
    }
} 
function loadImage(img){//文件上传功能（表面）
    var filePath = img.value;//赋值
    var fileExt = filePath.substring(filePath.lastIndexOf("."))//拆分
        .toLowerCase();//转换
    if (!checkFileExt(fileExt)) {//判断格式
        alert("您上传的文件不是图片,请重新上传！");
        img.value = "";
        return;
    }
    if (img.files && img.files[0]) {//判断格式是否为图片
        var Id = Math.random();//随机Id
        var pic = document.getElementById("pic").files;////获取文件属性赋值给pic
        var size = pic[0].size/1024 + "KB";//字节转换成kb
        var arr = size.split(".");//拆分
        var sizes = arr[0] + "kb"//取出整数
        var name = pic[0].name;//获取文件名字
        var brr = name.split(".");//拆分
        var CreatTime=CurentTime();//获取当前时间
        U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_AddFileStore",Id,brr[0],CreatTime,sizes,brr[1]]),function(r){//调用”上传文件“存储过程，"brr[1]"是格式
            alert("上传成功");//弹出
            location.reload();//刷新页面
        });
    } else {//如果不是
        img.select();//判断
        var url = document.selection.createRange().text;
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
        } catch (e) {
            alert('如果你用的是ie8以下 请将安全级别调低！');
        }
        alert("文件大小为：" + (fso.GetFile(url).size / 1024).toFixed(0) + "kb");
    }
} 
function checkFileExt(ext){//区分格式
    if (!ext.match(/.jpg|.gif|.png|.bmp/i)) {
        return false;
    }
    return true;
}
function remove(Id)//删除函数
{
	U.A.Request(mysql_address,([mysql_ip, mysql_database, "Eam_DelectFileName" ,Id]),function(r)//调用
	{
		alert("删除成功");
		location.reload(); 
    });
}
var currying = function (arg, fn)//封装
{
	return function ()
	{
		fn.apply(this, arg);
	}
}
function EAM_SF_text2(){//搜索功能
    var d;//定义变量
    $(".EAM_SF_mainbody")[0].innerHTML = "";//清空
    $(".m_a_pub_control")[0].style = "display:none";//隐藏页码
    var head = $(".EAM_SF_mainbody")[0];//创建
    var litest = $$("li",{},head);//创建
    var ultest = $$("ul",{},litest);//创建
    U.A.Request(mysql_address,([mysql_ip,mysql_database,"Eam_selectFileName"]),function(r){//调用”查询文件“存储过程
        res = r.value;
        var array = [];
            for(var i =0 ;i<res.length;i++){
                var  obj;
                obj = res[i].Name;
                array.push(obj);
            };
        var ss = $(".EAM_SF_text1")[0].value;//获取搜索框内容
            for( var i = 0;i< res.length;i++){
                var Name = res[i].Name;
                     if(array[i].indexOf(ss) != -1){//筛选排除
                        var head = $(".EAM_SF_mainbody")[0];
                        var li = $$("li",{},head);
                        var ul = $$("ul",{},li);
                        var lis = $$("li",{"class":"EAM_SF_first","innerHTML":Name},ul);//如果有就显示出来
                        var last = $$("li",{"class":"EAM_SF_last","innerHTML":"默认"},ul);
                        var delect = $$("li",{"class":"EAM_SF_last","innerHTML":"删除"},ul);
                        delect.onclick = currying([res[i].Id],remove);
                    }
        }
    })
}
var index = 0;
	function page()//页码功能实现
	{
		var lastest = $(".m_a_pub_btn")[0];
		var last = $(".m_a_pub_btn")[1];
		var next = $(".m_a_pub_btn")[2];
		var nextest = $(".m_a_pub_btn")[3];
		var pagelength = U.A.Request(mysql_address, ([mysql_ip, mysql_database, "Eam_yemaFileName"])).value[0].length; //返回页数
		var i,div;
		var pageContent = $(".m_a_pub_pages")[0]; //获取页码div
		for(i=0;i<pagelength/9;i++)
		{//循环生成页码div
			div = $$("button",{"class":"anniu"},last);
			if(i==0){div.style.cssText="border-color: #0094FF;"}//改变第一个页码div样式
			div.innerHTML = i+1;
			div.addEventListener("click",function()
            {//附点击事件
				loockup(this.innerHTML)
				this.style.borderColor = "#0094ff";
				pageContent.children[index].style.borderColor="#eeeeee";
				index = this.innerHTML-1;
			});
			lastest.onclick=function()
			{
				var index = 0;
				pageLength.children[index].click();				   
			}
		last.onclick=function()
		{
			if(index==0)
			{
				alert("没有页面了！");
			}
			else
			{
				if(parseInt(pagelength) >1)
				{
					pageLength.children[index-1].click();
				}
			}
		}
		next.onclick=function()
		{
			if(parseInt(pagelength/9) == index)
			{
				alert("没有页面了！");
			}
			else
			{
				pageLength.children[index+1].click();
			}
		}
			nextest.onclick=function()
			{
				var index = parseInt(pagelength/9);
				pageLength.children[index].click();
			}
		pageContent.appendChild(div);
		}
    }
console.log("     ┌─┐       ┌─┐\n  ┌──┘ ┴───────┘ ┴──┐\n  │                 │\n  │       ───       │\n  │  ─┬┘       └┬─  │\n  │                 │\n  │       ─┴─       │\n  │                 │\n  └───┐         ┌───┘\n      │         │\n      │         │\n      │         │\n      │         └──────────────┐\n      │                        │\n      │                        ├─┐\n      │                        ┌─┘\n      │                        │\n      └─┐  ┐  ┌───────┬──┐  ┌──┘\n        │ ─┤ ─┤       │ ─┤ ─┤\n        └──┴──┘       └──┴──┘\n               神兽保佑\n              代码无BUG!\n")