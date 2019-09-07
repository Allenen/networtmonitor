<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String right = ">>", left = "<<";
String flag = "7";
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
    <div id ="multiMediaDiv" style="padding:10px;">
    <!-- 编辑多媒体业务性能测量任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(<%=flag %>,'MultiMediaChooseTargetDevices','${task.task_stat}', '${task.task_num }')">保存</a>
    </div>
    <form id="multiMediaForm" name ="multiMediaForm" method="post">
        <h3 class="fl">多媒体业务性能测量任务</h3>
        <input type="hidden" id="policy" name="policy" value="${policy }"/>
        <input type="hidden" id="task_num" name="task_num" value="${task.task_num }"/>
        <input type="hidden" id="task_type" name="task_type" value="<%=flag%>"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称:<input id ="multiMediaTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体:<input id="taskSubject" style="width:350px;" name="task_subject" value="${task.task_subject }"/></td>
            </tr>
            <tr>
                <td colspan="8">
                	上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" value="${task.send_ip }">
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0" <c:if test="${task.is_cycle == 1}">checked="checked"</c:if>/> 
                	周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="${task.task_interval }" style="width:50px;"/>
                    <input name="interval_unit" id="detectcc2" value="${task.interval_unit }" style="width:50px;"/>

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
                    <select  multiple="multiple" id="MultiMediaTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px">
                    	<c:forEach items="${equipList}" var="equip">
                      		<option value="${equip.equipId }">${equip.equipName }</option>
                      	</c:forEach>
                    </select>
                </td>
                <td>
                    <a id="btnd1" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> <%=right %> </a>
                </td>
                <td rowspan="2">
                    <select   multiple="multiple" id="MultiMediaChooseTargetDevices" name = "chooseTargetDevicesList7" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px">
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
        <form id="modelForm">
        <table  >
            <tr><td colspan="4">策略参数：</td></tr>
            <tr>
                <td colspan="8">
                	<input type="radio" name="m_mode_type" checked="checked" value="playback"/>回放模式
                	<input type="radio" name="m_mode_type" value="define"/>自定义流模式
                	<a href="#" onclick= "savePolicy(7)" class="easyui-linkbutton">保存策略</a>
                </td>
            </tr>
            </table>
            </form>
           
            <!-- 回放模式 -->
           <div id="playbackModel">
            <form id="playbackForm">
           	<table>
	           <tr>
		           <td colspan="8"> 业务类型:
			           <select name="m_service_type" id="m_service_type" class="easyui-combobox" data-options="panelHeight:'auto'" style="width:140px;">
				           <option value="videoconf">视频会议</option>
				           <option value="VoIP">VoIP</option>
			           </select>  业务名称:
			           <select name="m_servicename" id="m_servicename" class="easyui-combobox" data-options="panelHeight:'auto'" style="width:200px;">
				           <option value="videoconf-mil">四总部及直属单位视频会议系统</option>
				           <option value="videoconf-hwl">华为高清视频会议系统</option>
			           </select>
		           	   <a href="#" onclick= "savePolicy(2)" class="easyui-linkbutton">定制为新业务</a>
		           </td>
	           </tr>
	           <tr>
		           <td colspan="7">
			           <input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制
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
		           <td colspan="7">
			           <input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制
			                                      自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00"  style="width:150px" data-options="showSeconds:true">
			                                      至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59"  style="width:150px" data-options="showSeconds:true">
		           	   <a href="#" onclick="addFlowRecord()" class="easyui-linkbutton">增加流记录</a>
		           	   <input class="easyui-textbox" id="flowRecordId"/>
		           	   <a href="#" onclick="deleteFlowRecord($('#flowRecordId').val())" class="easyui-linkbutton">删除流记录</a>
		           	   <a href="#" onclick="fun()" class="easyui-linkbutton">定制为新业务</a>
		           </td>
	            </tr>
	        </table>
	        <!-- 流记录 -->
	        <div id="flowRecord">
	        	
	        </div>
	        </form>
           </div>
          
	</div>
	<script src="js/selfJS/task/listTask/moveOption.js"></script>		<!-- 任务目标设备移动 -->
	
</body>
</html>
