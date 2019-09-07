<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>链路性能测量任务UI</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="链路性能测量任务UI">
	
  </head>
  
  <body>
	<div id ="PathPerformanceDiv" style="padding:10px;text-align:center;margin:0 auto;">
		<div>
		<form id="PathPerformanceForm" name ="PathPerformanceForm" method="post">
			<input type="hidden" name="task_type" value="5"/>
			
			<table style="width: 100%;">
				<tr>
					<td colspan="8">任务名称:<input id ="PathPerformanceTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
				</tr>
				<tr>
					<td colspan="8">任务主体:<input id="PathPerformanceTask_subject" style="width:350px;" name="task_subject" /></td>
				</tr>
				<tr>
					<td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="checkbox" name="is_cycle" value="1" checked="checked" onclick="this.value=(this.value==0)?1:0">
					上报间隔   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="30" style="width:50px;"/>
					<select name="interval_unit" id="detectcc1" class="easyui-combobox" style="width:50px;">
						<option value="s">秒</option>
					</select>
					</td>
				</tr>
				<tr>
					<td colspan="7"><input type="checkbox" name="is_timeController" value="0" onclick="this.value=(this.value==0)?1:0">
					时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
						至：<input id="end_time" name="e_end_time" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
				</tr>
			</table>
			<div >选择路由器及接口：</div>
			<div style="float:left;">
				<ul id="pathPerformanceTree" class="ztree"></ul>
			</div>
		</form>
		</div>
		
		<!-- 链路性能测量任务的菜单栏 -->
		<div style="float: right;margin-top:2px;">
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(0);">保存</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(1);">保存并激活</a>
		</div>
	</div>

	<script type="text/javascript" src="ztree/js/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="ztree/js/jquery.ztree.excheck.js"></script>
	
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/PathPerformanceTaskAddUI.js"></script>
</body>
