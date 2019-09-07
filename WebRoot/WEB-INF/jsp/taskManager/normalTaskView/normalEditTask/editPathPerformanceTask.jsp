<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String right = ">>", left = "<<";
String flag = "5";
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

<link rel="stylesheet" href="lib/css/reset.css" rel="stylesheet">
    <link rel="stylesheet" href="jqueryEasyUI/icon.css" rel="stylesheet">
    <link rel="stylesheet" href="jqueryEasyUI/easyui.css" rel="stylesheet">
    <link rel="stylesheet" href="bin/font-awesome.css">
    <link rel="stylesheet" href="css/selfCSS/navigator.css"/>
    <link rel="stylesheet" type="text/css" href="css/selfCSS/equip/listEquipsCSS.css"/> <!-- 用于设备列表的样式 -->
    
    <script src="bin/jquery.min.js"></script>
    <script src="lib/js/jquery.easyui.min.js"></script>
  </head>
  
  <body>
    <div id ="PathPerformanceDiv" style="padding:10px;">
    <!-- 链路性能测量任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
    	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(5,null,'${task.task_stat}', '${task.task_num }');">保存修改</a>
    </div>
    <form id="PathPerformanceForm" name ="PathPerformanceForm" method="post">
        <h3 class="fl">链路性能测量任务</h3>
        <input type="hidden" id="policy" name="policy" value="${policy }"/>
        <input type="hidden" id="task_num" name="task_num" value="${task.task_num }"/>
        <input type="hidden" id="task_type" name="task_type" value="<%=flag%>"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称：<input id ="PathPerformanceTaskName" class="easyui-textbox" style="width:350px;" name="task_name" value="${task.task_name }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体：<input id="taskSubject" style="width:350px;" name="task_subject" value="${task.task_subject }" class="easyui-combobox" data-options="valueField: 'text',textField: 'text',url: 'get_AjaxTanzhenEquip.html'"/></td>
            </tr>
            <tr>
                <td colspan="8">
                	上报IP：&nbsp;<input class="easyui-textbox" type="text" name="send_ip" value="${task.send_ip } ">
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0" <c:if test="${task.is_cycle == 1}">checked="checked"</c:if>/> 
                	上报间隔   间隔：<input class="easyui-textbox" type="text" name="task_interval" value="${task.task_interval }" style="width:50px;"/>(秒)
                </td>
            </tr>
            <tr>
                <td colspan="7">
                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 
                	时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" style="width:150px" value="00:00:00" data-options="showSeconds:true">
					至：<input id="end_time" name="e_end_time" class="easyui-timespinner" style="width:150px" value="23:59:59" data-options="showSeconds:true">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
            </tr>
        </table>
 		选择路由器及接口：
        <ul id="editPathPerformanceTree"></ul>
    </form>
</div>
    <script type="text/javascript" src="js/selfJS/task/listTask/routerAndInterface.js"></script>		<!-- 路由器及接口 -->
    <script src="js/selfJS/task/listTask/moveOption.js"></script>		<!-- 任务目标设备移动 -->
    
    <script>
    	$(function(){
        	console.log("文档加载完成！");
        	roundShowRouterAndInterface(2, $("#task_num").val());
        });
    </script>
  </body>
</html>
