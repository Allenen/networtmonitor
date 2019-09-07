<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String right = ">>", left = "<<";
String flag = "8";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>编辑双向时延、丢包率、时延抖动任务类型的界面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

  </head>
  
  <body>
    <div id ="commonServiceDiv" style="padding:10px;">
    <!-- 编辑通用业务性能测量任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(<%=flag %>,'','${task.task_stat}', '${task.task_num }');">保存</a>
    </div>
    <form id="commonServiceForm" name ="commonServiceForm" method="post">
        <h3 class="fl">通用业务性能测量任务</h3>
        <input type="hidden" id="policy" name="policy" value="${policy }"/>
        <input type="hidden" id="task_num" name="task_num" value="${task.task_num }"/>
        <input type="hidden" id="task_type" name="task_type" value="<%=flag%>"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称：<input id ="commonServiceTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体：<input id="taskSubject" style="width:350px;" name="task_subject" value="${task.task_subject }"/></td>
            </tr>
            <tr>
                <td colspan="8">
                	上报IP：&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" value="${task.send_ip }">
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0" <c:if test="${task.is_cycle == 1}">checked="checked"</c:if>/> 
                	周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="${task.task_interval}" style="width:50px;"/>
                    <input name="interval_unit" id="detectcc2" value="${task.interval_unit }" style="width:50px;"/>

                </td>
            </tr>
            <tr style="margin-top:5px;">
            	<td>
	            	<label>业务类型：</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType" checked="checked"/><label>WEB</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType"/><label>FTP</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType"/><label>DNS</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType"/><label>EMAIL</label>
            	</td>
            	<td></td>
            </tr>
        </table>
        </form>
        <!-- web类型的业务 -->
        <div id="WEBDiv" >
        	<form id="commonWEBForm">
        	<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
	            <tr><td colspan="4">策略参数：</td></tr>
	            <tr>
	                <td colspan="8">
	                	<label>服务器端口：</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="80" readonly="readonly" style="width:70px;"/>
	                 	<label>访问文件:</label><input id="m_file_to_browse" class="easyui-textbox" type="text" name="m_file_to_browse" value="/" style="width:100px;"/>
	                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;<a href="#" onclick= "savePolicy(<%=flag %>)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td>选择策略:<input id="strategy<%=flag %>" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
	            </tr>
        	</table>
        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select multiple="multiple" id="CommonWEBTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
                    	<c:forEach items="${equipList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
                </td>
                <td>
                </td>
                <td rowspan="2">
                    <select style="width:200px;" id="CommonWEBChooseTargetDevices">
                    	<c:forEach items="${taskList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
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
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="21" readonly="readonly" style="width:70px;"/>
	                 	<label>用户名:</label><input id="m_username" class="easyui-textbox" type="text" name="m_username" value="anonymous" readonly="readonly" style="width:100px;"/>
	                 	<label>口令:</label><input id="m_password" class="easyui-textbox" type="text" name="m_password" value="user@test.org" readonly="readonly" style="width:100px;"/>
	                	<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="8">
	                	<label>下载文件:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="/test.txt" readonly="readonly" style="width:70px;"/>
	                	<a href="#" onclick= "savePolicy(8)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	                </td>
	            </tr>
	            <tr>
	                <td>选择策略:<input id="strategy<%=flag %>>" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
	            </tr>
        	</table>
        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select  multiple="multiple" id="CommonFTPTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
                    </select>
                </td>
                <td>
                </td>
                <td rowspan="2">
                	<select style="width:200px;" id="CommonFTPChooseTargetDevices"></select>
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
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="53" readonly="readonly" style="width:70px;"/>
	                 	<label>解析域名:</label><input id="m_file_to_browse" class="easyui-textbox" type="text" name="m_file_to_browse" value="www.lgdx.mtn" readonly="readonly" style="width:100px;"/>
	                	<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "savePolicy(8)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td>选择策略:<input id="strategy10" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
	            </tr>
        	</table>
        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select  multiple="multiple" id="CommonDNSTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
                    </select>
                </td>
                <td>
                </td>
                <td rowspan="2">
                	<select style="width:200px;" id="CommonDNSChooseTargetDevices"></select>
                </td>
            </tr>
        </table>
        	</form>
        </div>
        
        <!-- EMAIL类型的业务 -->
        <div id="EMAILDiv" style="display:none;">
        	<!-- <form id="commonEMAILForm"> -->
        	<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
	            <tr><td colspan="4">策略参数：</td></tr>
	            <tr>
	                <td colspan="8">
	                <form id="commonEMAILSMTPForm">
	                	<input id="smtp" type="checkbox" name="m_service_type" onclick="this.value=($(this).is(':checked') ? 'smtp':'')"/><label>SMTP</label>
	                	<label>SMTP服务器端口:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="25" readonly="readonly" style="width:70px;"/>
	                 	<label>账户名:</label><input id="m_mailbox" class="easyui-textbox" type="text" name="m_mailbox" value="user@lgdx.mtn" readonly="readonly" style="width:100px;"/>
	                 	<label>口令:</label><input id="m_password" class="easyui-textbox" type="text" name="m_password" value="123" readonly="readonly" style="width:70px;"/>
	                	<label>接收者:</label><input id="m_recv_addr" class="easyui-textbox" type="text" name="m_recv_addr" value="usera@mail.zc" readonly="readonly" style="width:100px;"/>
	                </form>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="8">
	                <form id="commonEMAILPOP3Form">
	                	<input id="pop3" type="checkbox" name="m_service_type" onclick="this.value=($(this).is(':checked') ? 'pop3':'')"/><label>POP3</label>
	                	<label>POP3服务器端口:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="110" readonly="readonly" style="width:70px;"/>
	                 	<label>账户名:</label><input id="m_mailbox" class="easyui-textbox" type="text" name="m_mailbox" value="user@lgdx.mtn" readonly="readonly" style="width:100px;"/>
	                 	<label>口令:</label><input id="m_password" class="easyui-textbox" type="text" name="m_password" value="123" readonly="readonly" style="width:70px;"/>
	                </form>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                <form id="commonEMAILTimeForm">
	                	<input id="time" type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </form>
	                </td>
	            </tr>
	            <tr>
	                <td>
	                	选择策略:<input id="strategy11" class="easyui-combobox" style="width:350px;" value="请选择任务策略">
	                	<a href="#" onclick="savePolicy(8)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
        	</table>

        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select  multiple="multiple" id="CommonEMAILTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
                    </select>
                </td>
                <td> </td>
                <td rowspan="2">
                	<select style="width:200px;" id="CommonEMAILChooseTargetDevices"></select>
                </td>
            </tr>
        </table>
        </div>
        
        
	</div>
	<script src="js/selfJS/task/listTask/moveOption.js"></script>		<!-- 任务目标设备移动 -->

  </body>
</html>
