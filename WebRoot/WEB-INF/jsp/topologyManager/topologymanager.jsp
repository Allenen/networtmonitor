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
    <title>拓扑管理</title>
	
	
	<script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script src="bootstrap/bootstrap.min.js"></script>	
    <script src="qunee/qunee-min.js"></script>
	
	<!-- 自定义javascript文件-->
    <script src="js/topologyManager/common.js"></script>
	<script src="js/topologyManager/JSONSerializer.js"></script>
	<script src="js/topologyManager/topologymanager.js"></script>
	<script src="js/util/input_style.js"></script>
	
	<link rel="stylesheet" href="bootstrap/bootstrap.min.css">
	<link rel="stylesheet" href="jqueryEasyUI/easyui.css" >
	<link rel="stylesheet" href="jqueryEasyUI/icon.css" />
    
	<link rel="stylesheet" href="css/topologymanager.css">  
	

	
</head>

<body style="overflow: hidden;height: 100%;" oncontextmenu="doNothing()">
     
    <div id="toolbar" class="q-toolbar"></div>
    <div id="canvas_panel" class="q-content">
        <div id="canvas" ondrop="drop(event)" ondragover="allowDrop(event)"  class="q-canvas"></div>
        <div id="toolbox" style="overflow: auto;height:100%;" dir="rtl"></div>
    </div>
</body>

<div id="save_dialog" data-options="iconCls:'icon-save'" style="padding:5px; width:400px; height:125px; dispaly:none">
    文件名：
    <input type="text" name="filename" id="filename"  value="请输入文件名" class="input_test" >
</div>
<div id="mm" class="easyui-menu" style="width:70px;height:77px">
	<div data-options="iconCls:'icon-edit',name:1">编辑</div>
	<div data-options="iconCls:'icon-reload',name:2">重命名</div>
	<div data-options="iconCls:'icon-delete',name:3">删除</div>
</div>

<div id="mm_router" class="easyui-menu" style="width:70px;height:77px">
	<div data-options="iconCls:'icon-edit'">
		<span>编辑</span>
		<div style="width:80px;">
			<div data-options="name:1">基本信息</div>
			<div data-options="name:2">接口信息</div>
		</div>
	</div>
	<div data-options="iconCls:'icon-reload',name:3">重命名</div>
	<div data-options="iconCls:'icon-delete',name:4">删除</div>
</div>

</html>