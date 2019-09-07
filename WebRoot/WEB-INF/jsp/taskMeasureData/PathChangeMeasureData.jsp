<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta charset="UTF-8">
	<title>链路变化测量数据</title>

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
        		
        		<label for="showType">呈现方式:</label>
        		<input type="radio" name="showType" value="01" checked="checked"><span>列表</span>
  				<input type="radio" name="showType" value="02"><span>曲线图</span><br/><br/>
  		
      		</div>
    	</div>
    	
    	<!-- 链路变化测量数据查询->左侧任务列表 -->
		<div data-options="region:'west',title:'任务列表',split:true" style="width:270px;" id="westLayout">
	        <ul id="PathChangeMeasureDataQueryTree" class="easyui-tree" style="margin-top:10px;"></ul>
   		</div>
   		
		<div data-options="region:'center',iconCls:'icon-ok',border:false" id="centerLayout">
      		<div class="easyui-layout" style="width:100%;height:600px;">
      			<!-- 列表视图 -->
        		<div data-options="region:'center',iconCls:'icon-ok'" id="centerTableLayout">
					<label>目标设备:</label>
					<label><input type="checkbox" id="checkAll" onclick="checkAll()"/>全部</label>
					<div id="targetEquipDiv">
						<c:forEach items="${equipNameList}" var="equipName">
							<label><input class ="equipNameCheckbox" onclick="getAllSelect()" type="checkbox" value ="${equipName }"/>${equipName }</label>
						</c:forEach>
					</div>
        		
					<label for="start_testTime">起始时间:</label> 
					<input id="start_testTime" name="start_testTime" class="easyui-datetimebox" style="width:200px" data-options="onSelect:onSelectDateTime" value="<%= new Date() %>">
       			
					<label for="end_testTime">结束时间:</label>
					<input id="end_testTime" name="end_testTime" class="easyui-datetimebox" style="width:200px" data-options="onSelect:onSelectDateTime" value="<%= new Date() %>">
					
					<button onclick="showSatisfiedPathChangeMeasureData();">选择</button>
					
					<div style="margin-left:10px;margin-right:20px;">
						<table id="PathChangeMeasureDataQueryTable"></table>
					</div>
        		</div>
        		
        		<!-- 曲线图 -->
				<div data-options="region:'center',iconCls:'icon-ok'" id="centerGraphLayout" style="display:none;">
					<!-- 入利用率 -->
				    <div style="float: left;width: 396px;border: 1px #CDF4FF solid;">
				        <!-- 链路变化测量数据入利用率视图 -->
				        <div id="dynamicViewForIntraffic" style="height:330px;"></div>
				        <!-- 链路变化测量数据入利用率视图下方信息 -->
				        <div style="text-align: center;">
				            <span style="font-size: 20px;">入利用率:平均<label id="avgPktLoss">30</label>%</span><br/>
				            <span style="font-size: 20px;">最大:<label id="maxPktLoss">40</label>%</span><br/>
				            <span style="font-size: 20px;">最小:<label id="minPktLoss">40</label>%</span>
				        </div>
				    </div>
				    <!-- 出利用率 -->
				    <div style="float: left;width: 396px;border: 1px #CDF4FF solid;">
				        <!-- 链路变化测量数据出利用率视图 -->
				        <div id="dynamicViewForOuttraffic" style="height:330px;"></div>
				        <!-- 链路变化测量数据出利用率视图下方信息 -->
				        <div style="text-align: center;">
				            <span style="font-size: 20px;">出利用率:平均<label id="avgDelay">30</label>%</span><br/>
				            <span style="font-size: 20px;">最大:<label id="maxAvgDelay">40</label>%</span><br/>
				            <span style="font-size: 20px;">最小:<label id="minAvgDelay">40</label>%</span>
				        </div>
				    </div>
           				
				    <!-- 入丢包率 -->
				    <div style="float: left;width: 396px;border: 1px #CDF4FF solid;">
				        <!-- 链路变化测量数据入丢包率视图 -->
				        <div id="dynamicViewForInlossRate" style="height:330px;"></div>
				        <!-- 链路变化测量数据入丢包率视图下方信息 -->
				        <div style="text-align: center;">
				            <span style="font-size: 20px;">入丢包率:平均<label id="avgDelayJitter">30</label>%</span><br/>
				            <span style="font-size: 20px;">最大:<label id="maxDelayJitter">40</label>%</span><br/>
				            <span style="font-size: 20px;">最小:<label id="minDelayJitter">40</label>%</span>
				        </div>
				    </div>
           				
				    <!-- 出丢包率 -->
				    <div style="float: left;width: 396px;border: 1px #CDF4FF solid;">
				        <!-- 链路变化测量数据出丢包率视图 -->
				        <div id="dynamicViewForOutlossRate" style="height:330px;"></div>
				        <!-- 链路变化测量数据出丢包率视图下方信息 -->
				        <div style="text-align: center;">
				            <span style="font-size: 20px;">出丢包率:平均<label id="avgDelay">30</label>%</span><br/>
				            <span style="font-size: 20px;">最大:<label id="maxAvgDelay">40</label>%</span><br/>
				            <span style="font-size: 20px;">最小:<label id="minAvgDelay">40</label>%</span>
				        </div>
				    </div>
			        <div style="margin-left: 30%;">
			        	<div style="float: left;margin-top: 60px;">
			        		<select id="cc" class="easyui-combobox" name="dept" style="width:200px;">   
							    <option>北京节点1</option>   
							    <option>北京节点2</option>   
							    <option>北京节点3</option>   
							</select>
			        	</div>
			        	<div style="float: left;margin-top: 30px;">
			        		<label>可选接口</label>
				        	<table>
				        		<tr>
				        			<td><input type="checkbox"/></td>
				        			<td>接口:</td>
				        			<td>1</td>
				        			<td>状态:</td>
				        			<td>up</td>
				        			<td>带宽:</td>
				        			<td>10000Mbps</td>
				        		</tr>
				        		<tr>
				        			<td><input type="checkbox"/></td>
				        			<td>接口:</td>
				        			<td>2</td>
				        			<td>状态:</td>
				        			<td>up</td>
				        			<td>带宽:</td>
				        			<td>10000Mbps</td>
				        		</tr>
				        		<tr>
				        			<td><input type="checkbox"/></td>
				        			<td>接口:</td>
				        			<td>3</td>
				        			<td>状态:</td>
				        			<td>up</td>
				        			<td>带宽:</td>
				        			<td>10000Mbps</td>
				        		</tr>
				        	</table>
			        	</div>
			        	<div style="float: left;margin-top: 60px;">
			        		<a id="btn" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-chart_line'" onclick="historyData()">历史数据</a> 
			        	</div>
			             
			        </div>
        		</div>
        		
      		</div>

		</div>
	</div>

	<script type="text/javascript" src="js/util/dateValidator.js"></script>		<!-- 时间校验文件 -->
	<script type="text/javascript" src="js/taskMeasureData/PathChangeMeasureData/PathChangeMeasureData_graph.js"></script>		<!-- 链路变化测量数据图标相关文件 -->
	<script type="text/javascript" src="js/taskMeasureData/PathChangeMeasureData/PathChangeMeasureData_list.js"></script>		<!-- 链路变化测量数据列表相关文件 -->
	<script type="text/javascript" src="js/taskMeasureData/PathChangeMeasureData/PathChangeMeasureData.js"></script>		<!-- 链路变化测量数据 -->
</body>
