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
	
	<script src="bin/jquery.min.js"></script>
	<script src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script  src="js/jquery.json-2.2.min.js"></script>
	
  </head>
  
  <body>
    <div id ="BlockDiv" style="padding:10px;margin:10px 0;">
    <!-- 编辑阻断监测任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(3,'#BlockChooseTargetDevices',0);">保存修改</a>
    </div>
    <form id="BlockForm" name ="BlockForm" method="post">
        <h3 class="fl">阻断监测任务</h3>
        <input type="hidden" name="task_type" value="3"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称:<input id ="BlockTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体:<input id="BlockTask_subject" style="width:350px;" name="task_subject" value="${task.task_subject }" class="easyui-combobox" data-options="valueField: 'text',textField: 'text',url: 'get_AjaxTanzhenEquip.html'"/></td>
            </tr>
            <tr>
                <td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" value="${task.send_ip }">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="${task.task_interval }" style="width:50px;"/>
                    <select name="interval_unit" id="detectcc2" value="${interval_unit }" class="easyui-combobox" style="width:50px;">
                        <option value="s">秒</option>
                        <option value="m">分</option>
                        <option value="h">时</option>
                    </select>
                </td>
            </tr>
        </table>
        <table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
            <tr><td colspan="4">策略参数：</td></tr>
            <tr>
                <td colspan="8">包数:&nbsp;&nbsp;<input id="m_SendCount" class="easyui-textbox" name="m_SendCount" value="3" readonly="readonly" style="width:70px;"/>
                    包长度:&nbsp;<input id="m_PacketSize" class="easyui-textbox" type="text" name="m_PacketSize" value="64" readonly="readonly" style="width:70px;"/>
                    接收超时:<input id="m_ReceiveTimeOut" class="easyui-textbox" type="text" name="m_ReceiveTimeOut" value="1000" readonly="readonly" style="width:70px;"/>(毫秒)
                </td>

            </tr>
            <tr>
                <td colspan="8">
                    上报间隔:<input id="m_ReportInterval" class="easyui-textbox" name="m_ReportInterval" type="text" value="30" readonly="readonly" style="width:70px;"/>(秒)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
                </td>
            </tr>
            <tr>
                <td colspan="7"><span style="width:50px;"></span><input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制  自：<input id="start_time" name="s_start_time" value="00:00:00" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
                    至：<input id="end_time" name="e_end_time" value="23:59:59" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "savePolicy(3)" class="easyui-linkbutton">另存策略</a>
                </td>
            </tr>
            <tr>
                <td>选择策略:<input id="strategy3" name="policy_name" style="width:350px;" value="请选择任务策略">
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
                    <select  multiple="multiple" id="BlockTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px"/>
                </td>
                <td>
                    <a id="btnd1" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> >> </a>
                </td>
                <td rowspan="2">
                    <select multiple="multiple" id ="BlockChooseTargetDevices" name = "chooseTargetDevicesList3" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px">
                    	<c:set var ="string1" value = "${fn:split(task.task_target,';')}"></c:set>
                                      <c:forEach items="${string1}" var="equipname">
	                                  <option value="${equipname }">${equipname }</option>
	                                  </c:forEach>
                    </select>
                </td>
            </tr>
            <tr>
                <td><a id="btnd2" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"> << </a></td>
            </tr>
        </table>
    </form>
</div>
    <br>
    
    
    <script type="text/javascript" src="js/selfJS/task/listTask/taskPolicy.js"></script>		<!-- 用于任务策略相关的操作 -->
    <script type="text/javascript" src="js/selfJS/task/listTask/moveOption.js"></script>		<!-- 任务目标设备移动 -->
    <script type="text/javascript" src="js/selfJS/task/listTask/listTasks.js"></script>		<!-- 任务目标设备移动 -->
    
    
    <!-- 用于文档加载完成后，初始化策略 -->
    <script>
    	$(function(){
        	var rec={};
        	rec["id"] = 3;
        	initTaskStrategy(rec);
        })
    </script>
  </body>
</html>
