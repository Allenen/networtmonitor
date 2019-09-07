<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta charset="UTF-8">
	<title>TE隧道测量数据</title>

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
       			
       			<label for="task_subject">目标探测设备:</label> 
       			<input id="task_target" class="easyui-textbox" value="${task.task_target}"  style="width:10%;height:25px;" readonly="readonly"><br/>
        		
        		<label for="showType">呈现方式:</label>
        		<input type="radio" name="showType" value="01" checked="checked"><span>列表</span>
  				<input type="radio" name="showType" value="02"><span>图表式</span><br/><br/>
        		
       			
      		</div>
    	</div>
    	
    	<!-- TE隧道测量数据查询->左侧任务列表 -->
		<div data-options="region:'west',title:'任务列表',split:true" style="width:270px;" id="westLayout">
	        <ul id="TETubeMeasureDataQueryTree" class="easyui-tree" style="margin-top:10px;"></ul>
   		</div>
   		
		<div data-options="region:'center',iconCls:'icon-ok'" id="centerLayout">
      		<div class="easyui-layout" style="width:100%;height:600px;">
      			<!-- 列表视图 -->
        		<div data-options="region:'center',iconCls:'icon-ok'" id="centerTableLayout">
					<label for="start_testTime">起始时间:</label> 
					<input id="start_testTime" name="start_testTime" class="easyui-datetimebox" value="<%= new Date() %>" style="width:200px" data-options="onSelect:onSelectDateTime">
       			
					<label for="end_testTime">结束时间:</label>
					<input id="end_testTime" name="end_testTime" class="easyui-datetimebox" value="<%= new Date() %>"  style="width:200px" data-options="onSelect:onSelectDateTime">
				
					<button onclick="showSatisfiedVPNTEMeasureData();">选择</button>
					<table id="TETubeMeasureDataQueryTable"></table>
        		</div>
        		
        		<!-- 图标式 -->
				<div data-options="region:'center',iconCls:'icon-ok'" id="centerGraphLayout" style="display:none;">     											
                		<div id="TEMeasureDateShow" style="width:1600px;height:400px;">
                			<label>日期：</label>&nbsp;&nbsp;&nbsp;<input class="easyui-datebox" id="TestTime" data-options="onSelect:onSelectDate" value="<%= new Date()%>"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                			<a href="javascript:void(0);" class="easyui-linkbutton" id="FirstTEMeasureData" onclick="FirstTEMeasureData()">首条</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                			<a href="javascript:void(0);" class="easyui-linkbutton" id="PreviousTEMeasureData" onclick="PreviousTEMeasureData()">前一条</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                			<span>第   <label id="pageNum">1</label>    页</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                			<a href="javascript:void(0);" class="easyui-linkbutton" id="NextTEMeasureData" onclick="NextTEMeasureData()">后一条</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                			<a href="javascript:void(0);" class="easyui-linkbutton" id="LastTEMeasureData" onclick="LastTEMeasureData()">末条</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                			<div>
                				<label>源探测设备：<span id="TEMeasureTestFrom"></span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                				<label>时间：<span id="TEMeasureTestTime"></span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                				<label>目标探测设备：<span id="TEMeasureTestTarget"></span></label><br/><br/>
                				<label>流标识：<span id="TEMeasureFlowId"></span></label><br/><br/>
                				<label>最大单向时延：<span id="TEMeasureMaxDelay"></span></label><br/><br/>
                				<label>平均单向时延：<span id="TEMeasureAvgDelay"></span></label><br/><br/>
                				<label>单向时延抖动：<span id="TEMeasureJitter"></span></label><br/><br/>
                				<label>丢包率：<span id="TEMeasureLossRate"></span></label><br/><br/>
                				<label>质量：<span id="TEMeasureLevel"></span></label><br/><br/>
                			</div>
                		</div>		
          			
        		</div>
      		</div>

		</div>
	</div>
	
	<script type="text/javascript" src="js/util/dateValidator.js"></script>		<!-- 时间校验文件 -->
	<script type="text/javascript" src="js/taskMeasureData/TETubeMeasureData/TETubeMeasureData_list.js"></script>		<!-- TE隧道测量数据表格形式展示 -->
	<script type="text/javascript" src="js/taskMeasureData/TETubeMeasureData/TETubeMeasureData_graph.js"></script>		<!-- TE隧道测量数据图标式展示 -->
	<script type="text/javascript" src="js/taskMeasureData/TETubeMeasureData/TETubeMeasureData.js"></script>		<!-- TE隧道测量数据 -->
</body>
