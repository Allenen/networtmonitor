<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>编辑服务器/其他设备</title>
	
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
    
    <script type="text/javascript" src="jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
    
    <script type="text/javascript" src="js/jquery.json-2.2.min.js"></script>
  </head>
  
  <body>
	
	<div id ="serviceDiv" style="overflow:hidden;text-align: center;">
		<label style="font-size:20px;font-family:黑体;margin-top:10px;">${equip.equipKind }</label>
		<!-- 编辑服务器/其他设备的基本信息 -->
		<table style="width: 100%;margin-left: 20px;">
			<tr align="left">
				<td colspan="1">设备标识:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="equipId" value="${equip.equipId}" readonly="readonly"/></td>
				<td colspan="1">设备名称:</td>
				<td colspan="1"><input class="easyui-textbox" type="text"  name="equipName" value="${equip.equipName}" readonly="readonly"/></td>
				<td colspan="1">设备类别:</td>
				<td colspan="1"><input class="easyui-textbox" id="serverEquipKind" type="text" name = "equipKind" value="${equip.equipKind}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">管理IP:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="manageIp" value="${equip.manageIp}" readonly="readonly"/></td>
				<td colspan="1">归属单位:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="areaUnit" value="${equip.areaUnit}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">维护单位:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="keepUnit" value="${equip.keepUnit}" readonly="readonly"/></td>
				<td colspan="1">联系人:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="keepPerson" value="${equip.keepPerson}" readonly="readonly"/></td>
				<td colspan="1">联系电话:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="keepPhone" value="${equip.keepPhone}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">坐标X:</td>
				<td colspan="1"><input class="easyui-textbox" name="positionX" value="${equip.positionX}" readonly="readonly"/></td>
				<td colspan="1">坐标Y:</td>
				<td colspan="1"><input class="easyui-textbox" name="positionY" value="${equip.positionY}" readonly="readonly"/></td>
			</tr>
		</table>
	</div>

	</body>
</html>
