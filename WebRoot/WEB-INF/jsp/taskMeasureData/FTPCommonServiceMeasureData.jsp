<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta charset="UTF-8">
	<title>通用业务性能测量数据-FTP业务</title>

	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css">
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/demo.css">

	<script type="text/javascript" src="jquery/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="echarts/echarts.js"></script>

</head>
<body>
	<div class="easyui-layout" style="width:100%;height:800px;">
		<div data-options="region:'north',border:false" style="height:200px" id="northLayout">
    		<div style="margin:20px 0;text-align:center;">
        		<label for="taskName">任务名称:</label>
        		<input id="taskName" class="easyui-textbox" value="${task.task_name }" style="width:20%;height:25px" readonly="readonly">
  				
  				<label for="task_num">任务号:</label>
  				<input id="task_num" class="easyui-textbox" value="${task.task_num }" style="width:10%;height:25px;" readonly="readonly">
       			
       			<label for="task_subject">源探测设备:</label> 
       			<input id="task_subject" class="easyui-textbox" value="${task.task_subject}"  style="width:10%;height:25px;" readonly="readonly"><br/>
       			
       			<label for="task_subject">目标设备:</label> 
       			<input id="task_target" class="easyui-textbox" value="${task.task_target}"  style="width:10%;height:25px;" readonly="readonly"><br/>
        		
        		<label for="showType">呈现方式:</label>
        		<input type="radio" name="showType" value="01" checked="checked"><span>列表</span>
  				<input type="radio" name="showType" value="02"><span>图表式</span><br/><br/>
      		</div>
    	</div>
    	
    	<!-- 通用业务测量数据-ftp查询->左侧任务列表 -->
		<div data-options="region:'west',title:'任务列表',split:true" style="width:270px;" id="westLayout">
	        <ul id="FTPCommonServiceMeasureDataQueryTree" class="easyui-tree" style="margin-top:10px;"></ul>
   		</div>
   		
		<div data-options="region:'center',iconCls:'icon-ok'" id="centerLayout">
      		<div class="easyui-layout" style="width:100%;height:600px;">
      			<!-- 列表视图 -->
        		<div data-options="region:'center',iconCls:'icon-ok'" id="centerTableLayout">
					<label for="start_testTime">起始时间:</label> 
					<input id="start_testTime" name="start_testTime" class="easyui-datetimebox" value="<%= new Date() %>" style="width:200px" data-options="onSelect:onSelectDateTime">
       			
					<label for="end_testTime">结束时间:</label>
					<input id="end_testTime" name="end_testTime" class="easyui-datetimebox" value="<%= new Date() %>"  style="width:200px" data-options="onSelect:onSelectDateTime">
				
					<button onclick="showSatisfiedFTPCommonServiceMeasureData();">选择</button>
					<table id="FTPCommonServiceMeasureDataQueryTable"></table>
        		</div>
        		
        		<!-- 图标式 -->
				<div data-options="region:'center',iconCls:'icon-ok'" id="centerGraphLayout" style="display:none;">     											
                	<!-- 服务响应时间 -->
				   <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">
						
						<!-- 通用业务测量数据-ftp业务服务响应时间 -->
						<div id="dynamicViewForResponseDelay" style="height:500px;"></div>
						<!-- 通用业务测量数据-ftp业务服务响应时间下方信息 -->
						<div style="text-align: center;">
							<span style="margin-right:40px;font-size:20px;">下载文件:<label id="browseFile_responseDelay">40</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">文件大小:<label id="pageSize_responseDelay">20</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">服务响应时间:平均<label id="avgResponseDelay">20</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">最大<label id="maxResponseDelay">40</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">最小<label id="minResponseDelay">40</label>ms</span><br/>
						</div>
					</div>
					<!-- 文件下载时间 -->
					<div style="float: left;width: 49%;border: 2px #CDF4FF solid;">
						<!-- 通用业务测量数据-ftp业务文件下载时间 -->
						<div id="dynamicViewForFileDelay" style="height:500px;"></div>
						<!-- 通用业务测量数据-ftp业务文件下载时间下方信息 -->
						<div style="text-align: center;">
							<span style="margin-right:40px;font-size:20px;">下载文件:<label id="downloadFile_fileDelay">40</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">文件大小:<label id="fileSize_fileDelay">20</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">文件下载时间:平均<label id="avgFileDelay">20</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">最大<label id="maxFileDelay">40</label>ms</span>
							<span style="margin-right:40px;font-size:20px;">最小<label id="minFileDelay">40</label>ms</span><br/>
						</div>
					</div>		
        		</div>
      		</div>

		</div>
	</div>
	
	<script type="text/javascript" src="js/util/dateValidator.js"></script>		<!-- 时间校验文件 -->
	<script type="text/javascript" src="js/taskMeasureData/CommonServiceMeasureData/FTPServiceMeasureData/FTPServiceMeasureData_list.js"></script>		<!-- 通用业务性能测量数据FTP表格形式展示 -->
	<script type="text/javascript" src="js/taskMeasureData/CommonServiceMeasureData/FTPServiceMeasureData/FTPServiceMeasureData_graph.js"></script>		<!-- 通用业务性能测量数据FTP图形形式展示 -->
	<script type="text/javascript" src="js/taskMeasureData/CommonServiceMeasureData/FTPServiceMeasureData/FTPServiceMeasureData.js"></script>		<!-- 通用业务性能测量数据 -->
</body>
