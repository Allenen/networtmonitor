<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>多媒体业务性能测量任务UI</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="多媒体业务性能测量任务UI">
	
  </head>
  
  <body>
	<div id ="multiMediaDiv" style="padding:10px;text-align: center;margin: 0 auto;">
		<div>
			<form id="multiMediaForm" name ="multiMediaForm" method="post">
				<input type="hidden" name="task_type" value="7"/>
				<table style="width: 100%;">
					<tr>
						<td colspan="8">任务名称:<input id ="multiMediaTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					</tr>
					<tr>
						<td colspan="8">任务主体:<input id="multiMediaTask_subject" style="width:350px;" name="task_subject" /></td>
					</tr>
					<tr>
						<td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="30" style="width:50px;"/>
							<select name="interval_unit" id="detectcc2" class="easyui-combobox" style="width:50px;">
								<option value="s">秒</option>
								<option value="m">分</option>
								<option value="h">时</option>
							</select>
						</td>
					</tr>
				</table>
				<table style="text-align: center;margin: 0 auto;">
					<tr>
						<td>可选目标设备：</td>
						<td>
						</td>
						<td>已选目标设备：</td>
					</tr>
					<tr>
						<td rowspan="2">
							<select multiple="multiple" id="MultiMediaTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px;border-color: #95B8E7;"/>
						</td>
						<td>
							<a id="btnd1" href="javascript:void(0);" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> >> </a>
						</td>
						<td rowspan="2">
							<select multiple="multiple" id="MultiMediaChooseTargetDevices" name = "chooseTargetDevicesList" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px;border-color: #95B8E7;"></select>
						</td>
					</tr>
					<tr>
						<td><a id="btnd2" href="javascript:void(0);" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"> << </a></td>
					</tr>
				</table>
				<table style="text-align: center;margin: 0 auto;">
					<tr>
						<td><label><input type="checkbox"> </label>跨域测量</td>
						<td>目标探针申请：</td>
						<td><label><input type="radio" name="tanZhengType" value="dev"> </label>按设备名</td>
						<td><label><input type="radio" name="tanZhengType" value="ip"> </label>按IP</td>
						<td><label><input type="radio" name="tanZhengType" value="com"> </label>按单位名</td>
					</tr>
					<tr> <td colspan="5"><input class="easyui-textbox" type="text" style="width:350px;"/></td></tr>
				</table>
				</form>
				<form id="modelForm">
					<table  >
						<tr><td colspan="4">策略参数：</td></tr>
						<tr>
							<td colspan="8">
								<input type="radio" name="m_mode_type" checked="checked" value="1"/>回放模式
								<input type="radio" name="m_mode_type" value="2"/>自定义流模式
								<a href="javascript:void(0);" onclick= "savePolicy();" class="easyui-linkbutton">保存策略</a>
							</td>
						</tr>
					</table>
				</form>
				 
					<!-- 回放模式 -->
				   <div id="playbackModel">
					<form id="playbackForm">
					<table>
						<tr>
							<td>
								定制新业务:<input id="playbackService" class="easyui-combobox" name="service_name" style="width:80%;float:left;" value="请选择业务模板">
							</td>
						</tr>
					   <tr>
						   <td colspan="8"> 业务类型:
							   <select name="m_service_type" id="m_service_type" class="easyui-combobox" style="width:140px;">
								   <option value="videoconf">视频会议</option>
								   <option value="VoIP">VoIP</option>
							   </select>  业务名称:
							   <select name="m_servicename" id="m_servicename" class="easyui-combobox" style="width:200px;">
								   <option value="videoconf-mil">四总部及直属单位视频会议系统</option>
								   <option value="videoconf-hwl">华为高清视频会议系统</option>
							   </select>
							   <a href="javascript:void(0);" onclick= "saveService();" class="easyui-linkbutton">定制为新业务</a>
						   </td>
					   </tr>
					   <tr>
						   <td colspan="7">
							   <input type="checkbox" name="is_timeController" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制
														  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
														  至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
						   </td>
					   </tr>
					</table>
					</form>
				   </div>
				   <!-- 自定义流模式 -->
				   <div id="customModel" style="display:none;">
				   <form id="customForm">
					<table>
						<tr>
							<td>
								定制新业务:<input id="defineService" class="easyui-combobox" name="service_name" style="width:80%;float:left;" value="请选择业务模板">
							</td>
						</tr>
						<tr>
						   <td colspan="7">
							   <input type="checkbox" name="is_timeController" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制
														  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00"  style="width:150px" data-options="showSeconds:true">
														  至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59"  style="width:150px" data-options="showSeconds:true">
							   <a href="javascript:void(0);" onclick="addFlowRecord()" class="easyui-linkbutton">增加流记录</a>
							   <input class="easyui-textbox" id="flowRecordId"/>
							   <a href="javascript:void(0);" onclick="deleteFlowRecord($('#flowRecordId').val())" class="easyui-linkbutton">删除流记录</a>
							   <a href="javascript:void(0);" onclick="saveService();" class="easyui-linkbutton">定制为新业务</a>
						   </td>
						</tr>
					</table>
					<!-- 流记录 -->
					<div id="flowRecord">
						
					</div>
					</form>
				</div>
				
				<!-- 编辑多媒体业务性能测量任务的菜单栏 -->
				<div style="float: right;margin-top:2px;">
					<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(0);">保存</a>
					<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(1);">保存并激活</a>
				</div>
			 </div>  
	</div>
	
	<script type="text/javascript" src="ztree/js/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="ztree/js/jquery.ztree.excheck.js"></script>
	
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/moveOptionForTargetDevices.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/MultiMediaTaskAddUI.js"></script>
</body>
