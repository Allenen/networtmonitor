<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"+request.getServerName() + ":" + request.getServerPort()+path + "/";
String left = "<<", right = ">>";
String flag = "4";
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
    <div id ="TETestDiv" style="padding:10px;">
    <!-- 编辑TE隧道测量任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(<%=flag%>,'#TETestChooseTargetDevices','${task.task_stat}', '${task.task_num }');">保存</a>
    </div>
    <form id="TETestForm" name ="TETestForm" method="post">
        <h3 class="fl">TE隧道测量任务</h3>
        <input type="hidden" id="policy" name="policy" value="${policy }"/>
        <input type="hidden" id="task_num" name="task_num" value="${task.task_num }"/>
        <input type="hidden" name="task_type" value="<%=flag%>"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称：<input id ="TETestTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体：<input id="taskSubject" style="width:350px;" value="${task.task_subject }"  name="task_subject" /></td>
            </tr>
            <tr>
                <td colspan="8">
                	上报IP：&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" value="${task.send_ip } " >
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<input type="checkbox" name="is_cycle" value="${task.is_cycle}" onclick="this.value=(this.value==0)?1:0" <c:if test="${task.is_cycle == 1}">checked="checked"</c:if>> 
                	周期性测量   间隔：<input class="easyui-textbox" type="text" name="task_interval"  value="${task.task_interval }" style="width:50px;"/>
                    <input name="interval_unit" id="detectcc2" value="${task.interval_unit }" style="width:50px;"/>

                </td>
            </tr>
        </table>
        <table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
            <tr><td colspan="4">策略参数：</td></tr>
            <tr>
                <td colspan="8">
                	丢包阈值：<input id="m_loss_limit" class="easyui-textbox" name="m_loss_limit" value="0" readonly="readonly" style="width:100px;"/>‰
                  	时延阈值：<input id="m_delay_limit" class="easyui-textbox" type="text" name="m_delay_limit" value="10" readonly="readonly" style="width:100px;"/>(毫秒)
                                                                      协议：&nbsp;&nbsp;
                    <select name="m_protocol" id="cc" data-options="panelHeight:'auto'" class="easyui-combobox" style="width:100px;">
                        <option value="TCP">UDP</option>
                        <option value="UDP">TCP</option>
                    </select>
                </td>

            </tr>
            <tr>
                <td colspan="8">
                	方向:&nbsp;&nbsp;
                	<select name="m_direction" id="m_direction" data-options="panelHeight:'auto'" class="easyui-combobox" style="width:100px;">
                        <option value="client-to-server">client-to-server</option>
                        <option value="server-to-client">server-to-client</option>
                    </select>
                   	 区分服务编码:
                   	 <select name="m_dscp" id="m_dscp" data-options="panelHeight:'auto'" class="easyui-combobox" style="width:100px;">
	                    <c:forEach begin="0" end="255" varStatus="status">
	                    	<option value="${status.index }">${status.index }</option>
	                    </c:forEach>
                    </select>
                    
                </td>
            </tr>
            <tr>
                <td colspan="8">
                	源端口:&nbsp;<input id="m_sender_port" name="m_sender_port" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:100px;"/>(秒)
					目标端口:<input id="m_receiver_port" name="m_receiver_port" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:100px;"/>
					发包时间:<input id="m_duration" name="m_duration" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:70px;"/>(秒)
                </td>
            </tr>
            <tr>
                <td colspan="8">
					发包间隔:<input id="m_time_type" name="m_time_type" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:100px;"/>(秒)
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
					<a href="#" onclick= "savePolicy(<%=flag%>)" class="easyui-linkbutton">另存策略</a>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 
                	时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
                	至：<input id="end_time" name="e_end_time" class="easyui-timespinner" style="width:150px" value="23:59:59" data-options="showSeconds:true">
                </td>
            </tr>
            <tr>
                <td>选择策略:<input id="strategy<%=flag%>" name="policy_name" style="width:350px;" value="请选择任务策略">
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
                    <select  multiple="multiple" id="TETestTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
                    	<c:forEach items="${equipList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
                </td>
                <td>
                    <a id="btnd1" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> <%=right%> </a>
                </td>
                <td rowspan="2">
                    <select multiple="multiple" id ="TETestChooseTargetDevices" name = "chooseTargetDevicesList4" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px">
                    	<c:forEach items="${taskList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
                </td>
            </tr>
            <tr>
                <td><a id="btnd2" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"> <%=left%> </a></td>
            </tr>
        </table>

    </form>
</div>
	<script src="js/selfJS/task/listTask/moveOption.js"></script>		<!-- 任务目标设备移动 -->
  </body>
</html>
