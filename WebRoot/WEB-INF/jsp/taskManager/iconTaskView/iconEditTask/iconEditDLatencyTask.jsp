<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>图标式编辑双向时延、丢包率、时延抖动任务类型的界面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="jqueryEasyUI/icon.css" rel="stylesheet">
    <link rel="stylesheet" href="jqueryEasyUI/easyui.css" rel="stylesheet">
	
  </head>
  
  <body>
    <div id ="DLatencyDiv" style="padding:10px;margin:10px 0;" >
	    <!-- 操作的菜单栏-->
		<div style="float: right;margin-top:2px;">
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(1,'#DLatencyChooseTargetDevices',0);">保存修改</a>
		</div>
		
        <form id="DLatencyForm" name="DLatencyForm" method="post">
        	<h3 class="fl">双向时延、丢包、时延抖动任务</h3>
            <input type="hidden" name="task_type" value="1"/>
            <table style="width: 100%;">
            	<tr>
                	<td colspan="8">任务名称:<input id="DLatencyTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
                </tr>
           		<tr>
           			<td colspan="8">任务主体:<input id="DLatencyTask_subject" name="task_subject"  style="width:350px;" value="${task.task_subject }" class="easyui-combobox" data-options="valueField: 'text',textField: 'text',url: 'get_AjaxTanzhenEquip.html'"></td>
           		</tr>
           		<tr>
           			<td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" value="${task.send_ip }">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           			<input type="checkbox" name="is_cycle" value="0" checked="checked" onclick="this.value=(this.value==0)?1:0"> 周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="${task.task_interval }" style="width:50px;"/>
           				<select name="interval_unit" id="detectcc1" class="easyui-combobox" value="${interval_unit }" style="width:50px;">
                               <option value="s">秒</option>
                               <option value="m">分</option>
                               <option value="h">时</option>
                           </select>
           			</td>
           		</tr>
                    		</table>
                    		<table id="sa" style="border:1px solid #ccc;padding:10px;margin:10px 0;">
                    		<tr><td colspan="4">策略参数：</td></tr>
                    		<tr>
                    			<td colspan="8">长包数:&nbsp;<input id="m_LPN" class="easyui-textbox" type="text" value="10" name="m_LPN" style="width:70px;"/>
                    			长包长度:<input id="m_LPL" class="easyui-textbox" type="text" name="m_LPL" value="1000" style="width:70px;"/>
                    			短包数:&nbsp;<input id="m_SPN" class="easyui-textbox" type="text" name="m_SPN" value="10" style="width:70px;"/>
                    			短包长度:<input id="m_SPL" class="easyui-textbox" type="text" name="m_SPL" value="100" style="width:70px;"/>
                    			</td>
                    			
                    		</tr>
                    		<tr>
                    			<td colspan="7">时延阈值:<input id="m_DelayLimit" class="easyui-textbox" type="text" name="m_DelayLimit" value="100" readonly="readonly" style="width:70px;"/>(毫秒)
                    				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;丢包阈值:<input id="m_LossLimit" class="easyui-textbox" type="text" name="m_LossLimit" value="20" readonly="readonly" style="width:70px;"/>(%)
                    				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
                    			</td>
                    		</tr>
                    		<tr>
                    			<td colspan="7">
                    			<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0">
                    			 时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
                    				至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
                    				&nbsp;&nbsp;&nbsp;<a href="#" onclick= "savePolicy(1)" class="easyui-linkbutton">另存策略</a>
                    			</td>
                    		</tr>
                    		<tr>
                    			<td>
                    				选择策略:<input id="strategy1" class="easyui-combobox" name="policy_name" style="width:350px;" value="请选择任务策略">
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
									<select  multiple="multiple" id="DLatencyTargetDevices" name = "targetDevices" size=16 style="width:200px;border-color: #95B8E7;"/>
									<!--<select  multiple="multiple" id="DLatencyTargetDevices" name = "targetDevices"  size=16 style="width:200px">
                                		<c:forEach items="${equipList}" var="equip">
	                                  		<option value="${equip.equipName }">${equip.equipName }</option>
	                                  	</c:forEach>
                                	</select>-->
                                </td>
                                <td>
                                	<a id="btnd1" href="javascript:void(0);" class="easyui-linkbutton" > >> </a>
                                </td>
                                <td rowspan="2">
                                	<select id="DLatencyChooseTargetDevices" multiple="multiple" name = "chooseTargetDevices" size=16 style="width:200px">
                                		<c:set var ="string1" value = "${fn:split(task.task_target,';')}"></c:set>
                                      <c:forEach items="${string1}" var="equipname">
	                                  <option value="${equipname }">${equipname }</option>
	                                  </c:forEach>
                                	</select>
                                </td>
                            </tr>
                            <tr>
                            	<td><a id="btnd2" href="javascript:void(0);" class="easyui-linkbutton"> << </a></td>
                            </tr>
                        </table>
                    </form>
                </div>
    <br>
    
    <!--<script type="text/javascript" src="js/selfJS/task/listTask/taskPolicy.js"></script>		 用于任务策略相关的操作 -->
    <!--<script type="text/javascript" src="js/selfJS/task/listTask/moveOption.js"></script>		 任务目标设备移动 -->
    <!--<script type="text/javascript" src="js/selfJS/task/listTask/listTasks.js"></script>		 任务目标设备移动 -->
    
	<script type="text/javascript" src="jquery/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/DLatencyTaskAddUI.js"></script>
	
    <!-- 用于文档加载完成后，初始化策略 -->
    <script>
    	$(function(){
        	var rec={};
        	rec["id"] = 1;
        	initTaskStrategy(rec);
        })
    </script>
  </body>
</html>
