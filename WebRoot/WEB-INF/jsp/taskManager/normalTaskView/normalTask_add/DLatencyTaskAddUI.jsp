<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>双向时延、丢包率、时延抖动UI</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
	
  </head>
  
  <body>
	<div id ="DLatencyDiv" style="padding:10px;text-align: center;margin: 0 auto;" >
		<form id="DLatencyForm" name="DLatencyForm" method="post">
			<input type="hidden" name="task_type" value="1"/>
			
			<table>
				<tr>
					<td colspan="8">任务名称:<input id="DLatencyTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
				</tr>
				<tr>
					<td colspan="8">任务主体:<input id="DLatencyTask_subject" name="task_subject"  style="width:350px;"></td>
				</tr>
				<tr>
					<td colspan="8">
						上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" >
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="is_cycle" value="1" checked="checked" onclick="this.value=(this.value==0)?1:0">
						 周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" style="width:50px;"/>
						<select name="interval_unit" id="detectcc1" class="easyui-combobox" style="width:50px;">
							<option value="s">秒</option>
							<option value="m">分</option>
							<option value="h">时</option>
						</select>
					</td>
				</tr>
			</table>
			
			<table style="border:1px solid #95B8E7;padding:10px;width: 100%;">
				<tr><td colspan="4">策略参数：</td></tr>
				<tr>
					<td colspan="8">
						长包数:&nbsp;<input id="m_LPN" class="easyui-textbox" type="text" value="10" name="m_LPN" style="width:70px;" readonly="readonly"/>
                    	长包长度:<input id="m_LPL" class="easyui-textbox" type="text" name="m_LPL" value="1000" style="width:70px;" readonly="readonly"/>
                    	短包数:&nbsp;<input id="m_SPN" class="easyui-textbox" type="text" name="m_SPN" value="10" style="width:70px;" readonly="readonly"/>
                    	短包长度:<input id="m_SPL" class="easyui-textbox" type="text" name="m_SPL" value="100" style="width:70px;" readonly="readonly"/>
                    </td>
				</tr>
				<tr>
					<td colspan="7">
						时延阈值:<input id="m_DelayLimit" class="easyui-textbox" type="text" name="m_DelayLimit" value="100" readonly="readonly" style="width:70px;"/>(毫秒)
                    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;丢包阈值:<input id="m_LossLimit" class="easyui-textbox" type="text" name="m_LossLimit" value="20" readonly="readonly" style="width:70px;"/>(%)
                    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick= "setPolicyEditable();" class="easyui-linkbutton">修改策略</a>
                    </td>
                </tr>
                <tr>
                    <td colspan="7">
                    	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0">
                    	 时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
                    	至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
                    	&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick= "savePolicy();" class="easyui-linkbutton">另存策略</a>
                    </td>
                </tr>
                <tr>
                    <td>
                    	选择策略:<input id="DLatencyTaskAddUIStrategy" class="easyui-combobox" name="policy_name" style="width:350px;" value="请选择任务策略">
                    </td>
                </tr>
			</table>

			<table style="text-align: center;margin: 0 auto;">
				<tr>
					<td>可选目标设备：</td>
					<td></td>
					<td>已选目标设备：</td>
				</tr>
				<tr>
					<td rowspan="2">
						<select  multiple="multiple" id="DLatencyTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px;border-color: #95B8E7;"/>
					</td>
					<td>
						<a id="btnd1" href="javascript:void(0);" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> >> </a>
					</td>
					<td rowspan="2">
						<select id="DLatencyChooseTargetDevices" multiple="multiple" name = "chooseTargetDevices" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px;border-color: #95B8E7;"></select>
					</td>
				</tr>
				<tr>
					<td><a id="btnd2" href="javascript:void(0);" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"> << </a></td>
				</tr>
			</table>
		</form>
		
		<!-- 编辑路由器的菜单栏 -->
		<div style="float: right;margin-top:2px;">
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(0);">保存</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(1);">保存并激活</a>
		</div>
	</div>
	
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/moveOptionForTargetDevices.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/DLatencyTaskAddUI.js"></script>
</body>               
