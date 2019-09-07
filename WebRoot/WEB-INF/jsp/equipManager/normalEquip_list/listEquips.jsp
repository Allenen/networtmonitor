<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>设备列表</title>
   
	<script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script src="bootstrap/bootstrap.min.js"></script>
    <script src="echarts/echarts.min.js"></script>
    
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    
    <script type="text/javascript" src="js/normalEquip/normalEquip_list/listEquips.js"></script>       <!-- 用于列表式显示设备脚本 -->
    

    
  </head>
  
  <body style="overflow: hidden;">
  	<!-- 用于条件筛选 -->
  	<div style="width:100%;margin-left:5px;margin-top:5px">
  		<form id="ff" method="post">
  			<label><input id="checkall" type="checkbox" onclick="checkAll()"/> 全部</label>
	  		<c:forEach items="${dictTypeList}" var="dict">
	  			<label><input type="checkbox" onclick="getallselect()" value="${dict.dict_numb }">${dict.dict_cont }</label>
	       	</c:forEach>
	       	
	       	<div style="margin-left:5px;margin-top:5px">
	       		<label>搜索：<input class="easyui-searchbox" style="width:150px;"data-options="searcher:searchEquip,prompt:'设备名或管理IP'"></label>
	       		<label id="info" style="margin-left:250px;"></label>
	       	</div>
  		

       </form>
  	</div>
  	<div style="margin-left:5px;">
  		<!-- 用于表格显示 -->
  		<div style="width: 60%;overflow: hidden;float: left;">
  			<div id="toolbar" class="cl">
                <div class="fr">
                    <a href="javascript:void(0);" onclick ="deleteSelectEquips()" class="easyui-linkbutton" data-options="iconCls:'icon-cancel',plain:true">批量删除</a>
                </div>
            </div>
            <div class="equipDatagrid">
            	<table id="equipDatagrid" class="easyui-datagrid"></table>
            </div>
  			
  		</div>
  		
  		<!-- 用于图形显示 -->
 		<div class="easyui-layout" style="width:40%;height:470px;float: left;">
			<div data-options="region:'north',border:false" style="height:220px;">
				<div id="areaUnitView" style="height:220px;"></div>
			</div>
			<div data-options="region:'center',border:false">
				<div id="equipKindView" style="height:250px;"></div>
			</div>
		</div>
  		
  	</div>
    
    <div id="mm_router" class="easyui-menu" style="width:70px;height:50px">
		<div data-options="iconCls:'icon-edit',name:1">基本信息</div>
		<div data-options="iconCls:'icon-edit',name:2">接口信息</div>
	</div>
		
</body>
</html>
