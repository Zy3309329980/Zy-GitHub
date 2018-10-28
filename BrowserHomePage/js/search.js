// 获取input框
var input_box = document.getElementById("Search-input");
// 获取百度按钮
var baidu_btn = document.getElementById("Search-button");
// 键盘事件
input_box.onkeydown = function () {
    // 当按下回车键根据input值跳转页面
    if (event.keyCode == 13) {
        window.location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd="+input_box.value;
    };
};
// 单击百度一下按钮触发事件
baidu_btn.onclick = function () {
    var input_value = input_box.value;
    if (input_value == "" || input_value == null) {
        window.location.href = "../club.html";
    } else {
        window.location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd="+input_value;
    };
};



































window.location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd="+otext.value