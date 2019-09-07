<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String right = ">>", left = "<<";
String flag = "2";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>编辑单向时延、丢包率、时延抖动任务类型的界面</title>
    
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
 <div id ="SLatencyDiv" style="padding:10px;">
    <!-- 编辑单向时延任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
    	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(<%=flag%>,'#SLatencyChooseTargetDevices','${task.task_stat}', '${task.task_num }');">保存修改</a>
    </div>
    <form id="SLatencyForm" name ="SLatencyForm" method="post">
        <h3 class="fl">单向时延、丢包、时延抖动任务</h3>
        <input type="hidden" id="policy" name="policy" value="${policy }"/>
        <input type="hidden" id="task_num" name="task_num" value="${task.task_num }"/>
        <input type="hidden" id="task_type" name="task_type" value="<%=flag%>"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">
                	任务名称：<input id ="SLatencyTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/>
                </td>
            </tr>
            <tr>
                <td colspan="8">
                	任务主体：<input id="taskSubject" name="task_subject" value="${task.task_subject }" style="width:350px;"/>
                </td>
            </tr>
            <tr>
                <td colspan="8">
                	上报IP：&nbsp;<input class="easyui-textbox" type="text" value="${task.send_ip } " name = "send_ip" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<input type="checkbox" name="is_cycle" value="${task.is_cycle}" onclick="this.value=(this.value==0)?1:0" <c:if test="${task.is_cycle == 1}">checked="checked"</c:if>/> 
                	周期性测量    间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="${task.task_interval }" style="width:50px;"/>
                    <input name="interval_unit" id="detectcc2" value="${task.interval_unit }" style="width:50px;"/>

                </td>
            </tr>
        </table>
        <table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
            <tr><td colspan="4">策略参数：</td></tr>
            <tr>
                <td colspan="8">
					长包数：&nbsp;<input id="m_LPN" class="easyui-textbox" name="m_LPN" value="" readonly="readonly" style="width:70px;"/>
			                            长包长度：<input id="m_LPL" class="easyui-textbox" type="text" name="m_LPL" value="1000" readonly="readonly" style="width:70px;"/>
			                            短包数：&nbsp;<input id="m_SPN" class="easyui-textbox" type="text" name="m_SPN" value="10" readonly="readonly" style="width:70px;"/>
			                            短包长度：<input id="m_SPL" class="easyui-textbox" type="text" name="m_SPL" value="64" readonly="readonly" style="width:70px;"/>
                </td>

            </tr>
            <tr>
                <td colspan="8">
                	协议：&nbsp;&nbsp;
	                <select id="cc" class="easyui-combobox" name="m_Protocol" data-options="panelHeight:'auto'" style="width:70px;">
	                    <option value="UDP">UDP</option>
	                    <option value="TCP">TCP</option>
	                </select>
				               目标端口：<input id="m_DestPort" class="easyui-textbox" type="text" name="m_DestPort" value="9500" readonly="readonly" style="width:70px;"/>
				               发包间隔：<input id="m_SendInterval" class="easyui-textbox" type="text" name="m_SendInterval" value="1" readonly="readonly" style="width:70px;"/>(毫秒)
                </td>
            </tr>
            <tr>
                <td colspan="7">
                	时延阈值：<input id="m_DelayLimit" class="easyui-textbox" type="text" name="m_DelayLimit" value="100" readonly="readonly" style="width:70px;"/>(毫秒)
					丢包阈值：<input id="m_LossLimit" class="easyui-textbox" type="text" name="m_LossLimit" value="20" readonly="readonly" style="width:70px;"/>(%)
					 接收超时：<input id="m_ReceiveTimeOut" class="easyui-textbox" type="text" name="m_ReceiveTimeOut" value="1000" readonly="readonly" style="width:70px;"/>(毫秒)
                    &nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
                </td>
            </tr>
            <tr>
                <td colspan="7"><span style="width:50px;"></span>
                	<input type="checkbox" id="timeFlag" value="0" onclick="this.value=(this.value==0)?1:0"> 
					时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
					至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#" onclick= "savePolicy(<%=flag%>)" class="easyui-linkbutton">另存策略</a>
                </td>
            </tr>
            <tr>
                <td>选择策略：
                	<input id="strategy<%=flag%>" value="请选择策略" name="policy_name" style="width:300px"/>
              
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
                    <select  multiple="multiple" id="SLatencyTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
						<c:forEach items="${equipList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                   	</select>
                </td>
                <td>
                    <a id="btnd1" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> <%=right%> </a>
                </td>
                <td rowspan="2">
                    <select multiple="multiple" id ="SLatencyChooseTargetDevices" name = "chooseTargetDevicesList<%=flag%>" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px">
                		<c:forEach items="${taskList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
                </td>
            </tr>
            <tr>
                <td><a id="btnd2" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"><%=left%></a></td>
            </tr>
        </table>
     
    </form>
  </div>
	<script src="js/selfJS/task/listTask/moveOption.js"></script>		<!-- 任务目标设备移动 -->
  </body>
</html>
