<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String right = ">>", left = "<<";
String flag = "3";
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
	
	<link rel="stylesheet" href="jqueryEasyUI/icon.css" rel="stylesheet">
    <link rel="stylesheet" href="jqueryEasyUI/easyui.css" rel="stylesheet">
	
	<script src="jqueryEasyUI/jquery.easyui.min.js"></script>

  </head>
  
  <body>
    <div id ="BlockDiv" style="padding:10px;">
    <!-- 编辑阻断监测任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(<%=flag %>,'#BlockChooseTargetDevices','${task.task_stat}', '${task.task_num }');">保存</a>
    </div>
    <form id="BlockForm" name ="BlockForm" method="post">
        <h3 class="fl">阻断监测任务</h3>
        <input type="hidden" id="policy" name="policy" value="${policy }"/>
        <input type="hidden" id="task_num" name="task_num" value="${task.task_num }"/>
        <input type="hidden" name="task_type" value="<%=flag%>"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称：<input id ="BlockTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体：<input id="taskSubject" style="width:350px;" value="${task.task_subject }" name="task_subject" /></td>
            </tr>
            <tr>
                <td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" value="${task.send_ip } " name = "send_ip" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<input type="checkbox" name="is_cycle" value="${task.is_cycle}" onclick="this.value=(this.value==0)?1:0" <c:if test="${task.is_cycle == 1}">checked="checked"</c:if>> 
                	周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="${task.task_interval }" style="width:50px;"/>
                    <input name="interval_unit" id="detectcc2" value="${task.interval_unit }" style="width:50px;"/>

                </td>
            </tr>
        </table>
        <table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
            <tr><td colspan="4">策略参数：</td></tr>
            <tr>
                <td colspan="8">包数：&nbsp;&nbsp;<input id="m_SendCount" class="easyui-textbox" name="m_SendCount" value="3" readonly="readonly" style="width:70px;"/>
			                    包长度：&nbsp;<input id="m_PacketSize" class="easyui-textbox" type="text" name="m_PacketSize" value="64" readonly="readonly" style="width:70px;"/>
			                    接收超时：<input id="m_ReceiveTimeOut" class="easyui-textbox" type="text" name="m_ReceiveTimeOut" value="1000" readonly="readonly" style="width:70px;"/>(毫秒)
                </td>

            </tr>
            <tr>
                <td colspan="8">
                	上报间隔：<input id="m_ReportInterval" class="easyui-textbox" name="m_ReportInterval" type="text" value="30" readonly="readonly" style="width:70px;"/>(秒)
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      				<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                	<span style="width:50px;"></span>
                	<input type="checkbox" id="timeFlag" value="0" onclick="this.value=(this.value==0)?1:0"> 
                	时段控制  自：<input id="start_time" name="s_start_time" value="00:00:00" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
                  	  至：<input id="end_time" name="e_end_time" value="23:59:59" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "savePolicy(<%=flag%>)" class="easyui-linkbutton">另存策略</a>
                </td>
            </tr>
            <tr>
                <td>
                	选择策略：<input id="strategy<%=flag%>" name="policy_name" style="width:350px;" value="请选择任务策略">
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
                    <select  multiple="multiple" id="BlockTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
                    	<c:forEach items="${equipList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
                </td>
                <td>
                    <a id="btnd1" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> <%=right %> </a>
                </td>
                <td rowspan="2">
                    <select multiple="multiple" id ="BlockChooseTargetDevices" name = "chooseTargetDevicesList3" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px">
                    	<c:forEach items="${taskList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
                </td>
            </tr>
            <tr>
                <td><a id="btnd2" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"> <%=left %> </a></td>
            </tr>
        </table>
    </form>
</div>
     <script src="js/selfJS/task/listTask/moveOption.js"></script>		<!-- 任务目标设备移动 -->

  </body>
</html>
