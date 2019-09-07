<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta charset="UTF-8">
	<title>多媒体业务性测量数据</title>

	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css">
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/demo.css">

	<script src="jquery/jquery-1.11.3.min.js"></script>
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
        		<input id="task_target" name="task_subject" style="width:10%;height:25px;"/>
				
        		<label for="showType">呈现方式:</label>
        		<input type="radio" name="showType" value="01" checked="checked"><span>列表</span>
  				<input type="radio" name="showType" value="02"><span>图表式</span><br/><br/>
        		
      		</div>
    	</div>
    	
    	<!-- 多媒体业务性能测量数据查询->左侧任务列表 -->
		<div data-options="region:'west',title:'任务列表',split:true" style="width:270px;" id="westLayout">
	        <ul id="MultiMediaMeasureDataQueryTree" class="easyui-tree" style="margin-top:10px;"></ul>
   		</div>
   		
		<div data-options="region:'center',iconCls:'icon-ok'" id="centerLayout">
      		<div class="easyui-layout" style="width:100%;height:600px;">
      			<!-- 列表视图 -->
        		<div data-options="region:'center',iconCls:'icon-ok'" id="centerTableLayout">
					<label for="start_testTime">起始时间:</label> 
					<input id="start_testTime" name="start_testTime" class="easyui-datetimebox" value="<%= new Date() %>" style="width:200px" data-options="onSelect:onSelectDateTime">
       			
					<label for="end_testTime">结束时间:</label>
					<input id="end_testTime" name="end_testTime" class="easyui-datetimebox" value="<%= new Date() %>"  style="width:200px" data-options="onSelect:onSelectDateTime">
				
					<button onclick="showSatisfiedMultiMediaMeasureData();">选择</button>
					<table id="MultiMediaMeasureDataQueryTable"></table>
        		</div>
        		
        		<!-- 图标式 -->
				<div data-options="region:'center',iconCls:'icon-ok'" id="centerGraphLayout" style="display:none;">
						<!-- 内容-->						
                		<div id="MultiMediaMeasureDateShow" style="width:1600px;height:400px;">
						
							<!-- 日期以及导航-->
							<div name="dateAndNavigation">
								<label>日期:</label><input class="easyui-datebox" id="TestTime" value="<%= new Date()%>" data-options="onSelect:onSelectDate"></input>
								<a href="javascript:void(0);" class="easyui-linkbutton" id="FirstMultiMediaMeasureData" onclick="FirstMultiMediaMeasureData()">首条</a>
								<a href="javascript:void(0);" class="easyui-linkbutton" id="PreviousMultiMediaMeasureData" onclick="PreviousMultiMediaMeasureData()">前一条</a>
								<span id="pageNum">第   1    页</span>
								<a href="javascript:void(0);" class="easyui-linkbutton" id="NextMultiMediaMeasureData" onclick="NextMultiMediaMeasureData()">后一条</a>
								<a href="javascript:void(0);" class="easyui-linkbutton" id="LastMultiMediaMeasureData" onclick="LastMultiMediaMeasureData()">末条</a>
                			</div>
							
							<!-- 测量数据-->
							<div name="measureData">
                				<label>源探测设备:<span id="MultiMediaMeasureTestFrom"></span></label>
                				<label>时间:<span id="MultiMediaMeasureTestTime"></span></label>
                				<label>目标探测设备:<span id="MultiMediaMeasureTestTarget"></span></label><br/>
								
								<!-- 具体的测量数据-->
                				<div id="measureDataInfo">
									
								</div>
                			</div>
                		</div>
          				   
        		</div>
        		
      		</div>

		</div>
	</div>

	<script type="text/javascript" src="js/util/dateValidator.js"></script>		<!-- 时间校验文件 -->
	<script type="text/javascript" src="js/taskMeasureData/MultiMediaMeasureData/MultiMediaMeasureData_graph.js"></script>	<!--多媒体业务性能测量数据图标式文件 -->
	<script type="text/javascript" src="js/taskMeasureData/MultiMediaMeasureData/MultiMediaMeasureData_list.js"></script>	<!--多媒体业务性能测量数据列表式文件 -->
	<script type="text/javascript" src="js/taskMeasureData/MultiMediaMeasureData/MultiMediaMeasureData.js"></script>		<!-- 多媒体业务性能测量数据 -->
</body>
