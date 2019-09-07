<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en" style="height:100%;margin:0;padding:0;">
<head>
	<base href="<%=basePath%>">
    <title>网络性能监控系统 - 登录</title>
	<style> 
		 .content
		 {
			height:100%;  
			margin:0;padding:0;
			position:fixed;
			top:0;
			left:0;
			background-image:url("images/login/登录背景.png"); 
		 }
	</style>
	<script type="text/javascript" src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="js/userManager/login.js"></script>
</head>

<body style="margin:0;padding:0;height:100%;">
	<div class="content">
		<input name="username" type="text" style="margin-top:325px;margin-left:600px;width:245px;height:51px;background-color:transparent;border:0px;padding-left:15px;color:#fff;font-size:30px;" placeholder="用户名"/>
		<input name="password" type="password" style="margin-top:26px;margin-left:600px;width:245px;height:51px;background-color:transparent;border:0px;font-size:30px;padding-left:15px;color:#fff;" placeholder="密码"/>
		
		<div style="padding:15px 0;color: red;font-size:20px;margin-top:10px;margin-left:600px;width:200px;" id="showMsg"></div>
		<a href="javascript:void(0);" onclick="login();" style="margin-top:100px;margin-left:540px;"><img src="images/login/登录按钮.png"/></a>
	</div>

</body>

</html>
