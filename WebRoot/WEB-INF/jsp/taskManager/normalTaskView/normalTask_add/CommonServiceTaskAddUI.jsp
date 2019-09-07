<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>通用业务性能测量任务UI</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="通用业务性能测量任务UI">

	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
	
  </head>
  
  <body>
	<div id ="commonServiceDiv" style="padding:10px;text-align: center;margin: 0 auto;">
	   
		<form id="commonServiceForm" name ="commonServiceForm" method="post">
			<input type="hidden" name="task_type" value="8"/>
		
			<table style="width: 100%;">
				<tr>
					<td colspan="8">任务名称:<input id ="commonServiceTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
				</tr>
				<tr>
					<td colspan="8">任务主体:<input id="commonServiceTask_subject" style="width:350px;" name="task_subject" /></td>
				</tr>
				<tr>
					<td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" value="192.9.201.10">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="is_cycle" value="1" checked="checked" onclick="this.value=(this.value==0)?1:0">
					周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="30" style="width:50px;"/>
						<select name="interval_unit" id="detectcc2" class="easyui-combobox" style="width:50px;">
							<option value="s">秒</option>
							<option value="m">分</option>
							<option value="h">时</option>
						</select>
					</td>
				</tr>
				<tr style="margin-top:5px;">
					<td>
						<label>业务类型:</label>&nbsp;&nbsp;
						<input type="radio" name="serviceType" checked="checked" value="web"/><label>WEB</label>&nbsp;&nbsp;
						<input type="radio" name="serviceType" value="ftp"/><label>FTP</label>&nbsp;&nbsp;
						<input type="radio" name="serviceType" value="dns"/><label>DNS</label>&nbsp;&nbsp;
						<input type="radio" name="serviceType" value="email"/><label>EMAIL</label>
					</td>
					<td></td>
				</tr>
			</table>
		</form>
		
		<!-- web类型的业务 -->
		<div id="WEBDiv" >
			<form id="commonWEBForm">
			<table  style="border:1px solid #95B8E7;padding:10px;margin:10px 0;">
				<tr><td colspan="4">策略参数：</td></tr>
				<tr>
					<td colspan="8">
						<label>服务器端口:</label>
						<input id="m_server_port_web" class="easyui-textbox" name="m_server_port" value="80" readonly="readonly" style="width:70px;"/>
						<label>访问文件:</label><input id="m_file_to_browse_web" class="easyui-textbox" type="text" name="m_file_to_browse" value="/" style="width:100px;" readonly="readonly"/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<a href="javascript:void(0);" onclick= "setPolicyEditable();" class="easyui-linkbutton">修改策略</a>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<input type="checkbox" id="is_cycle_web" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
						 自：<input id="start_time_web" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
																	   至：<input id="end_time_web" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
						&nbsp;<a href="javascript:void(0);" onclick= "savePolicy();" class="easyui-linkbutton">另存策略</a>
					</td>
				</tr>
				<tr>
					<td>选择策略:<input id="WEBStrategy" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
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
					<select multiple="multiple" id="CommonWEBTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px;border-color: #95B8E7;"/>
				</td>
				<td>
				</td>
				<td rowspan="2">
					<select style="width:200px;border-color: #95B8E7;" id="CommonWEBChooseTargetDevices"></select>
				</td>
			</tr>
		</table>
			</form>
		</div>
			
		<!-- FTP类型的业务 -->
		<div id="FTPDiv" style="display:none;">
			<form id="commonFTPForm">
			<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
				<tr><td colspan="4">策略参数：</td></tr>
				<tr>
					<td colspan="8">
						<label>服务器端口:</label>
						<input id="m_server_port_ftp" class="easyui-textbox" name="m_server_port" value="21" style="width:70px;" readonly="readonly"/>
						<label>用户名:</label><input id="m_username_ftp" class="easyui-textbox" type="text" name="m_username" value="anonymous" style="width:100px;" readonly="readonly"/>
						<label>口令:</label><input id="m_password_ftp" class="easyui-textbox" type="text" name="m_password" value="user@test.org" style="width:100px;" readonly="readonly"/>
						<a href="javascript:void(0);" onclick= "setPolicyEditable();" class="easyui-linkbutton">修改策略</a>
					</td>
				</tr>
				<tr>
					<td colspan="8">
						<label>下载文件:</label>
						<input id="m_download_file_ftp" class="easyui-textbox" name="m_download_file" value="/test.txt" readonly="readonly" style="width:70px;"/>
						<a href="javascript:void(0);" onclick= "savePolicy();" class="easyui-linkbutton">另存策略</a>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<input type="checkbox" id="is_cycle_ftp" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
						 自：<input id="start_time_ftp" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
						至：<input id="end_time_ftp" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
				</tr>
				<tr>
					<td>选择策略:<input id="FTPStrategy" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
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
					<select  multiple="multiple" id="CommonFTPTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px;border-color: #95B8E7;"/>
				</td>
				<td>
				</td>
				<td rowspan="2">
					<select style="width:200px;border-color: #95B8E7;" id="CommonFTPChooseTargetDevices"></select>
				</td>
			</tr>
		</table>
			</form>
		</div>
			
		<!-- DNS类型的业务 -->
		<div id="DNSDiv" style="display:none;">
			<form id="commonDNSForm">
			<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
				<tr><td colspan="4">策略参数：</td></tr>
				<tr>
					<td colspan="8">
						<label>服务器端口:</label>
						<input id="m_server_port_dns" class="easyui-textbox" name="m_server_port" value="53" readonly="readonly" style="width:70px;"/>
						<label>解析域名:</label><input id="m_file_to_browse_dns" class="easyui-textbox" type="text" name="m_file_to_browse" value="www.lgdx.mtn" readonly="readonly" style="width:100px;"/>
						<a href="javascript:void(0);" onclick= "setPolicyEditable();" class="easyui-linkbutton">修改策略</a>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<input type="checkbox" id="is_cycle_dns" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
						 自：<input id="start_time_dns" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
						至：<input id="end_time_dns" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick= "savePolicy();" class="easyui-linkbutton">另存策略</a>
					</td>
				</tr>
				<tr>
					<td>选择策略:<input id="DNSStrategy" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
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
					<select  multiple="multiple" id="CommonDNSTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px;border-color: #95B8E7;"/>
				</td>
				<td>
				</td>
				<td rowspan="2">
					<select style="width:200px;border-color: #95B8E7;" id="CommonDNSChooseTargetDevices"></select>
				</td>
			</tr>
		</table>
			</form>
		</div>
			
		<!-- EMAIL类型的业务 -->
		<div id="EMAILDiv" style="display:none;">
			<!-- <form id="commonEMAILForm">-->
			<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
				<tr><td colspan="4">策略参数：</td></tr>
				<tr>
					<td colspan="8">
					<form id="commonEMAILSMTPForm">
						<input id="smtp" type="checkbox" name="m_service_type" onclick="this.value=($(this).is(':checked') ? 'smtp':'')"/><label>SMTP</label>
						<label>SMTP服务器端口:</label>
						<input id="m_server_port_smtp" class="easyui-textbox" name="m_server_port" value="25" readonly="readonly" style="width:70px;"/>
						<label>账户名:</label><input id="m_mailbox_smtp" class="easyui-textbox" type="text" name="m_mailbox" value="user@lgdx.mtn" readonly="readonly" style="width:100px;"/>
						<label>口令:</label><input id="m_password_smtp" class="easyui-textbox" type="text" name="m_password" value="123" readonly="readonly" style="width:70px;"/>
						<label>接收者:</label><input id="m_recv_addr_smtp" class="easyui-textbox" type="text" name="m_recv_addr" value="usera@mail.zc" readonly="readonly" style="width:100px;"/>
					</form>
					</td>
				</tr>
				<tr>
					<td colspan="8">
					<form id="commonEMAILPOP3Form">
						<input id="pop3" type="checkbox" name="m_service_type" onclick="this.value=($(this).is(':checked') ? 'pop3':'')"/><label>POP3</label>
						<label>POP3服务器端口:</label>
						<input id="m_server_port_pop3" class="easyui-textbox" name="m_server_port" value="110" readonly="readonly" style="width:70px;"/>
						<label>账户名:</label><input id="m_mailbox_pop3" class="easyui-textbox" type="text" name="m_mailbox" value="user@lgdx.mtn" readonly="readonly" style="width:100px;"/>
						<label>口令:</label><input id="m_password_pop3" class="easyui-textbox" type="text" name="m_password" value="123" readonly="readonly" style="width:70px;"/>
					</form>
					</td>
				</tr>
				<tr>
					<td colspan="7">
					<form id="commonEMAILTimeForm">
						<input id="is_cycle_email" type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
						 自：<input id="start_time_email" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
						至：<input id="end_time_email" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick= "setPolicyEditable();" class="easyui-linkbutton">修改策略</a>
					</form>
					</td>
				</tr>
				<tr>
					<td>
						<form id="commonEMAILForm">
						选择策略:<input id="EMAILStrategy" class="easyui-combobox" style="width:350px;" value="请选择任务策略">
						<a href="javascript:void(0);" onclick="savePolicy();" class="easyui-linkbutton">另存策略</a>
						</form>
					</td>
				</tr>
			</table>
			<!--</form>-->
			<table style="text-align: center;margin: 0 auto;">
			<tr>
				<td>可选目标设备：</td>
				<td>
				</td>
				<td>已选目标设备：</td>
			</tr>
			<tr>
				<td rowspan="2">
					<select  multiple="multiple" id="CommonEMAILTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px;border-color: #95B8E7;"/>
				</td>
				<td> </td>
				<td rowspan="2">
					<select style="width:200px;border-color: #95B8E7;" id="CommonEMAILChooseTargetDevices"></select>
				</td>
			</tr>
		</table>
		</div>
			l
		<!-- 编辑通用业务性能测量任务的菜单栏 -->
		<div style="float: right;margin-top:2px;">
			<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(0);">保存</a>
			<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(1);">保存并激活</a>
		</div>
			
	</div>
	
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/moveOptionForTargetDevices.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/CommonServiceTaskAddUI.js"></script>

</body>
