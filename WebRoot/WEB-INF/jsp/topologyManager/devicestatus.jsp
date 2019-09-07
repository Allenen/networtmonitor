<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html style="height: 100%;">
<head>
    <meta charset="utf-8"/>
    
    <base href="<%=basePath%>">
    <title>设备状态</title>
		
	<script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script src="bootstrap/bootstrap.min.js"></script>	
    <script src="qunee/qunee-min.js"></script>
	
	<!-- 自定义javascript文件-->
    <script src="js/topologyManager/common.js"></script>
	<script src="js/topologyManager/JSONSerializer.js"></script>
	<script src="js/customnode/table.js"></script>
	<script src="js/customnode/customnode.js"></script>
	<script src="js/customnode/customnode_probe.js"></script>
	<script src="js/topologyManager/devicestatus.js"></script>
	
	<link rel="stylesheet" href="bootstrap/bootstrap.min.css"/>
	<link rel="stylesheet" href="jqueryEasyUI/easyui.css" />
	<link rel="stylesheet" href="css/topologymanager.css"/>
	<link rel="stylesheet" href="jqueryEasyUI/icon.css" />

</head>

<body style="overflow: hidden;height: 100%;">
   
    <div id="toolbar" class="q-toolbar"></div>
    <div id="canvas" class="q-canvas">
    </div>

</body>

</html>