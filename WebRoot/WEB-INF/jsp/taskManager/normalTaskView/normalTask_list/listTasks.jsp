<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>常规任务界面 /列表式显示</title>
    
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>

    
    <script type="text/javascript" src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="echarts/echarts.min.js"></script>
</head>

<body style="overflow:hidden;margin-left: 8px;margin-top: 17px;">
	
	<!-- 条件筛选 -->
	<div style="width:100%;overflow:hidden;">
		<form id="ff" method="post">

	       	<div>
	       		<label><input id="checkall" type="checkbox" onclick ="checkAll()"> 全部   </label>&nbsp;&nbsp;
	       		<c:forEach items="${dictTypeList}" var="dict" begin="0" end="4">
                     <label><input class="taskKind" type="checkbox" onclick="clickTaskKindCheckbox()" value="${dict.dict_numb }">${dict.dict_cont }</label>
               	</c:forEach>
	       	</div>
	       	<div style="margin-top:5px">
	       		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	       		<c:forEach items="${dictTypeList}" var="dict" begin="5" end="13">
                     <label><input class="taskKind" type="checkbox" onclick="clickTaskKindCheckbox()" value="${dict.dict_numb }">${dict.dict_cont }</label>
               	</c:forEach>
               	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               	<a href="javascript:void(0);" id="Switch" onclick="switchView()" class="easyui-linkbutton"  data-options="iconCls:'icon-chart'">切换视图</a> 
	       	</div>

	       	

        </form>
	</div>
	<!-- 表格和视图显示 -->
	<div style="margin-top:10px;">
		<!-- 表格显示 -->
		<div id="dataTable" style="width:100%;overflow:hidden;">
			<div id="toolbar" class="cl">
                <div class="fr">
                    <a href="javascript:void(0);" onclick ="activeTasks()" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-ok'">激活</a>
                    <a href="javascript:void(0);" onclick="removeTasks()" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'">删除</a>
                </div>
            </div>
            
            <!-- 表格table -->
            <div class="taskDatagrid" >
            	<table id="taskDatagrid" class="easyui-datagrid" data-options="fitColumns:true"></table>
            </div>
            
		</div>
		
		<!-- 用于图形显示 -->
 		<div id="viewLayout" class="easyui-layout" style="margin-top:10px;width:100%;height:450px;display:none">
			<div id="taskTypeView" style="width:620px;height:450px;float: left;"></div>
			<div id="taskStatView" style="width:500px;height:450px;float: left;"></div>

		</div>
		
	</div>
    
    <!-- 用于激活任务/编辑任务/测量数据的弹出div -->
	 <div id="popUpWindow">
	 </div>
	
	<script type="text/javascript" src="js/selfJS/task/listTask/routerAndInterface.js"></script>		<!-- 路由器及接口 -->

    <script type="text/javascript" src="js/selfJS/task/listTask/taskPolicy.js"></script>		<!-- 任务的策略 -->
    <script type="text/javascript" src="js/taskManager/normalTask/normalTask_list/conditionFilter.js"></script>
    <script type="text/javascript" src="js/taskManager/normalTask/normalTask_list/listTasks.js"></script> <!-- 任务的列表-->
    
</body>

</html>