//1.文档加载完成
$(function(){
	$("input[name='username']").focus();
});

//2.键盘事件
document.onkeydown = function(e)
{
	var event = e || window.event;
	var code = event.keyCode || event.which || event.charCode;
	if(code == 13)
		login();
};

//3.登录
function login()
{
	var userid = $("input[name='username']").val(), password = $("input[name='password']").val();
	console.log(userid + " " + password);
	if(userid == "" || password == "")
	{
		//3.1 提示信息
		$("#showMsg").html("用户名或密码不能为空");
		$("input[name='username']").focus();
	}else
	{
		$.ajax({
			type:"POST",
			url:"clientlogin1.html",
			data: "userid="+userid+"&password="+password, //序列化
			success:function(data)
			{
				if(data == "success")
					window.location.href = "index.html";
				else
					$("#showMsg").html("用户名或密码错误");//提示信息
			},
			error:function(request)
			{
				$("#showMsg").html(request);//提示信息
			}
		});
	}
	
}