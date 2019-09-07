<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<base href="<%=basePath%>">

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="快捷,创建,任务">
	<meta http-equiv="description" content="快捷方式创建任务">

	<title>快捷任务创建UI</title>

    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css">
 	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css">
 	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/demo.css">

    <script src="jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="jquery/jquery.json-2.2.min.js"></script>
    <script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>

    <script src="qunee/qunee-min.js" ></script>
    <script src="qunee/graph.editor.js"></script>
</head>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north'"  style="height: 30px; width: 50%; float: left;">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west'" style="height: 30px;width:50%;margin-top: 1px;">
					<input id="iconTaskType" name="dept" value="请选择任务类型" style="width:100%;height: 26px;">
				</div>
				<div data-options="region:'center'" style="height: 30px;margin-top: 1px;">
					任务名称: <input id="iconTaskName" type="text" name="taskName" style="width:60%;" class="easyui-textbox"/>
					<a href="javascript:void(0)" onclick="editIconTask();" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">修改</a> 
					<a href="javascript:void(0)" onclick="saveIconTask();" class="easyui-linkbutton" data-options="iconCls:'icon-save'">保存</a>
				</div>
			</div>
		</div>
		<div data-options="region:'center'"  style="height: 100%; width: 50%; float: left;">
			<div class="easyui-layout" data-options="fit:true">
				<div id="canvasLeft" style="height: 100%;margin-top: 1px;width:50%;float:left;border:dashed 1px;"></div>
					<div id="iconEditTaskDiv"></div>
					<div id="canvasRight" style="height: 100%;margin-top: 1px;border:dashed 1px;"></div>
				</div>
			</div>
 		</div>
		<div id="text" ></div>

<script type="text/javascript" src="js/taskManager/iconTask/topologyGraph_new.js"> </script> <!-- 用于图标式任务生成的拓扑图js -->
<script type="text/javascript" src="js/taskManager/iconTask/iconTask_new.js"></script>	<!-- 自定义js文件 -->
<script type="text/javascript" src="js/taskManager/iconTask/iconTaskSave_new.js"> </script> <!-- 用于图标式任务生成的拓扑图js -->

</body>
</html>
