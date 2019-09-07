<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta charset="UTF-8">
	<title>双向时延测量数据</title>

	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css">
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css">
	
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
       			
       			<label for="task_subject">执行探测设备:</label> 
       			<input id="task_subject" class="easyui-textbox" value="${task.task_subject}"  style="width:10%;height:25px;" readonly="readonly"><br/>
        		
        		<label for="showType">呈现方式:</label>
        		<input type="radio" name="showType" value="01" checked="checked"><span>列表</span>
  				<input type="radio" name="showType" value="02"><span>曲线图</span><br/><br/>
  				
      		</div>
    	</div>
    	
    	<!-- 双向时延测量数据查询->左侧任务列表 -->
		<div data-options="region:'west',title:'任务列表',split:true" style="width:270px;" id="westLayout">
	        <ul id="DLatencyMeasureDataQueryTree" class="easyui-tree" style="margin-top:10px;"></ul>
   		</div>
   		
		<div data-options="region:'center',iconCls:'icon-ok'" id="centerLayout">
      		<div class="easyui-layout" style="width:100%;height:600px;">
      			<!-- 列表视图 -->
        		<div data-options="region:'center',iconCls:'icon-ok'" id="centerTableLayout">
					<label>目标设备:</label>
					<label><input type="checkbox" id="checkAll" onclick="checkAll()"/>全部</label>
					<div id="targetEquipDiv">
						<c:forEach items="${targetEquipList}" var="targetEquip">
							<label><input class ="equipNameCheckbox" onclick="getAllSelect()" type="checkbox" value ="${targetEquip.equipId }"/>${targetEquip.equipName }</label>
						</c:forEach>
					</div>
					
					<label for="start_testTime">起始时间:</label> 
					<input id="start_testTime" name="start_testTime" class="easyui-datetimebox" data-options="onSelect:onSelectDateTime" value="<%= new Date() %>" style="width:200px" >
					
					<label for="end_testTime">结束时间:</label>
					<input id="end_testTime" name="end_testTime" class="easyui-datetimebox" data-options="onSelect:onSelectDateTime" value="<%= new Date() %>"  style="width:200px" >
					
					<button onclick="showSatisfiedDLatencyMeasureData();">选择</button>
					
					<div style="margin-left:10px;margin-right:20px;">
						<table id="DLatencyMeasureDataQueryTable"></table>
					</div>
					<div style="text-align: center;">
						<span style="margin-right:40px;font-size:20px;">丢包率:平均<label id="avgPktLoss_list">50</label>%</span>
						<span style="margin-right:40px;font-size:20px;">最大<label id="maxPktLoss_list">100</label>%</span>
						<span style="margin-right:40px;font-size:20px;">最小<label id="minPktLoss_list">0</label>%</span><br/>
						
						<span style="margin-right:40px;font-size:20px;">往返时延:平均<label id="avgDelay_list">50</label>ms</span>
						<span style="margin-right:40px;font-size:20px;">最大<label id="maxAvgDelay_list">100</label>ms</span>
						<span style="margin-right:40px;font-size:20px;">最小<label id="minAvgDelay_list">0</label>ms</span><br/>
						
						<span style="margin-right:40px;font-size:20px;">时延抖动:平均<label id="avgDelayJitter_list">50</label>ms</span>
						<span style="margin-right:40px;font-size:20px;">最大<label id="maxDelayJitter_list">100</label>ms</span>
						<span style="margin-right:40px;font-size:20px;">最小<label id="minDelayJitter_list">0</label>ms</span><br/>
					
					</div>
        		</div>
        		
        		<!-- 曲线图 -->
				<div data-options="region:'center',iconCls:'icon-ok'" id="centerGraphLayout" style="display:none;">
          				<!-- 时延数据 -->
					   <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">
					     	
					        <!-- 双向时延测量数据时延数据视图 -->
					        <div id="dynamicViewForAvgDelay" style="height:500px;"></div>
					        <!-- 双向时延测量数据时延数据下方信息 -->
					        <div style="text-align: center;">
            					<span style="margin-right:40px;font-size:20px;">往返时延:平均<label id="avgDelay">40</label>ms</span>
					        	<span style="margin-right:40px;font-size:20px;">最大<label id="maxAvgDelay">40</label>ms</span>
					        	<span style="margin-right:40px;font-size:20px;">最小<label id="minAvgDelay">40</label>ms</span><br/>
					        	
            					<span style="margin-right:40px;font-size:20px;">时延抖动:平均<label id="avgDelayJitter">20</label>ms</span>
					        	<span style="margin-right:40px;font-size:20px;">最大<label id="maxDelayJitter">40</label>ms</span>
					        	<span style="margin-right:40px;font-size:20px;">最小<label id="minDelayJitter">40</label>ms</span><br/>
					        	
					        	<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-chart_line'">历史数据</a>  
					        </div>
					    </div>
					    <!-- 丢包数据 -->
					    <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">
					        <!-- 双向时延测量数据丢包数据视图 -->
					        <div id="dynamicViewForPktLoss" style="height:500px;"></div>
					        <!-- 双向时延测量数据丢包数据视图下方信息 -->
					        <div style="text-align: center;">
					            <span style="margin-right:40px;font-size:20px;">丢包率:平均<label id="avgPktLoss">30</label>%</span>
					        	<span style="margin-right:40px;font-size:20px;">最大<label id="maxPktLoss">40</label>%</span>
					        	<span style="margin-right:40px;font-size:20px;">最小<label id="minPktLoss">40</label>%</span><br/>
					        	
					        	<span style="margin-right:40px;font-size:20px;">时延抖动:平均<label id="avgDelayJitter">20</label>ms</span>
					        	<span style="margin-right:40px;font-size:20px;">最大<label id="maxDelayJitter">40</label>ms</span>
					        	<span style="margin-right:40px;font-size:20px;">最小<label id="minDelayJitter">40</label>ms</span><br/>
					        	
					        	<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-chart_line'">历史数据</a>  
					        </div>
					    </div>
        		</div>
        		
        	
			</div>

		</div>
	</div>

	<script type="text/javascript" src="js/util/dateValidator.js"></script> <!-- 与时间校验相关的文件-->
	<script type="text/javascript" src="js/taskMeasureData/DLatencyMeasureData/DLatencyMeasureData_graph.js"></script>		<!-- 与双向时延测量数据曲线图相关文件 -->
	<script type="text/javascript" src="js/taskMeasureData/DLatencyMeasureData/DLatencyMeasureData_list.js"></script>		<!-- 与双向时延测量数据列表相关文件 -->
	<script type="text/javascript" src="js/taskMeasureData/DLatencyMeasureData/DLatencyMeasureData.js"></script>		<!-- 双向时延测量数据 -->
</body>
