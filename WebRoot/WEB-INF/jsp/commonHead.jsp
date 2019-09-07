<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div data-options="region:'north'" style="height:100px">
       <h2>网络业务性能监测系统</h2>
       <div class="nav">
           <div style="float:left;">
               <ul>
               		 <li><a href="index.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cogIcon'">首页</a></li>
                   <li><a href="listEquips.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-deviceIcon'">设备管理</a></li>
                   <li>
	                   <a href="javascript:void(0)" id="mb" class="easyui-menubutton" data-options="menu:'#mm',iconCls:'icon-topologyIcon'">拓扑管理</a>
	                   <div id="mm" style="width:150px;"> 
	                   		<a href="topologyManager.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-topologyIcon'">拓扑管理</a>
	                        <a href="bottomManager.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-topologyIcon'">底图设置</a>
	                        <a href="topologyImageManager.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-topologyIcon'">域管理工具</a>
	                   </div>
	               </li>
                   <li><a href="listTasks.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-taskIcon'">任务管理</a></li>
                   <li>
	                   <a href="javascript:void(0);" class="easyui-menubutton" data-options="menu:'#efficiencyStateSubmenu',plain:true,iconCls:'icon-efficiencyIcon'">性能态势</a>
	                   <div id="efficiencyStateSubmenu" style="width:150px;"> 
	                   		<a href="performanceMonitorState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">性能监测设备态势</a>
	                        <a href="monitorTaskState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">监测任务态势</a>
	                        <a href="portPerformanceState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">端性能态势</a>
	                        <a href="webPerformanceState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">WEB业务性能态势</a>
	                        <a href="ftpPerformanceState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">FTP业务性能态势</a>
	                        <a href="dnsPerformanceState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">DNS业务性能态势</a>
	                        <a href="emailPerformanceState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">EMAIL业务性能态势</a>
	                        <a href="alarmState.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-efficiencyIcon'">告警态势</a>
	                   </div>
	               </li>
                   <li>
                   		<a href="javascript:void(0);" class="easyui-menubutton" data-options="menu:'#statisticsAnalysisSubmenu',plain:true,iconCls:'icon-statisticsIcon'">统计分析</a>
                   		<div id="statisticsAnalysisSubmenu" style="width:150px;"> 
	                   		<a href="portPerformanceAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">端性能统计分析</a>
	                        <a href="blockAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">阻断情况统计</a>
	                        <a href="dnsServiceAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">DNS业务性能统计</a>
	                        <a href="webServiceAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">WEB业务性能统计</a>
	                        <a href="ftpServiceAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">FTP业务性能统计</a>
	                        <a href="emailServiceAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">EMAIL业务性能统计</a>
	                        <a href="weekReportAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">周期综合报表</a>
	                        <a href="totalReportAnalysis.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-statisticsIcon'">综合统计图表</a>
	                   </div>
                   	</li>
                   <li><a href="javascript:void(0)" class="easyui-menubutton" data-options="menu:'#waringInfo',plain:true,iconCls:'icon-waringIcon'">告警信息</a></li>
                  <div id="waringInfo" style="width:120px;">    
                  	<div data-options="iconCls:'icon-waringIcon'"><a href="listAlarmRecs.html" class="easyui-linkbutton" data-options="plain:true">最新告警信息</a></div>   
                   	<div data-options="iconCls:'icon-waringIcon'"><a href="listAndSearchAlarmRecs.html" class="easyui-linkbutton" data-options="plain:true">告警信息查询</a></div>   
                   	<div class="menu-sep"></div>   
                    <div data-options="iconCls:'icon-waringIcon'"><a href="alarmState.html" class="easyui-linkbutton" data-options="plain:true">告警态势信息</a></div>  
                  </div>
                   <li><a href="userManage.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-usersIcon'">用户管理</a></li>
                   <li><a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cogIcon'">系统管理</a></li>
               </ul>
           </div>
           <div style="float:right;">
              <ul>
                   <li><a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-help'">帮助</a></li>
                   <li><a href="signout.html" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cog_goIcon'">退出</a></li>
                   <li><a href="javascript:void(0);" class="easyui-linkbutton" onclick="reload();" data-options="plain:true,iconCls:'icon-reload'"></a></li>
               </ul>
           </div>
       </div>
 		</div>
 		
