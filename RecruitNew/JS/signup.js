var Url = "http://cd.1473.cn/php";
	Address = "db.1473.cn";
	Database = "UseStudio-Register";
	// HS.Pub.BackAddress = "120.78.172.95";
	// HS.Pub.BackDB = "hospitalsystem";

window.onload = function () {
	// 查询参加项目
	U.A.Request(Url,[Address,Database,"select_project"],function (r){
		 // console.log(r);
		 if(r.value){
		 	for (var i = 0; i < r.value.length; i++) {
		 		// $("#proType")[0].innerHTML+="<option class='pro' value='"+ $("#proType")[0] +"' onclick='select_pro(this)'>"+ r.value[i].pro_name +"</option>";
		 		$$("option",{'id':r.value[i].ip,'innerHTML':r.value[i].pro_name},$("#proType")[0]);
		 	}
		 }
	});
	// 查询招新部门
	U.A.Request(Url,[Address,Database,"select_department"],function (r){
		// console.log(r);
		if(r.value){
		 	for (var i = 0; i < r.value.length; i++) {
		 		//$("#proType")[0].innerHTML+="<option class='dep' value='"+ $("#depType")[0] +"' onclick='select_pro(this)'>"+ r.value[i].dep_name +"</option>";
		 		$$("option",{'id':r.value[i].ip,'innerHTML':r.value[i].dep_name},$("#depType")[0]);
		 	}
		}
	});	
	// 判断报名截止时间
    var myDate = new Date();
    if (myDate.toLocaleDateString() == "2018/11/25") {
        $(".stop-recruit")[0].style.display = 'block';
        // $(".alertDiv")[0].style.display = 'block';
    } else {
        $(".stop-recruit")[0].style.display = 'none';
        // $(".alertDiv")[0].style.display = 'none';
    }
};

function getValue(name){
	return $('#myForm')[0][name].value;
}

function mySubmit(){
/*    if(!$(".pro-click")[0]){
        alert('选择一个项目');
        return false;
    }*/

	var isNull = true;
	// 获取信息
	var inputValues = [
		getValue('name'),
		getValue('class'),
		getValue('qq'),
		getValue('phone'),
		getValue('studentId'),
		$("#depType")[0].value,
		// getValue('proName'),
        // getValue('proText'),
		// getValue('teamName'),
        // $(".pro-click")[0].innerText,
	]

    var regName =/^[\u4e00-\u9fa5]{2,4}$/;
    if (!regName.test(inputValues[0])) {
        alert('真实姓名填写有误');
        return false;
    };
    if (inputValues[1].length < 8) {
        alert('班级格式有误');
        return false;
	};
    if (!(/^1[3|4|5|7|8][0-9]{9}$/).test(getValue('phone'))) {
        alert("不是完整的11位手机号或者正确的手机号前七位");
        document.mobileform.mobile.focus();
        return false;
	};
    if (!RegExp(/^[1-9][0-9]{4,9}$/).test(getValue('qq'))) {
        alert("请输入正确的QQ号码");
        return false;
    };
    inputValues.map (function (v) {
		isNull && (isNull = !!(v?v.length: v))
	});
/*	if (!isNull) { 
		U.Alert('所有选项均为必填项！'); 
		return;
	};*/
	// 提交报名资料
	U.A.Request(Url,[Address,Database,"insert_recruit_new",inputValues[0],inputValues[1],inputValues[2],inputValues[3],inputValues[4],inputValues[5]],function (r) {
	// ajax (['insert_audit'].concat (inputValues),function (r) {
		if (r.value!=-1) {
			$(".op-main")[0].style.display = 'block';
            $(".alertDiv")[0].style.display = 'block';
		} else {
		    alert('报名失败！');
		};
	// });
	});
};
// 提交成功，点击确定隐藏弹窗
// 最后清空输入框内容
function cancel () {
    $(".op-main")[0].style.display = 'none';
    $(".alertDiv")[0].style.display = 'none';
    window.location.reload();
};

/*function select_pro(_this) {
    for(let i = 0; i < $("#depType")[0].children.length; i++){
        $("#depType")[0].children[i].className = 'dep';
    };
    _this.className = 'dep dep-click';
};*/